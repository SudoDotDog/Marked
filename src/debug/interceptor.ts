/**
 * @author WMXPY
 * @namespace Debug
 * @description Interceptor
 */

import { DebugInterceptorListener } from "./declare";
import { MarkedDebugFlowController } from "./flow-controller";
import { MarkedDebugSnapshot } from "./snapshot/snapshot";

export class MarkedDebugInterceptor {

    public static fromListener(
        listener: DebugInterceptorListener,
    ): MarkedDebugInterceptor {

        return new MarkedDebugInterceptor(listener);
    }

    private readonly _listener: DebugInterceptorListener;

    private constructor(
        listener: DebugInterceptorListener
    ) {

        this._listener = listener;
    }

    public async execute(
        snapshot: MarkedDebugSnapshot,
        flowController: MarkedDebugFlowController,
    ): Promise<void> {

        return await Promise.resolve(
            this._listener(snapshot, flowController),
        );
    }
}
