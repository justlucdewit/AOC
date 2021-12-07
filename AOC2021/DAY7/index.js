const fs = require('fs')
const helpers = require('../helpers/helpers')
const input = fs.readFileSync('./input.txt')
                .toString()
                .split(',')
                .map(Number)

const part1 = () => {
    const lowest = input.min()
    const highest = input.max()
    
    let lowestFuelSpending = 999999999999

    for (let i = lowest; i <= highest; i++) {
        const totalFuelSpending = [...input]
            .map(x => Math.abs(i - x))
            .sum()

        if (totalFuelSpending < lowestFuelSpending)
            lowestFuelSpending = totalFuelSpending
    }
    
    return lowestFuelSpending
}

const part2 = () => {
    const lowest = input.min()
    const highest = input.max()
    
    let lowestFuelSpending = 999999999999

    for (let i = lowest; i <= highest; i++) {
        const totalFuelSpending = [...input]
            .map(x => helpers.nthTriangleNum(Math.abs(i - x)))
            .sum()

        if (totalFuelSpending < lowestFuelSpending)
            lowestFuelSpending = totalFuelSpending
    }
    
    return lowestFuelSpending
}

// console.log(part1())
console.log(part2())