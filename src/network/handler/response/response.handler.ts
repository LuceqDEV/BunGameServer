import type { ConnectionModel } from "../../../models/connection.model";

export class ResponseHandler {
    public static dataTo(connection: ConnectionModel, bytes: Uint8Array): void { }
    public static dataToAll(bytes: Uint8Array): void { }
    public static dataToAllExcept(except: ConnectionModel, bytes: Uint8Array): void { }
}