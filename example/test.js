print(1234);

const a = 10;

const b = (c) => {
    if (!c) {
        print(c++ + 1);
    } else {
        sleep(5000);
        print(c++ + 2);
        print(c);
    }
    return c;
};

const q = (f) => {
    f(a);
};

q(b);
print(1234);