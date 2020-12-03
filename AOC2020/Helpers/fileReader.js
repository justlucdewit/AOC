const fs = require("fs");

const readFileString = fileName => String(fs.readFileSync(fileName));
const readFileLines = fileName => readFileString(fileName).split("\n");
const readFileCommas = fileName => readFileString(fileName).split(",");

module.exports = {
    readFileString,
    readFileLines,
    readFileCommas
};