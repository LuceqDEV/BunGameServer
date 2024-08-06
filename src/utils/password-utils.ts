export class PasswordUtils {
    public async hashPassword(password: string): Promise<string> {
        const hashedPassword = await Bun.password.hash(password);
        return hashedPassword;

    }

    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await Bun.password.verify(password, hashedPassword);
    }
}
