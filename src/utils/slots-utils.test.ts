// slots.test.ts
import { describe, it, expect } from "bun:test";
import { Slots } from "./slots-utils";

describe("Slots", () => {
    it("Iniciar o slot corretamente", () => {
        const slots = new Slots<number>(5);
        expect(slots.getFirstEmptySlot()).toBe(0);
    });

    it("Adicionar e obter os valores corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(10);
        slots.add(20);
        expect(slots.get(0)).toBe(10);
        expect(slots.get(1)).toBe(20);
    });

    it("Remover valores corretamente", () => {
        const slots = new Slots<number>(5);
        const index = slots.add(30);
        slots.remove(index);
        expect(slots.isSlotEmpty(index)).toBe(true);
    });

    it("Encontrar slots cheios corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(40);
        slots.add(50);
        const filledSlots = Array.from(slots.getFilledSlots());
        expect(filledSlots).toEqual([0, 1]);
    });

    it("Limpar slots corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(60);
        slots.add(70);
        slots.clear();
        expect(Array.from(slots.getFilledSlots())).toEqual([]);
        expect(slots.getFirstEmptySlot()).toBe(0);
    });

    it("Atualizar slots corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(80);
        slots.update(0, 90);
        expect(slots.get(0)).toBe(90);
    });

    it("Lançar erro para índice fora do intervalo", () => {
        const slots = new Slots<number>(5);
        expect(() => slots.get(10)).toThrow(RangeError);
        expect(() => slots.set(10, 100)).toThrow(RangeError);
        expect(() => slots.remove(10)).toThrow(RangeError);
        expect(() => slots.update(10, 100)).toThrow(RangeError);
    });

    it("Lançar erro quando não há slots vazios disponíveis", () => {
        const slots = new Slots<number>(2);
        slots.add(110);
        slots.add(120);
        expect(() => slots.add(130)).toThrow(Error);
    });

    it("Obter slots vazios corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(140);
        const emptySlots = Array.from(slots.getEmptySlots());
        expect(emptySlots).toEqual([1, 2, 3, 4]);
    });

    it("Contar slots vazios corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(150);
        const emptySlotCount = Array.from(slots.countEmptySlots()).length;
        expect(emptySlotCount).toBe(4);
    });

    it("Contar slots cheios corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(160);
        slots.add(170);
        const filledSlotCount = Array.from(slots.countFilledSlots()).length;
        expect(filledSlotCount).toBe(2);
    });

    it("Encontrar elementos corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(180);
        slots.add(190);
        const foundIndices = Array.from(slots.find(180));
        expect(foundIndices).toEqual([0]);
    });

    it("Obter lista de slots cheios corretamente", () => {
        const slots = new Slots<number>(5);
        slots.add(200);
        slots.add(210);
        const filledSlotsList = slots.getFilledSlotsAsList();
        expect(filledSlotsList).toEqual([200, 210]);
    });
});
