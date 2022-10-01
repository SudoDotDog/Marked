let count = 0;
outer: while (count < 10) {
    for (let j = 0; j < 4; j++) {
        middle: for (let k = 0; k < 4; k++) {
            for (let l = 0; l < 4; l++) {
                count++;
                if (count % 2 === 0) {
                    continue outer;
                }
            }
        }
    }
}
console.log(count);
