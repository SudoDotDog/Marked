print(1234);

const a = 10;

const b = (c) => {
    print(c + 1);
    return c;
};

const q = (f) => {
    f(a);
};

q(b);