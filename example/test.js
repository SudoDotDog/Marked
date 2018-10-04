print(1234);// test

const a = 10;// test
const ll = [656, 2, 3, 1, 1, 1, 1, 1, 1];
print(ll);
sandbox 10;
const b = (c) => {
    if (!c) {
        print(c++ + 1);
    } else {
        sleep(10);
        print(ll.length);
        for (let i = 0; i < 3; i++) {
            print(c++ + 3);
            print(i);

            break;
        }
    }
    return c;// test
};
print(ll[0]);
const q = (f) => {
    f(a);
};

q(b);
print(1234);