const helpers = require("../Helpers/fileReader");

const readFileString = helpers.readFileString;
const readFileLines = helpers.readFileLines;
const readFileCommas = helpers.readFileCommas;

let input = readFileLines("input.txt").map(x => x.split(" "));

const part1 = (inp = input) => {
    let acc = 0;
    let i = 0;
    let instructions = [];

    while (i < inp.length) {
        if (instructions.includes(i) || i < 0) {
            console.log(`found duplicate number ${i}`)
            return false;
        }
        
        instructions.push(i);

        switch(inp[i][0]) {
            case 'acc': {
                const n = Number(inp[i][1]);
                acc += n;
                ++i;
                break;
            }

            case 'jmp': {
                const n = Number(inp[i][1]);
                i += n;
                
                break;
            }

            case 'nop': {
                ++i;
                break;
            }
        }
    }

    return acc;
};

const part2 = () => {    
    input.forEach((_, i) => {
        if (input[i][0] === "jmp") {
            input[i][0] = "nop";
            const res = part1(input);
            input[i][0] = "jmp";

            if (res !== false) {
                console.log("found! " + res);
                process.exit(0);
            }
        } else if (input[i][0] === "nop") {
            input[i][0] = "jmp";
            const res = part1(input);
            input[i][0] = "nop";

            if (res !== false) {
                console.log("found! " + res);
                process.exit(0);
            }
        }
    });
};

console.log(part2());