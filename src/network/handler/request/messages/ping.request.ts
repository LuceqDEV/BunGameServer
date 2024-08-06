import { ConnectionModel } from "../../../../models/connection.model";
import type { RequestMessageInterface } from "../request-message.interface";

export class PingRequestMessage implements RequestMessageInterface {
    receiver(connection: ConnectionModel, packet: Uint8Array): void {
        console.log(packet)
    }
}