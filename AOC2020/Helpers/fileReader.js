const fs = require("fs");

const readFileString = fileName => String(fs.readFileSync(fileName));
const readFileLines = fileName => readFileString(fileName).split("\n");
const readFileCommas = fileName => readFileString(fileName).split(",");
const range = (min, max, step = 1) => [...Array(max - min)].map((_, i) => i * step + min);

Array.prototype.count = function(func) {
	return this.filter(func).length;
}

Object.prototype.clone = function() {
	return JSON.parse(JSON.stringify(this));
}

Array.prototype.RelMatPos = function(x, y, dx, dy, mag = 1) {
	return this[y + dy * mag] !== undefined ? this[y + dy * mag][x + dx * mag] : undefined;
};

module.exports = {
    readFileString,
    readFileLines,
    readFileCommas,
    range
};