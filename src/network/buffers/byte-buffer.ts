import { ArrayBufferSink } from "bun";

export class ByteBuffer {
    private _sink: ArrayBufferSink = new ArrayBufferSink();
    private _buffer: Uint8Array = new Uint8Array();

    constructor() {
        this._sink.start({ stream: true, asUint8Array: true });
    }

    public putBytes(bytes: Uint8Array): void {
        this._sink.write(bytes);
    }

    public putInt8(value: number): void {
        const buffer = new Uint8Array(1);
        buffer[0] = value;
        this._sink.write(buffer);
    }

    public putInt16(value: number): void {
        const buffer = new DataView(new ArrayBuffer(2));
        buffer.setInt16(0, value, true);
        this._sink.write(new Uint8Array(buffer.buffer));
    }

    public putInt32(value: number): void {
        const buffer = new DataView(new ArrayBuffer(4));
        buffer.setInt32(0, value, true);
        this._sink.write(new Uint8Array(buffer.buffer));
    }

    public putString(value: string): void {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(value);
        this.putInt32(encoded.length);
        this.putBytes(encoded);
    }

    public putFloat64(value: number): void {
        const buffer = new DataView(new ArrayBuffer(8));
        buffer.setFloat64(0, value, true);
        this._sink.write(new Uint8Array(buffer.buffer));
    }

    public putBoolean(value: boolean): void {
        this.putInt8(value ? 1 : 0);
    }

    public flush(): void {
        this._buffer = new Uint8Array(this._sink.flush() as ArrayBuffer);
    }

    private _readBuffer(size: number): Uint8Array {
        const buffer = this._buffer.slice(0, size);
        this._buffer = this._buffer.slice(size);
        return buffer;
    }

    public getBytes(): Uint8Array {
        this.flush();
        return this._buffer;
    }

    public getInt8(): number {
        const buffer: Uint8Array = this._readBuffer(1);
        const view = new DataView(buffer.buffer);
        return view.getInt8(0);
    }

    public getInt16(): number {
        const buffer = this._readBuffer(2);
        const view = new DataView(buffer.buffer);
        return view.getInt16(0, true);
    }

    public getInt32(): number {
        const buffer = this._readBuffer(4);
        const view = new DataView(buffer.buffer);
        return view.getInt32(0, true);
    }

    public getString(): string {
        const length = this.getInt32();
        const buffer = this._readBuffer(length);
        const decoder = new TextDecoder();
        return decoder.decode(buffer);
    }

    public getFloat64(): number {
        const buffer = this._readBuffer(8);
        const view = new DataView(buffer.buffer);
        return view.getFloat64(0, true);
    }

    public getBoolean(): boolean {
        return this.getInt8() !== 0;
    }
}