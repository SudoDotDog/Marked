print(1234);// test

const a = 10;// test

sandbox "test sandbox"

const b = (c) => {
    if (!c) {
        print(c++ + 1);
    } else {
        sleep(10);
        print(c++ + 3);
        print(c);
    }
    return c;// test
};

const q = (f) => {
    f(a);
};

q(b);
print(1234);