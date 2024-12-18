/**
 * @author WMXPY
 * @namespace E2E
 * @description Expression Test
 */

import Chance from "chance";
import { Sandbox, SandboxLanguage, defaultSandboxLanguage } from "../../src";

describe("Given Sandbox for Expression evaluators", (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance("sandbox-module-evaluators-expression");

    const createSandbox = (language: SandboxLanguage = defaultSandboxLanguage) => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators(language);
        return sandbox;
    };

    it("should be able to handle conditional expression - happy path", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject("deject", (content: any) => result.push(content));

        await sandbox.evaluate("const a=true?1:2;deject(a);");

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(1);
    });

    it("should be able to handle conditional expression - sad path", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject("deject", (content: any) => result.push(content));

        await sandbox.evaluate("const a=false?1:2;deject(a);");

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(2);
    });

    it("should be able to handle for in loop", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const map: Record<string, number> = {
            a: 1,
            b: 2,
            c: 3,
        };
        sandbox.inject("map", map);
        sandbox.inject("deject", (content: any) => {
            result.push(content);
        });

        await sandbox.evaluate("for(const a in map){deject(a);}");

        expect(result).toHaveLength(3);
        expect(result).toEqual(["a", "b", "c"]);
    });

    it("should be able to handle for of loop", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const list: number[] = [1, 2, 3];

        sandbox.inject("list", list);
        sandbox.inject("deject", (content: any) => result.push(content));

        await sandbox.evaluate("for(const a of list){deject(a);}");

        expect(result).toHaveLength(3);
        expect(result).toEqual([1, 2, 3]);
    });

    it("should be able to handle for", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject("deject", (content: any) => result.push(content));

        await sandbox.evaluate("for(let i=1;i<4;i++){deject(i);}");

        expect(result).toHaveLength(3);
        expect(result).toEqual([1, 2, 3]);
    });

    it("should be able to handle for in typescript", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox("typescript");

        const result: any[] = [];
        sandbox.inject("deject", (content: any) => result.push(content));

        await sandbox.evaluate("for(let i:number=1;i<4;i++){deject(i);}");

        expect(result).toHaveLength(3);
        expect(result).toEqual([1, 2, 3]);
    });
});
