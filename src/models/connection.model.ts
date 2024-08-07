import type { Socket } from "bun";
import { MemoryServer } from "../server/memory.server";

export class ConnectionModel {
    constructor(socket: Socket, id: number) {
        this.socket = socket;
        this.id = id;
        this.active = true;
    }

    public socket: Socket;
    public id: number;
    public active: boolean;

    public copyWith(modifyObject: Partial<ConnectionModel>): ConnectionModel {
        return Object.assign(
            Object.create(ConnectionModel.prototype),
            this,
            modifyObject,
        );
    }

    public disconnect() {
        if (this.active) {
            const memory = MemoryServer.get();

            const connection = memory.clientConnections.get(this.id);
            if (connection) {
                memory.clientConnections.remove(this.id);
            }

            this.socket.end();
            this.active = false;
        }
    }
}