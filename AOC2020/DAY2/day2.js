const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;
const readFileLines = helpers.readFileLines;
const readFileCommas = helpers.readFileCommas;

const input = readFileLines("input.txt");

const part1 = () => {
    let validCount = 0;

    input.forEach(pw => {
        pw = pw.split(" ");
        const [min, max] = pw[0].split("-").map(Number);
        const letter = pw[1][0];
        const str = pw[2];

        let count = str.replace(new RegExp(`[^${letter}]`, "g"), "").length;

        if (count >= min && count <= max)
            validCount++;
    });
    return validCount;
};


const part2 = () => {
    let validCount = 0;

    input.forEach(pw => {
        pw = pw.split(" ");
        const [min, max] = pw[0].split("-").map(Number);
        const letter = pw[1][0];
        const str = pw[2];

        if ((Number(str[min - 1] === letter) + Number(str[max - 1] === letter)) === 1)
            validCount++;
    });

    return validCount;
};

console.log(part2());