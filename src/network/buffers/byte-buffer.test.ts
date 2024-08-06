import { describe, it, expect } from "bun:test";
import { ByteBuffer } from "./byte-buffer";

describe("ByteBuffer", () => {
    it("deve armazenar e recuperar bytes corretamente", () => {
        const buffer = new ByteBuffer();
        const data = new Uint8Array([1, 2, 3, 4]);

        buffer.putBytes(data);

        expect(buffer.getBytes()).toEqual(data);
    });

    it("deve armazenar e recuperar int8 corretamente", () => {
        const buffer = new ByteBuffer();
        const value = 127;

        buffer.putInt8(value);
        buffer.flush();

        expect(buffer.getInt8()).toBe(value);
    });

    it("deve armazenar e recuperar int16 corretamente", () => {
        const buffer = new ByteBuffer();
        const value = 32767;

        buffer.putInt16(value);
        buffer.flush();

        expect(buffer.getInt16()).toBe(value);
    });

    it("deve armazenar e recuperar int32 corretamente", () => {
        const buffer = new ByteBuffer();
        const value = 2147483647;

        buffer.putInt32(value);
        buffer.flush();

        expect(buffer.getInt32()).toBe(value);
    });

    it("deve armazenar e recuperar string corretamente", () => {
        const buffer = new ByteBuffer();
        const value = "Hello, world!";

        buffer.putString(value);
        buffer.flush();

        expect(buffer.getString()).toBe(value);
    });

    it("deve armazenar e recuperar float64 corretamente", () => {
        const buffer = new ByteBuffer();
        const value = 123.456;

        buffer.putFloat64(value);
        buffer.flush();

        expect(buffer.getFloat64()).toBe(value);
    });

    it("deve armazenar e recuperar boolean corretamente", () => {
        const buffer = new ByteBuffer();
        const value = true;

        buffer.putBoolean(value);
        buffer.flush();

        expect(buffer.getBoolean()).toBe(value);
    });
});
