const fs = require('fs')
const helpers = require('../helpers/helpers')
let input = fs.readFileSync('./input.txt')
    .toString()
    .split(',')
    .map(Number)

let fish = []

input.forEach(item => {
    const match = fish.find(x => x.daysLeft == item)
    if (match) {
        match.fishCount++;
    } else {
        fish.push({
            fishCount: 1,
            daysLeft: item
        })
    }
});

const calculateNextFishGeneration = () => {
    console.log(fish)

    fish.forEach(fsh => {

    })
}

const part1 = () => {
    for (let i = 0; i < 80; i++) {
        calculateNextFishGeneration()
    }

    return fish.length
}

const part2 = () => {
    for (let i = 0; i < 256; i++) {
        calculateNextFishGeneration()
    }

    return fish.length
}

// console.log(part1())
console.log(part2())