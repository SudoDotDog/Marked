/**
 * @author WMXPY
 * @namespace Util
 * @description Type Check
 */

export const typeCheckIsConstructor = (target: any): boolean => {

    if (typeof target !== 'function') {
        return false;
    }

    try {
        Reflect.construct(String, [], target);
    } catch (e) {
        return false;
    }

    return true;
};
