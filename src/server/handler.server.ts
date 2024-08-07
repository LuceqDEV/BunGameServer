import type { Socket } from "bun";
import { LoggerUtils } from "../utils/logger-utils";
import { MemoryServer } from "./memory.server";
import { ConnectionModel } from "../models/connection.model";
import { ByteBuffer } from "../network/buffers/byte-buffer";
import { RingBuffer } from "../network/buffers/ring-buffer";
import { RequestHandler } from "../network/handler/request/request.handler";

export class HandlerServer {
    private _logger: LoggerUtils;
    private _memory: MemoryServer;
    private _requestHandler: RequestHandler;
    private _ringBuffer: RingBuffer;
    private _byteBuffer: ByteBuffer;
    private _packetSize: number = -1;

    constructor() {
        this._logger = LoggerUtils.get();
        this._memory = MemoryServer.get();
        this._requestHandler = new RequestHandler()
        this._ringBuffer = new RingBuffer(1024);
        this._byteBuffer = new ByteBuffer();
    }

    public handleNewConnection(socket: Socket): void {
        const firstAvailableId: number | undefined = this._memory.clientConnections.getFirstEmptySlot();

        if (firstAvailableId == undefined) {
            this._handleFullServer(socket);

            return;
        }

        const connectionModel: ConnectionModel = new ConnectionModel(socket, firstAvailableId);
        this._memory.clientConnections.add(connectionModel);
    }

    public async handleData(socket: Socket, data: Uint8Array): Promise<void> {
        try {
            this._ringBuffer.add(data);

            while (this._ringBuffer.length > 0) {
                if (this._packetSize === -1 && this._ringBuffer.length >= 4) {
                    const sizeBytes: Uint8Array = this._ringBuffer.take(4);

                    this._byteBuffer.putBytes(sizeBytes);
                    this._byteBuffer.getBytes();

                    this._packetSize = this._byteBuffer.getInt32();

                    if (this._packetSize <= 0) {
                        this._packetSize = -1;
                        continue;
                    }
                }

                if (this._packetSize > 0 && this._ringBuffer.length >= this._packetSize) {
                    const packet: Uint8Array = this._ringBuffer.take(this._packetSize);

                    try {
                        await this._processPacket(socket, packet);
                    } catch (error) {
                        this._logger.error('Erro ao processar pacote: ' + error);
                        this._cleanupConnection(socket);
                    }

                    this._packetSize = -1;
                } else {
                    break;
                }
            }

        } catch (error) {
            this._logger.error('Erro no tratamento de dados do cliente: ' + error);
            this._cleanupConnection(socket);
        }
    }

    private async _processPacket(socket: Socket, packet: Uint8Array): Promise<void> {
        try {
            const filledSlots: (ConnectionModel | undefined)[] = this._memory.clientConnections.getFilledSlotsAsList();
            const connection = filledSlots.find(conn => conn?.socket === socket);

            if (!connection) {
                this._logger.error('Conexão não encontrada para o socket: ' + socket.remoteAddress);
                return;
            }

            this._requestHandler.packets(connection, packet);

        } catch (error) {
            this._logger.error('Erro ao processar pacoteasdasdasd: ' + error);
            this._cleanupConnection(socket);
        }
    }

    public handleClose(socket: Socket): void {
        this._cleanupConnection(socket);
    }

    public handleError(socket: Socket, error: Error): void {
        this._logger.error('Erro na conexão: ' + error);
        this._cleanupConnection(socket);
    }

    private _handleFullServer(socket: Socket): void {
        this._logger.info('O servidor está cheio, desconectando o cliente: ' + socket.remoteAddress);
        this._logger.info('Conn finalizada, conn: ' + socket.remoteAddress);

        socket.end()
    }

    private _cleanupConnection(socket: Socket): void {
        const filledSlots: (ConnectionModel | undefined)[] = this._memory.clientConnections.getFilledSlotsAsList();

        for (const connection of filledSlots) {
            if (connection && connection.socket === socket) {
                const slotIndex: Iterable<number> = this._memory.clientConnections.find(connection);

                for (const index of slotIndex) {
                    this._memory.clientConnections.remove(index);
                    this._logger.info(`Conexão removida do slot: ${index}, endereço: ${socket.remoteAddress}`);
                }

                connection.disconnect();
                break;
            }
        }
    }
}