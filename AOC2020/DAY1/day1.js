const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;
const readFileLines = helpers.readFileLines;
const readFileCommas = helpers.readFileCommas;

const input = readFileLines("input.txt").map(Number);

const part1 = () => {
    answer = null;
    input.forEach(x => {
        input.forEach(y => {
            if (x == y) {
                return;
            } else {
                console.log(x + " and " + y)
                if (x + y === 2020 && !answer) {
                    answer = x * y;
                }
            }
        })
    })
    return answer;
};


const part2 = () => {
    answer = null;
    input.forEach(x => {
        input.forEach(y => {
            input.forEach(z => {
                if (x == y && y == z) {
                    return;
                } else {
                    if (x + y + z === 2020 && !answer) {
                        answer = x * y * z;
                    }
                }
            })
        })
    })
    return answer;
};

console.log(part2());