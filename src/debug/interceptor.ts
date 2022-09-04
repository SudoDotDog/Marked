/**
 * @author WMXPY
 * @namespace Debug
 * @description Interceptor
 */

import { DebugInterceptorListener } from "./declare";

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
}
