export default 1;
export const a = 1;

const b = 2;
const c = 3;

export {
    b, c as CC,
};

export const [d, e] = [4, 5];
export const { f, g } = { f: 6, g: 7 };
