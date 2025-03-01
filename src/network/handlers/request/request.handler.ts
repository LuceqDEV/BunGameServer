import type { ConnectionModel } from "../../../models/connection.model";
import type { RequestMessageInterface } from "./request-message.interface";
import { LoggerUtils } from "../../../utils/logger-utils";
import { ByteBuffer } from "../../buffers/byte-buffer";
import { ClientPackets } from "../../packets/client.packets";
import { PingRequest } from "./messages/ping.request";

export class RequestHandler {
    private _messages: Map<number, RequestMessageInterface>;
    private _logger: LoggerUtils;

    constructor() {
        this._messages = new Map();
        this._logger = LoggerUtils.get();
        this.initMessages();
    }

    private initMessages(): void {
        this._messages.set(ClientPackets.ping, new PingRequest());
    }

    public async packets(connection: ConnectionModel, bytes: Uint8Array): Promise<void> {
        const buffer: ByteBuffer = new ByteBuffer();

        if (bytes.length < 4) {
            this._logger.error('Pacote com tamanho insuficiente...');
            return;
        }

        buffer.putBytes(bytes);
        buffer.getBytes()
        const header: number = buffer.getInt32();

        try {
            const messageHandler = this._messages.get(header);

            if (!messageHandler) {
                this._logger.player('Tipo de mensagem fora do intervalo válido.');
                return;
            }

            await messageHandler.receiver(connection, buffer.getBytes());
        } catch (error) {
            console.log(error);
        }
    }
}