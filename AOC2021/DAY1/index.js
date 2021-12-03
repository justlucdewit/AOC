const fs = require('fs')
const helpers = require('../helpers/helpers')
const input = fs.readFileSync('./input.txt')
                .toString()

const part1 = () => {
    const depths = input.split`\n`.map(Number);

    let n = 0;

    for (let i = 1; i < depths.length; i++) {
        const prevDepth = depths[i - 1];
        const depth = depths[i];

        console.log(depth, prevDepth, depth > prevDepth)

        n += depth > prevDepth;
    }

    return n
}

const part2 = () => {
    const depths = input.split`\n`.map(Number);

    let n = 0;

    for (let i = 2; i < depths.length - 1; i++) {
        const prevSum = depths[i - 2] + depths[i - 1] + depths[i];
        const sum = depths[i - 1] + depths[i] + depths[i + 1];

        n += sum > prevSum;
    }

    return n
}

console.log(part1())
console.log(part2())