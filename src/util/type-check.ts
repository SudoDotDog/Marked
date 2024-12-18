/**
 * @author WMXPY
 * @namespace Util
 * @description Type Check
 */

export const typeCheckIsConstructor = (target: any): boolean => {

    if (typeof target !== "function") {
        return false;
    }

    try {
        Reflect.construct(String, [], target);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {

        return false;
    }

    return true;
};
