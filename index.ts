import { SetupServer } from "./src/server/setup.server";

async function main() {
    const server: SetupServer = new SetupServer();

    await server.start();
}

main();