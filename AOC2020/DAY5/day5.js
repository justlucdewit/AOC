const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;
const readFileLines = helpers.readFileLines;
const readFileCommas = helpers.readFileCommas;

// convert the B and R symbols into the binary digit 1 and the F and L symbols into the binary digit 0
const input = readFileLines("input.txt").map(seat => seat.split("").map(char => char === 'B' || char === 'R' ? 1 : 0));

// for each bit of the array of bits, split the ones that contain to the row and column
rows = input.map(x => x.filter((_, i) => i < 7)).map(x => parseInt(x.join(""), 2));
cols = input.map(x => x.filter((_, i) => i >= 7)).map(x => parseInt(x.join(""), 2));

const part1 = () => {

    // calculate each seat's id and find the highest
    return [...rows.map((row, i) => row * 8 + cols[i])];
};


const part2 = () => {
    const ids = [];
    let highestId = 0;
    let smallestId = 9999999999999999;

    // calculate each seat's id and find the highest and smallest, and get a list of all of them
    rows.forEach((row, i) => {
        const col = cols[i];
        const id = row * 8 + col;
        
        if (id < smallestId)
            smallestId = id;

        if (id > highestId)
            highestId = id;

        ids.push(id);
    });

    // generate a list of all the seat id's this plane contains
    possibleIds = [...Array(highestId - smallestId)].map((_, i) => smallestId + i);

    // filter out all the seats that are included in the ids array
    return possibleIds.filter(x => !ids.includes(x))[0]; // return the first (and only) value
};

console.log(part1());