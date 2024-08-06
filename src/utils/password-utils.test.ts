import { describe, it, expect } from "bun:test";
import { PasswordUtils } from "./password-utils";

describe("PasswordUtils", () => {
    const passwordUtils = new PasswordUtils();
    const senha: string = 'senha_da_conta';

    it("Criptografar a senha corretamente", async () => {
        const senhaHasheada = await passwordUtils.hashPassword(senha);
        expect(senhaHasheada).toBe(senhaHasheada);
    });

    it("deve verificar a senha corretamente", async () => {
        const senhaHasheada = await passwordUtils.hashPassword(senha);
        const valido = await passwordUtils.verifyPassword(senha, senhaHasheada);
        expect(valido).toBe(true);
    });
});
