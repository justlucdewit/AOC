/*
    If a seat is empty (L) and there are no occupied
    seats adjacent to it, the seat becomes occupied.
    
    If a seat is occupied (#) and four or more seats
    adjacent to it are also occupied, the seat becomes empty.
    
    Otherwise, the seat's state does not change.
*/

const helpers = require("../Helpers/fileReader");

const readFileLines = helpers.readFileLines

let input = readFileLines("input.txt").map(x => x.replace(/\n|\r/, "").split(""));

const lookForSeat = (state, x, y, dir) => {
	let magnitude = 1;

	switch(dir) {
		case 0: {
			while(state[y][x + magnitude] === '.') {
				++magnitude;
			}

			return state[y][x + magnitude];
		}

		case 1: {
			while(state[y][x - magnitude] === '.') {
				++magnitude;
			}

			return state[y][x - magnitude];
		}

		case 2: {
			while((state[y + magnitude] ? state[y + magnitude][x] : undefined) === '.') {
				++magnitude;
			}

			return state[y + magnitude] ? state[y + magnitude][x] : undefined;
		}

		case 3: {
			while((state[y - magnitude] ? state[y - magnitude][x] : undefined) === '.') {
				++magnitude;
			}

			return state[y - magnitude] ? state[y - magnitude][x] : undefined;
		}

		case 4: {
			while((state[y + magnitude] ? state[y + magnitude][x + magnitude] : undefined) === '.') {
				++magnitude;
			}

			return state[y + magnitude] ? state[y + magnitude][x + magnitude] : undefined;
		}

		case 5: {
			while((state[y + magnitude] ? state[y + magnitude][x - magnitude] : undefined) === '.') {
				++magnitude;
			}

			return state[y + magnitude] ? state[y + magnitude][x - magnitude] : undefined;
		}

		case 6: {
			while((state[y - magnitude] ? state[y - magnitude][x + magnitude] : undefined) === '.') {
				++magnitude;
			}

			return state[y - magnitude] ? state[y - magnitude][x + magnitude] : undefined;
		}

		case 7: {
			while((state[y - magnitude] ? state[y - magnitude][x - magnitude] : undefined) === '.') {
				++magnitude;
			}

			return state[y - magnitude] ? state[y - magnitude][x - magnitude] : undefined;
		}
	}
}

const getAdjacents = (state, x, y) => 
	[
		state[y][x + 1], 
		state[y][x - 1],
		state[y + 1] ? state[y + 1][x] : undefined,
		state[y - 1] ? state[y - 1][x] : undefined,
		state[y + 1] ? state[y + 1][x + 1] : undefined,
		state[y + 1] ? state[y + 1][x - 1] : undefined,
		state[y - 1] ? state[y - 1][x + 1] : undefined,
		state[y - 1] ? state[y - 1][x - 1] : undefined
	]

const getAdjacentsP2 = (state, x, y) => 
	[
		lookForSeat(state, x, y, 0), 
		lookForSeat(state, x, y, 1),
		lookForSeat(state, x, y, 2),
		lookForSeat(state, x, y, 3),
		lookForSeat(state, x, y, 4), 
		lookForSeat(state, x, y, 5),
		lookForSeat(state, x, y, 6),
		lookForSeat(state, x, y, 7),
	]

const part1 = () => {
	while (true) {
		const cloned = JSON.parse(JSON.stringify(input));
		let changes = 0;

		input.forEach((row, y) => {
			row.forEach((seat, x) => {
				if (seat === '#') {
					if (getAdjacents(input, x, y).filter(x => x == '#').length >= 4) {
						cloned[y][x] = 'L';
						++changes;
					}
				} else if (seat === 'L') {
					if (getAdjacents(input, x, y).every(x => x !== '#')) {
						cloned[y][x] = '#';
						++changes;
					}
				}
			});
		});

		if (changes === 0)
			break;

		input = JSON.parse(JSON.stringify(cloned));
	}

	let count = 0;

	input.forEach((row) => {
		row.forEach((seat) => {
			if (seat === '#')
				++count;
		});
	});

	return count;
};

const part2 = () => {
	while (true) {
		const cloned = JSON.parse(JSON.stringify(input));
		let changes = 0;

		input.forEach((row, y) => {
			row.forEach((seat, x) => {
				if (seat === '#') {
					// console.log(getAdjacentsP2(input, x, y))
					if (getAdjacentsP2(input, x, y).filter(x => x == '#').length >= 5) {
						cloned[y][x] = 'L';
						++changes;
					}
				} else if (seat === 'L') {
					// console.log(getAdjacentsP2(input, x, y))
					if (getAdjacentsP2(input, x, y).every(x => x !== '#')) {
						cloned[y][x] = '#';
						++changes;
					}
				}
			});
		});

		if (changes === 0)
			break;

		input = JSON.parse(JSON.stringify(cloned));
		// console.log(input)
	}

	let count = 0;

	input.forEach((row) => {
		row.forEach((seat) => {
			if (seat === '#')
				++count;
		});
	});

	return count;
}

console.log(part2());