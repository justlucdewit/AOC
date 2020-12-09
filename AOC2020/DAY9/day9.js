const helpers = require("../Helpers/fileReader");

const readFileLines = helpers.readFileLines

let input = readFileLines("input.txt").map(Number);

const part1 = () => {
    const preambleSize = 25;
    for (let index = 0; index < input.length; index++) {
        if (index < preambleSize)
            continue;

        const num = input[index];
        const preamble = input.filter((n, i) => i > index - preambleSize - 1 && i < index && n < num);
        let summers = null;

        preamble.forEach((a, i1) => {
            preamble.forEach((b, i2) => {
                if (i1 != i2 && a + b === num)
                    summers = [a, b];
            });
        });

        if (!summers)
            return num;
    }
};

const part2 = () => {
    const p1Ans = part1();

    let setLen = 2;
    let ans = null;

    while(!ans) {
        input.forEach((n, i) => {
            if (i > input.length - setLen)
                return;

            const seq = input.slice(i, i + setLen);

            if (seq.reduce((acc, n) => acc + n) === p1Ans)
                ans = seq;
        });

        ++setLen;
    }

    return Math.min(...ans) + Math.max(...ans);
};

console.log(part2());