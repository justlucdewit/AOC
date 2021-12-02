const fs = require('fs')
const helpers = require('../helpers/helpers')
const input = fs.readFileSync('./input.txt')
                .toString()
                .split('\n')
                .map(x => x.split(' '))
                .map(x => {
                    x[1] = Number(x[1]);
                    return x
                })

const part1 = () => {
    let hpos = 0;
    let vpos = 0;
    let aim = 0;

    input.forEach(command => {
        if (command[0] == 'forward') {
            hpos += command[1]
            vpos += aim * command[1]
        } else if (command[0] == 'up') {
            aim -= command[1]
        } else if (command[0] == 'down') {
            aim += command[1]
        }
    });

    return hpos * vpos;
}

const part2 = () => {
    return
}

console.log(part1())
// console.log(part2())