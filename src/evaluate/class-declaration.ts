/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Class Declaration
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { SandClass } from "../variable/sand-class/sand-class";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { TraceClass } from "../variable/trace/trace-class";

export const mountClassDeclaration = (sandbox: ISandbox): void => {

    sandbox.mount('ClassDeclaration', classDeclarationEvaluation);
};

export const classDeclarationEvaluation: Evaluator<'ClassDeclaration'> =
    async function (this: Sandbox, node: EST.ClassDeclaration, scope: Scope, trace: Trace): Promise<SandClass> {

        if (!node.id) {
            throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        }

        if (node.id.type !== 'Identifier') {
            throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        }

        if (typeof node.id.name !== 'string') {
            throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        }

        const rawName: string = node.id.name;
        const sandClass: SandClass = SandClass.create(rawName);

        if (node.superClass) {

            const superClass: any = await this.execute(node.superClass, scope, trace);
            if (!(superClass instanceof SandClass)) {
                throw error(ERROR_CODE.INTERNAL_ERROR, 'Super class node is not sand class', node, trace);
            }

            sandClass.setSuperClass(superClass);
        }

        const nextTrace: TraceClass = TraceClass.fromStack(trace, node, sandClass);

        await this.execute(node.body, scope, nextTrace);

        scope.register(VARIABLE_TYPE.CONSTANT)(rawName, sandClass);

        return sandClass;
    };
