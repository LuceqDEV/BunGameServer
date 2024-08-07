import type { ConnectionModel } from "../../../models/connection.model";

export interface RequestMessageInterface {
    receiver(connection: ConnectionModel, packet: Uint8Array): Promise<void>;
}