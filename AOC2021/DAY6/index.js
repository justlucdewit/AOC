const fs = require('fs')
const helpers = require('../helpers/helpers')
let input = fs.readFileSync('./input.txt')
    .toString()
    .split(',')
    .map(Number)

let fish = [
    { fishCount: 0, daysLeft: 0 },
    { fishCount: 0, daysLeft: 1 },
    { fishCount: 0, daysLeft: 2 },
    { fishCount: 0, daysLeft: 3 },
    { fishCount: 0, daysLeft: 4 },
    { fishCount: 0, daysLeft: 5 },
    { fishCount: 0, daysLeft: 6 },
    { fishCount: 0, daysLeft: 7 },
    { fishCount: 0, daysLeft: 8 }
]

input.forEach(item => {
    const match = fish.find(x => x.daysLeft == item)
    match.fishCount++;
});

let fishcpy = JSON.parse(JSON.stringify(fish))

const calculateNextFishGeneration = () => {
    fish.forEach(fsh => {
        fsh.daysLeft--;

        if (fsh.daysLeft < 0) {
            const match = fish.find(x => x.daysLeft == 7)
            match.fishCount += fsh.fishCount

            fish.push({
                fishCount: fsh.fishCount,
                daysLeft: 8
            })
        }
    })

    fish = fish.filter(x => x.daysLeft >= 0)
}

const part1 = () => {
    for (let i = 0; i < 80; i++)
        calculateNextFishGeneration()

    return fish.map(x => x.fishCount).sum()
}

const part2 = () => {
    for (let i = 0; i < 256; i++)
        calculateNextFishGeneration()

    return fish.map(x => x.fishCount).sum()
}

console.log(part1())
fish = fishcpy
console.log(part2())