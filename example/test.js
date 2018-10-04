print(1234);

const a = 10;

const b = (c) => {
    if (!c) {
        print(c++ + 1);
    } else {
        print(c++ + 2);
        print(c);
    }
    return c;
};

const q = (f) => {
    f(a);
};

q(b);