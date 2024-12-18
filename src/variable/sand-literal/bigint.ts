/**
 * @author WMXPY
 * @namespace Variable_SandLiteral
 * @description BigInt
 */

export class SandLiteralBigInt {

    public static resolve(value: number | SandLiteralBigInt | bigint): bigint {

        if (value instanceof SandLiteralBigInt) {
            return value.toNativeBigInt();
        }

        if (typeof value === "bigint") {
            return value;
        }

        return BigInt(value);
    }

    public static create(value: string): SandLiteralBigInt {

        return new SandLiteralBigInt(value);
    }

    private readonly _value: string;

    private constructor(value: string) {

        this._value = value;
    }

    public toNativeBigInt(): bigint {

        return BigInt(this._value);
    }
}
