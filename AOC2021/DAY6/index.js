const fs = require('fs')
const helpers = require('../helpers/helpers')
let fish = fs.readFileSync('./input.txt')
                .toString()
                .split(',')
                .map(Number)

const calculateNextFishGeneration = () => {

    // Lower the counter of all fishes
    fish = fish.map(x => x - 1)

    
}

const part1 = () => {
    for (let i = 0; i < 5; i++) {
        console.log(fish)
        calculateNextFishGeneration()
    }

    return ''
}

const part2 = () => {
    return
}

console.log(part1())
// console.log(part2())