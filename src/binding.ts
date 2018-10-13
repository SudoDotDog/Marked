/**
 * @author WMXPY
 * @description Binding
 */

import * as ModuleAlias from "module-alias";
import * as Path from "path";

((MODULE_ALIAS: string | undefined, isTest: boolean) => {
    if (MODULE_ALIAS) return; else process.env.NODE_MODULE_ALIAS_MARKED = 'TRUE';
    const here: string = isTest ?
        Path.join(__dirname) :
        Path.join(__dirname, '..', 'dist');

    ModuleAlias.addAliases({
        "marked#evaluate": Path.join(here, 'evaluate'),
        "marked#extension": Path.join(here, 'extension'),
        "marked#declare": Path.join(here, 'declare'),
        "marked#marked": Path.join(here, 'marked'),
        "marked#util": Path.join(here, 'util'),
        "marked#variable": Path.join(here, 'variable'),
    });
})(process.env.NODE_MODULE_ALIAS_MARKED, process.env.NODE_ENV === 'test');
