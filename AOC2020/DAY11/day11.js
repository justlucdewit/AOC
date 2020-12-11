// import the helpers
const helpers = require("../Helpers/fileReader");

// parse the input
const readFileLines = helpers.readFileLines;
let input = readFileLines("input.txt").map(x => x.replace(/\n|\r/, "").split(""));

const range = helpers.range;
const adjecentCoords = [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]];
const getAdjacents = (state, x, y) => adjecentCoords.map(coord => state.RelMatPos(x, y, coord[0], coord[1]));
const getAdjacentsP2 = (state, x, y) => range(0, 8).map(i => lookForSeat(state, x, y, i));

const lookForSeat = (state, x, y, dir) => {
	let magnitude = 1;

	while (state.RelMatPos(x, y, adjecentCoords[dir][0], adjecentCoords[dir][1], magnitude) == '.')
		++magnitude;

	return state.RelMatPos(x, y, adjecentCoords[dir][0], adjecentCoords[dir][1], magnitude);
}

const part1 = () => {
	while (true) {
		const cloned = input.clone();
		let change = false;

		input.forEach((row, y) => {
			row.forEach((seat, x) => {
				if (seat === '#') {
					if (getAdjacents(input, x, y).count(x => x == '#') >= 4) {
						cloned[y][x] = 'L';
						change = true;
					}
				} else if (seat === 'L') {
					if (getAdjacents(input, x, y).every(x => x !== '#')) {
						cloned[y][x] = '#';
						change = true;
					}
				}
			});
		});

		if (!change)
			break;

		input = cloned.clone();
	}

	return input.flat().count(x => x === '#');
};

const part2 = () => {
	while (true) {
		const cloned = input.clone();
		let changes = 0;

		input.forEach((row, y) => {
			row.forEach((seat, x) => {
				if (seat === '#') {
					if (getAdjacentsP2(input, x, y).filter(x => x === '#').length >= 5) {
						cloned[y][x] = 'L';
						++changes;
					}
				} else if (seat === 'L') {
					if (getAdjacentsP2(input, x, y).every(x => x !== '#')) {
						cloned[y][x] = '#';
						++changes;
					}
				}
			});
		});

		if (changes === 0)
			break;

		input = cloned.clone();
	}

	return input.flat().count(x => x === '#');
}

// console.log("2321 = " + part1());
// console.log("2102 = " + part2());