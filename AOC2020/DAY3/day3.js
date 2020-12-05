const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;
const readFileLines = helpers.readFileLines;
const readFileCommas = helpers.readFileCommas;

const input = readFileLines("input.txt").map(x => x.split("").map(x => x == '.' ? 0 : 1));

const part1 = () => {
    const height = input.length - 1;
    const width = input[0].length;
    let trees = 0;
    let pos = [0, 0]

    while(pos[0] <= height) {
        

        trees += input[pos[0]][pos[1] % width];   

        console.log(input[pos[0]][pos[1] % width], trees, `${pos[0]} / ${height}`, `(${pos[1]}, ${pos[0]})`);

        pos[0] += 1;
        pos[1] += 3;
    }

    return trees;
};


const part2 = () => {
    slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    let answer = 1;
    slopes.forEach(slope => {
        const height = input.length - 1;
        const width = input[0].length;
        let trees = 0;
        let pos = [0, 0]

        while(pos[0] <= height) {
            trees += input[pos[0]][pos[1] % width];   

            pos[0] += slope[1];
            pos[1] += slope[0];
        }

        answer *= trees;
    });

    return answer;
};

console.log(part1());