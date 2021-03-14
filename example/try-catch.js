import print from 'print';

const a = () => {
    try {
        throw 123;
    } catch (reason) {
        return "Caught";
    }
};

print(a());
