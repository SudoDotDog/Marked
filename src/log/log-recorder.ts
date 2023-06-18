/**
 * @author WMXPY
 * @namespace Log
 * @description Log Recorder
 */

import { IMarkedExecuteLog } from "./declare";

export class MarkedLogRecorder {

    public static create(): MarkedLogRecorder {

        return new MarkedLogRecorder();
    }

    private readonly _executeLogs: IMarkedExecuteLog[];

    private constructor() {

        this._executeLogs = [];
    }

    public get executeLogs(): IMarkedExecuteLog[] {

        return this._executeLogs;
    }

    public putExecuteLog(log: IMarkedExecuteLog): this {

        this._executeLogs.push(log);
        return this;
    }
}
