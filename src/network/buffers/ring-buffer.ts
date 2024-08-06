export class RingBuffer {
    private readonly _capacity: number;
    private readonly _buffer: Uint8Array;
    private _start: number = 0;
    private _end: number = 0;
    private _isFull: boolean = false;

    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error('Buffer must have a positive capacity.');
        }
        this._capacity = capacity;
        this._buffer = new Uint8Array(capacity);
    }

    public get length(): number {
        if (this._isFull) {
            return this._capacity;
        } else {
            return (this._end - this._start + this._capacity) % this._capacity;
        }
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public get isFull(): boolean {
        return this._isFull;
    }

    public reset(): void {
        this._start = 0;
        this._end = 0;
        this._isFull = false;
    }

    public add(bytes: Uint8Array): void {
        if (bytes.length > this._capacity - this.length) {
            throw new Error('Not enough space in the buffer.');
        }

        if (bytes.length > this._capacity) {
            throw new Error('Packet size exceeds buffer capacity.');
        }

        for (const byte of bytes) {
            if (byte < 0 || byte > 255) {
                throw new Error('Byte value must be between 0 and 255.');
            }
            this._buffer[this._end] = byte;
            this._end = (this._end + 1) % this._capacity;
            if (this._end === this._start) {
                this._isFull = true;
            }
        }
    }


    public take(size: number): Uint8Array {
        if (size <= 0) {
            throw new Error('Size must be positive.');
        }

        if (size > this.length) {
            throw new Error('Not enough elements in the buffer.');
        }

        const result = new Uint8Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = this._buffer[(this._start + i) % this._capacity]!;
        }

        this._start = (this._start + size) % this._capacity;
        this._isFull = false;

        return result;
    }

}