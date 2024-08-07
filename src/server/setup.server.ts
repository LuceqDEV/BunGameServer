import type { Socket } from "bun";
import { ConstantsUtils } from "../utils/constants-utils";
import { LoggerUtils } from "../utils/logger-utils";
import { HandlerServer } from "./handler.server";

export class SetupServer {
    private _constants: ConstantsUtils;
    private _logger: LoggerUtils;
    private _handler: HandlerServer;

    constructor() {
        this._constants = ConstantsUtils.get();
        this._logger = LoggerUtils.get();
        this._handler = new HandlerServer();

        this._handleOpen = this._handleOpen.bind(this);
        this._handleData = this._handleData.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleError = this._handleError.bind(this);
    }

    public async start(): Promise<void> {
        try {
            Bun.listen({
                hostname: "0.0.0.0",
                port: this._constants.serverPort,
                socket: {
                    open: this._handleOpen,
                    data: this._handleData,
                    close: this._handleClose,
                    error: this._handleError,
                },
            });

            this._logger.info('Servidor iniciado com sucesso');
            this._logger.info('Servidor ouvindo em: ' + this._constants.serverPort);

            await this._loadMemory();

            this._logger.info('Aguardando conexões...');
        } catch (error) {
            this._logger.error('Falha ao iniciar o servidor: ' + error);
        }
    }

    private _handleOpen(socket: Socket) {
        this._logger.info('Nova conexão de: ' + socket.remoteAddress);
        this._handler.handleNewConnection(socket);
    }

    private _handleData(socket: Socket, data: Uint8Array) {
        this._handler.handleData(socket, data);
    }

    private _handleClose(socket: Socket) {
        this._logger.info('Connexão finalizada, conexão: ' + socket.remoteAddress);
        this._handler.handleClose(socket);
    }

    private _handleError(socket: Socket, error: Error) {
        this._logger.error('Erro na conexão: ' + error);
        this._handler.handleError(socket, error);
    }

    private async _loadMemory(): Promise<void> { }
}
