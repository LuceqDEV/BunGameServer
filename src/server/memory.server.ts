import { ConnectionModel } from "../models/connection.model";
import { ConstantsUtils } from "../utils/constants-utils";
import { SlotsUtils } from "../utils/slots-utils";

export class MemoryServer {
    private static _instance: MemoryServer;
    private _constants: ConstantsUtils;

    public clientConnections: SlotsUtils<ConnectionModel>;

    private constructor() {
        this._constants = ConstantsUtils.get()

        this.clientConnections = new SlotsUtils<ConnectionModel>(this._constants.maxPlayers);
    }

    public static get(): MemoryServer {
        if (!MemoryServer._instance) {
            MemoryServer._instance = new MemoryServer();
        }
        return MemoryServer._instance;
    }
}
