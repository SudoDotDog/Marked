/**
 * @author WMXPY
 * @namespace Variable_SandLiteral
 * @description RegExp
 */

export class SandLiteralRegExp {

    public static create(
        pattern: string,
        flagsString: string,
    ): SandLiteralRegExp {

        const flags: string[] = flagsString.split("");
        const filtered: string[] = flags.filter((flag) => flag.length === 1);

        return new SandLiteralRegExp(pattern, filtered);
    }

    private readonly _pattern: string;
    private readonly _flags: string[];

    private constructor(
        pattern: string,
        flags: string[],
    ) {

        this._pattern = pattern;
        this._flags = flags;
    }

    public toNativeRegExp(): RegExp {

        return new RegExp(this._pattern, this._flags.join(""));
    }
}
