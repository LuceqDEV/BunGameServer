export class ConstantsUtils {
    private static _instance: ConstantsUtils = new ConstantsUtils();

    serverPort: number = 8080;
    maxPlayers: number = 4;
    maxMaps: number = 100;

    static get(): ConstantsUtils {
        if (!ConstantsUtils._instance) {
            ConstantsUtils._instance = new ConstantsUtils();
        }
        return ConstantsUtils._instance;
    }
}