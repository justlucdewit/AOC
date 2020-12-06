const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;

const inputP1 = readFileString("input.txt")
    .split(/\n\n/g) // split each group of people
    .map(x => x.replace(/\n/g, "") // get rid of the enters in the group to get one huge string of answers
    .split("")); // turn into an array of answers

const inputP2 = readFileString("input.txt")
    .split(/\n\n/g) // split each group of people
    .map(x => x.split("\n")); // split each person's answers

const part1 = () => {
    // - turn each array of answers into a set to remove doubles
    // - reduce it using addition and return that
    return inputP1.map(x => new Set(x).size).reduce((acc, num) => acc + num);
};

const part2 = () => {
    let sum = 0;

    // loop trough each group
    inputP2.forEach(x => {
        let answers = x[0];

        // loop trough each person in group and filter out the non duplicate answers
        x.forEach(y => {
            answers = y.split("").filter(x => answers.includes(x));
        });

        // add the answers the number of answers that werent filtered out
        sum += answers.length;
    });

    return sum
};

console.log(part2());