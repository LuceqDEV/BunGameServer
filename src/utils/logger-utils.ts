const colorText = (text: string, colorCode: number) => `\x1b[${colorCode}m${text}\x1b[0m`;

const GREEN = 32;
const YELLOW = 33;
const BLUE = 34;
const RED = 31;

export class LoggerUtils {
    private static _instance: LoggerUtils;

    private constructor() { }

    public static get(): LoggerUtils {
        if (!LoggerUtils._instance) {
            LoggerUtils._instance = new LoggerUtils();
        }
        return LoggerUtils._instance;
    }

    private getTimestamp() {
        return new Date().toLocaleString();
    }

    public info(message: string) {
        console.log(`${colorText('[INFO]', GREEN)} ${this.getTimestamp()} - ${colorText(message, GREEN)}`);
    }

    public warning(message: string) {
        console.log(`${colorText('[WARN]', YELLOW)} ${this.getTimestamp()} - ${colorText(message, YELLOW)}`);
    }

    public player(message: string) {
        console.log(`${colorText('[PLAYER]', BLUE)} ${this.getTimestamp()} - ${colorText(message, BLUE)}`);
    }

    public error(message: string) {
        console.log(`${colorText('[ERRO]', RED)} ${this.getTimestamp()} - ${colorText(message, RED)}`);
    }
}
