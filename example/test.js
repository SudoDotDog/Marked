print(1, 1234);// test

const a = 10;// test
const ll = [656, 2, 3, 1, 1, 1, 1, 1, 1];
print(2, ll);
const b = (c) => {
    if (!c) {
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
    return c;// test
};
print(ll[0]);
const q = (f) => {
    f(a);
};

q(b);
for(let a of ll){
    print(a);
}
print(1234);
