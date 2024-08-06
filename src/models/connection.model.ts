import type { Socket } from "bun";

export class ConnectionModel {
    constructor(socket: Socket, id: number) {
        this.socket = socket;
        this.id = id;
    }

    public socket: Socket;
    public id: number;

    public copyWith(modifyObject: Partial<ConnectionModel>): ConnectionModel {
        return Object.assign(
            Object.create(ConnectionModel.prototype),
            this,
            modifyObject,
        );
    }
}