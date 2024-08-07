import type { ConnectionModel } from "../../../models/connection.model";
import { MemoryServer } from "../../../server/memory.server";
import { LoggerUtils } from "../../../utils/logger-utils";
import { ByteBuffer } from "../../buffers/byte-buffer";

export class ResponseHandler {
    public static dataTo(connection: ConnectionModel, bytes: Uint8Array): void {
        const buffer: ByteBuffer = new ByteBuffer();
        const logger: LoggerUtils = LoggerUtils.get();

        try {
            buffer.putInt32(bytes.length);
            buffer.putBytes(bytes);

            connection.socket.write(buffer.getBytes());
        } catch (error) {
            logger.error('Erro ao enviar dados para o cliente! Erro: ' + error);
        }
    }

    public static dataToAll(bytes: Uint8Array): void {
        const logger: LoggerUtils = LoggerUtils.get();
        const clients: MemoryServer = MemoryServer.get();
        const filledSlots: Iterable<number> = clients.clientConnections.getFilledSlots();

        for (const i of filledSlots) {
            const client: ConnectionModel | undefined = clients.clientConnections.get(i);

            if (client?.isConnected()) {
                try {
                    ResponseHandler.dataTo(client, bytes);
                } catch (error) {
                    logger.error('Erro ao enviar dados para o cliente! Erro: ' + error);
                }
            }
        }
    }

    public static dataToAllExcept(except: ConnectionModel, bytes: Uint8Array): void {
        const logger: LoggerUtils = LoggerUtils.get();
        const clients: MemoryServer = MemoryServer.get();
        const filledSlots: Iterable<number> = clients.clientConnections.getFilledSlots();

        for (const i of filledSlots) {
            const client: ConnectionModel | undefined = clients.clientConnections.get(i);

            if (client?.isConnected() && client.id !== except.id && client.inGame) {
                try {
                    ResponseHandler.dataTo(client, bytes);
                } catch (error) {
                    logger.error('Erro ao enviar dados para o cliente! Erro: ' + error);
                }
            }
        }
    }
}