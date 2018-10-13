/**
 * @author WMXPY
 * @namespace Extension
 * @description Internal
 */

export const internalPrint = (...contents: any[]): void => {

    console.log(...contents.map((content) => content ? content.toString() : 'undefined'));
};

export const internalSleep = (time: any): Promise<any> => {

    return new Promise<any>((resolve) => {

        setTimeout(() => {
            resolve();
        }, time);
    });
};
