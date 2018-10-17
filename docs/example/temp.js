import print from 'print';

const b =  (() => {
    for (const a of [1, 2, 3]) {
        print(a);
        return a;
    }
});

const c = b();
print(c);
