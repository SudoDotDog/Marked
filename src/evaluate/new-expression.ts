/**
 * @author WMXPY
 * @namespace Evaluate
 * @description New Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { MarkedNativeClass } from "../variable/native-class/native-class";
import { MarkedNativeClassInstance } from "../variable/native-class/native-class-instance";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountNewExpression = (sandbox: ISandbox): void => {

    sandbox.mount('NewExpression', newStatementEvaluator);
};

export const newStatementEvaluator: Evaluator<'NewExpression'> =
    async function (this: Sandbox, node: EST.NewExpression, scope: Scope, trace: Trace): Promise<SandClassInstance | MarkedNativeClassInstance> {

        const targetClass: any = await this.execute(node.callee, scope, trace);

        if (!(targetClass instanceof SandClass) && !(targetClass instanceof MarkedNativeClass)) {

            const callee: EST.Identifier = node.callee as EST.Identifier;
            throw error(ERROR_CODE.NEW_STATEMENT_SHOULD_CALL_ON_CLASS_ONLY, callee.name, node, trace);
        }

        const argumentValues: any[] = [];
        for (const argument of node.arguments) {

            const argumentValue: any = await this.execute(argument, scope, trace);
            argumentValues.push(argumentValue);
        }

        if (targetClass instanceof MarkedNativeClass) {

            return targetClass.constructorMethod(...argumentValues);
        }

        const classInstance: SandClassInstance =
            SandClassInstance.create(targetClass);

        const classConstructor: any = targetClass.classConstructor;
        if (classConstructor instanceof SandFunction) {

            const bindClassConstructor: SandFunction =
                classConstructor.bindThisValue(classInstance);

            bindClassConstructor.execute(...argumentValues);
        }

        return classInstance;
    };
