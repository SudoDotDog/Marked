const a = 10; // test
const ll = [656, 2, 3, 1, 1, 1, 1, 1, 1];
const ccc = {
    a: 1,
    b: () => 1,
    'some': 2,
}
const some = ccc.some;
print('some', some);

const b = (c) => {
    if (!c || true) {
        print(3, c++ + 1);
    } else {
        sleep(10);
        print(4, ll.length);
        for (let i = 0; i < 3; i++) {
            print(5, c++ + 3);
            print(6, i);

            break;
        }
    }
    return c; // test
};
print(ll[0]);
const q = (f) => {
    f(a);
};
export default 1;
q(b);