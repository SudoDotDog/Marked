import print from 'print';

const a = () => {
    try {
        throw 123;
        return "Passed";
    } catch (reason) {
        try {
            throw 456;
        } catch (secondReason) {
            return "Caught";
        }
    } finally {
        print("Finally");
    }
};

print(a());
