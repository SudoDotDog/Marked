/**
 * @author WMXPY
 * @namespace Log
 * @description Log Recorder
 */

import { EST_TYPE } from "../declare/types";
import { BaseSourceMapLocationFinder } from "../source-map/location-finder/base";
import { IMarkedExecuteLog } from "./declare";

export class MarkedLogRecorder {

    public static create(): MarkedLogRecorder {

        return new MarkedLogRecorder();
    }

    private readonly _executeLogs: IMarkedExecuteLog[];

    private constructor() {

        this._executeLogs = [];
    }

    public get length(): number {

        return this._executeLogs.length;
    }

    public get executeLogs(): IMarkedExecuteLog[] {

        return this._executeLogs;
    }

    public putExecuteLog(log: IMarkedExecuteLog): this {

        this._executeLogs.push(log);
        return this;
    }

    public findExecuteLogsByNodeType(type: EST_TYPE): IMarkedExecuteLog[] {

        return this._executeLogs.filter((log: IMarkedExecuteLog) => {
            return log.node.type === type;
        });
    }

    public findExecuteLogsByNodeTypes(types: EST_TYPE[]): IMarkedExecuteLog[] {

        return this._executeLogs.filter((log: IMarkedExecuteLog) => {
            return types.includes(log.node.type);
        });
    }

    public findExecuteLogsByLineBefore(line: number): IMarkedExecuteLog[] {

        return this._executeLogs.filter((log: IMarkedExecuteLog) => {

            if (
                log.node.loc === null
                || typeof log.node.loc === "undefined"
            ) {
                return false;
            }

            const locationFinder: BaseSourceMapLocationFinder = log.trace.ensureLocationFinder();
            const actualPosition = locationFinder.findSourceLocation(log.node.loc.end, log.node);

            return actualPosition.line <= line;
        });
    }

    public findExecuteLogsByLingAfter(line: number): IMarkedExecuteLog[] {

        return this._executeLogs.filter((log: IMarkedExecuteLog) => {

            if (
                log.node.loc === null
                || typeof log.node.loc === "undefined"
            ) {
                return false;
            }

            const locationFinder: BaseSourceMapLocationFinder = log.trace.ensureLocationFinder();
            const actualPosition = locationFinder.findSourceLocation(log.node.loc.start, log.node);

            return actualPosition.line >= line;
        });
    }

    public findExecuteLogsByLineBetween(startLine: number, endLine: number): IMarkedExecuteLog[] {

        return this._executeLogs.filter((log: IMarkedExecuteLog) => {

            if (
                log.node.loc === null
                || typeof log.node.loc === "undefined"
            ) {
                return false;
            }

            const locationFinder: BaseSourceMapLocationFinder = log.trace.ensureLocationFinder();
            const actualStartPosition = locationFinder.findSourceLocation(log.node.loc.start, log.node);
            const actualEndPosition = locationFinder.findSourceLocation(log.node.loc.end, log.node);

            return actualStartPosition.line >= startLine
                && actualEndPosition.line <= endLine;
        });
    }
}
