/**
 * @author WMXPY
 * @namespace Debug
 * @description Flow Controller
 */

export class MarkedDebugFlowController {

    public static fromMethods(
        continueMethod: () => void,
        terminateMethod: () => void,
    ): MarkedDebugFlowController {

        return new MarkedDebugFlowController(continueMethod, terminateMethod);
    }

    private readonly _continueMethod: () => void;
    private readonly _terminateMethod: () => void;

    private constructor(
        continueMethod: () => void,
        terminateMethod: () => void,
    ) {

        this._continueMethod = continueMethod;
        this._terminateMethod = terminateMethod;
    }

    public continue(): void {

        this._continueMethod();
    }

    public terminate(): void {

        this._terminateMethod();
    }
}
