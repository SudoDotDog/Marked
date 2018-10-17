import print from 'print';

let test = "";
for (let i = 0; i < 10; i++) {
    if (i === 3) { continue; }
    print(i);
}
