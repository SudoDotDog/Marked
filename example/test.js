print(1234);// test

const a = 10;// test

const b = (c) => {
    if (!c) {
        print(c++ + 1);
    } else {
        sleep(10);
        for (let i = 0; i < 3; i++) {
            print(c++ + 3);
            print(i);

            break;
        }
    }
    return c;// test
};

const q = (f) => {
    f(a);
};

q(b);
print(1234);