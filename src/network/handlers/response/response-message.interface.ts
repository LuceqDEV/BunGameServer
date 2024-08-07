import type { ConnectionModel } from "../../../models/connection.model";

export interface ResponseMessageInterface<T> {
    send(connection: ConnectionModel, data: T): void;
}
