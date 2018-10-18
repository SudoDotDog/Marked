import print from 'print';

const b = (() => {
    for (const a of [1, 2, 3]) {
        a
        return a;
    }
    return print(a);
});

const c = b();
print(c);