import print from 'print';

const a = (() => 1);

const b = function () {
    return 1
};

const c = (() => {
    return 1
});

function d() {
    return 1;
}

print(a(), b(), c(), d());