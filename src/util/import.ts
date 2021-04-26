/**
 * @author WMXPY
 * @namespace Util
 * @description Import
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { ISandbox } from "../declare/sandbox";
import { IScope, ITrace, VARIABLE_TYPE } from "../declare/variable";
import { SandMap } from "../variable/sandmap";
import { error } from "./error/error";

const resolveModuleImport = async (source: string, node: EST.ImportDeclaration, sandbox: ISandbox, scope: IScope, currentTrace: ITrace, nextTrace: ITrace): Promise<boolean> => {

    const targetModule: any | null = sandbox.module(source);

    if (!Boolean(targetModule)) {
        return false;
    }

    for (const specifier of node.specifiers) {

        const target: any = await (sandbox as any).execute(specifier, scope, nextTrace);
        const register: (name: string, value: any) => void = scope.register(VARIABLE_TYPE.CONSTANT);

        switch (specifier.type) {

            case 'ImportDefaultSpecifier': {

                if (!(typeof targetModule === 'object' && Boolean(targetModule.default))) {
                    throw error(ERROR_CODE.IMPORT_DEFAULT_OBJECT_HAVE_NO_DEFAULT_EXPORT, target, node, currentTrace);
                }

                register(target, targetModule.default);
                break;
            }
            case 'ImportNamespaceSpecifier': {

                if (!(typeof targetModule === 'object')) {
                    throw error(ERROR_CODE.IMPORT_OBJECT_NOT_FOUND, target, node, currentTrace);
                }

                const map: SandMap<any> = new SandMap(targetModule);
                register(target, map);
                break;
            }
            case 'ImportSpecifier': {

                const imported: string = specifier.imported.name;
                if (!Boolean(targetModule[imported])) {
                    throw error(ERROR_CODE.IMPORT_OBJECT_NOT_FOUND, imported, node, currentTrace);
                }

                register(target, targetModule[imported]);
                break;
            }
            default: {

                throw error(ERROR_CODE.UNKNOWN_ERROR, (specifier as any).type, node, currentTrace);
            }
        }
    }

    return true;
};

export const resolveImport = async (source: string, node: EST.ImportDeclaration, sandbox: ISandbox, scope: IScope, currentTrace: ITrace, nextTrace: ITrace): Promise<boolean> => {

    return await resolveModuleImport(source, node, sandbox, scope, currentTrace, nextTrace);
};
