import print from 'print'; // trailing

let b = 0;
const a = () => {
    b++;
    b++;
};

a();
print(b);