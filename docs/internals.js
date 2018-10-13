/**
 * @author WMXPY
 * @description Internals
 */

const internalPrint = (...contents) => {

    console.log(...contents.map((content) => content ? content.toString() : 'undefined'));
};

const internalSleep = (time) => {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve();
        }, time);
    });
};

module.exports = {
    internalPrint,
    internalSleep,
};