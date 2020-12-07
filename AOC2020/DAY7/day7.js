const { cpuUsage } = require("process");
const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;
const readFileLines = helpers.readFileLines;
const readFileCommas = helpers.readFileCommas;

const input = readFileLines("input.txt")
const inpLines = input.map(x => x.split(" "));

// get the array of available colors
const outerColors = inpLines.map(line => `${line[0]} ${line[1]}`);

// get a matrix of what colors each color at the same index at the outerColors array can hold
const innerColors = input.map(line => {
    let colors = [];
    const reg = /\d \w+ \w+ bag/g;
    let result;

    while ((result = reg.exec(line)) !== null) {
        colors.push(result[0]);
    }

    return colors;
});

const part1 = () => {
    // array to keep track of visited indexes
    const passedIndexes = [];

    const lookfor = color => {
        innerColors.forEach((x, index) => {
            // if already visited, skip
            if (passedIndexes.includes(index)) {
                return;
            }

            // also look in the children
            x.forEach(y => {
                if (y.includes(color)) {
                    passedIndexes.push(index);
                    lookfor(outerColors[index]);
                }
            });
        });
    };

    lookfor("shiny gold");
    return passedIndexes.length;
};

const part2 = () => {
    let bagCount = 0;

    const lookfor = (color, multiplier = 1, indent = 0) => {
        innerColors.forEach((x, index) => {
            // if the current bag is the bag of the color passed to the function
            if (!outerColors[index].includes(color))
                return;

            // do the same to all the children
            x.forEach(y => {
                bagCount += Number(/\d+/.exec(y)) * multiplier;
                const nameParts = y.split(" ");
                lookfor(`${nameParts[1]} ${nameParts[2]}`, Number(/\d+/.exec(y)) * multiplier, indent + 1);
            });
        });
    };
    
    lookfor("shiny gold");
    return bagCount;
};

console.log(part1());