import { ConnectionModel } from "../../../../models/connection.model";
import { PingResponseMessage } from "../../response/messages/ping.response";
import type { RequestMessageInterface } from "../request-message.interface";

export class PingRequest implements RequestMessageInterface {
    receiver(connection: ConnectionModel, _packet: Uint8Array): void {
        const pingSender: PingResponseMessage = new PingResponseMessage()

        if (!connection.isConnected()) {
            return;
        }

        pingSender.send(connection, undefined)
    }
}