/**
 * @author WMXPY
 * @namespace Debug
 * @description Flow Controller
 */

export type MarkedDebugFlowControllerOptions = {

    readonly continueMethod: () => void;
    readonly terminateMethod: () => void;
    readonly nextStepMethod: () => void;
};

export class MarkedDebugFlowController {

    public static fromOptions(options: MarkedDebugFlowControllerOptions): MarkedDebugFlowController {

        return new MarkedDebugFlowController(options);
    }

    private readonly _continueMethod: () => void;
    private readonly _terminateMethod: () => void;
    private readonly _nextStepMethod: () => void;

    private constructor(options: MarkedDebugFlowControllerOptions) {

        this._continueMethod = options.continueMethod;
        this._terminateMethod = options.terminateMethod;
        this._nextStepMethod = options.nextStepMethod;
    }

    public continue(): void {

        this._continueMethod();
    }

    public terminate(): void {

        this._terminateMethod();
    }

    public nextStep(): void {

        this._nextStepMethod();
    }
}
