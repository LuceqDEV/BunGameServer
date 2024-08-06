import { describe, it, expect } from "bun:test";
import { RingBuffer } from "./ring-buffer";

describe("RingBuffer", () => {
    it("deve inicializar corretamente", () => {
        const buffer = new RingBuffer(10);
        expect(buffer.length).toBe(0);
        expect(buffer.isEmpty).toBe(true);
        expect(buffer.isFull).toBe(false);
    });

    it("deve adicionar bytes ao buffer", () => {
        const buffer = new RingBuffer(10);
        buffer.add(new Uint8Array([1, 2, 3]));
        expect(buffer.length).toBe(3);
        expect(buffer.isEmpty).toBe(false);
        expect(buffer.isFull).toBe(false);
    });

    it("deve pegar bytes do buffer", () => {
        const buffer = new RingBuffer(10);
        buffer.add(new Uint8Array([1, 2, 3, 4, 5]));
        expect(buffer.take(3)).toEqual(new Uint8Array([1, 2, 3]));
        expect(buffer.length).toBe(2);
    });

    it("deve lançar erro se tentar adicionar bytes maiores que a capacidade", () => {
        const buffer = new RingBuffer(10);
        buffer.add(new Uint8Array(10));
        expect(() => buffer.add(new Uint8Array(1))).toThrow('Not enough space in the buffer.');
    });


    it("deve lidar com a capacidade máxima do buffer", () => {
        const buffer = new RingBuffer(5);
        buffer.add(new Uint8Array([1, 2, 3, 4, 5]));
        expect(buffer.isFull).toBe(true);
        buffer.take(1)
        buffer.add(new Uint8Array([6]));
        expect(buffer.take(5)).toEqual(new Uint8Array([2, 3, 4, 5, 6]));
    });

    it("deve resetar o buffer", () => {
        const buffer = new RingBuffer(10);
        buffer.add(new Uint8Array([1, 2, 3]));
        buffer.reset();
        expect(buffer.length).toBe(0);
        expect(buffer.isEmpty).toBe(true);
        expect(buffer.isFull).toBe(false);
    });
});
