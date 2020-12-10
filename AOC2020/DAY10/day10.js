const helpers = require("../Helpers/fileReader");

const readFileLines = helpers.readFileLines

let input = readFileLines("input.txt");

const jolts = input
    .map(Number)
    .sort((a, b) => a - b);

const part1 = () => {
    const deltaJolts = jolts.map((cur, indx) => jolts[indx + 1] - cur);
    return deltaJolts.filter(d => d === 1).length * deltaJolts.filter(d => d === 3).length;
};

const part2 = () => {
    return jolts.reduce((acc, jolt) => {
      acc[jolt] =
        (acc[jolt - 3] || 0) +
        (acc[jolt - 2] || 0) +
        (acc[jolt - 1] || 0)
      return acc;
    }, [1]).pop();
}

console.log(part1());