import type { ConnectionModel } from "../../../../models/connection.model";
import { ByteBuffer } from "../../../buffers/byte-buffer";
import { ServerPackets } from "../../../packets/server.packets";
import type { ResponseMessageInterface } from "../response-message.interface";
import { ResponseHandler } from "../response.handler";

export class PingResponseMessage implements ResponseMessageInterface<undefined> {

    send(connection: ConnectionModel, _data: undefined): void {
        const buffer: ByteBuffer = new ByteBuffer();

        buffer.putInt32(ServerPackets.ping);

        ResponseHandler.dataTo(
            connection,
            buffer.getBytes(),
        );
    }
}