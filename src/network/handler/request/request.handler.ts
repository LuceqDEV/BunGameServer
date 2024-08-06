import type { LoggerUtils } from "../../../utils/logger-utils";
import type { RequestMessageInterface } from "./request-message.interface";

export class RequestHandler {
    private _messages: Map<number, RequestMessageInterface>;
    private _logger: LoggerUtils;
}