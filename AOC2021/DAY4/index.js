const fs = require('fs')
const helpers = require('../helpers/helpers')
let input = fs.readFileSync('./input.txt')
                .toString()
                .replace(/  /g, ' ')
                .replace(/\n /g, '\n')
                .split('\n\n')

// Parse the input
const random_numers = input.shift('').split(',')
input = input.map(x => x.split('\n')).map(x => {
    return x.map(y => y.split(' ').map(z => ({
        num: Number(z),
        crossed: false
    })));
})

// Function to mark off a number
const markOffNumber = (card, number) => {
    card.forEach(row => {
        row = row.map(cell => {
            if (cell.num == number)
                cell.crossed = true

            return cell
        })
    })
}

const cardHasBingo = (card) => {
    // Check if there is a bingo in a row
    if (card.some(row => row.every(cell => cell.crossed == true)))
        return true

    // Check if there is a bingo in a column
    if (helpers.transpose(card).some(row => row.every(cell => cell.crossed == true)))
        return true

    return false
}

const bingoUnmarkedSum = (card) => {
    let sum = 0
    card.forEach(row => {
        row.forEach(cell => {
            if (cell.crossed == false)
                sum += cell.num
        })
    })

    return sum
}

// Part 1
const part1 = () => {
    let done = false
    let result = 0

    random_numers.forEach(rnum => {
        if (done)
            return

        // Cross of the number on all bingo cards
        input.forEach(card => {
            markOffNumber(card, rnum)
        })

        // See if any of the cards has a bingo, if so, print it, and quit
        if (input.some(cardHasBingo)) {
            const cardWithBingo = input.find(cardHasBingo)
            const sum = bingoUnmarkedSum(cardWithBingo)
            result = sum * rnum
            done = true
        }
    })

    return result
}

// Part 2
const part2 = () => {
    let done = false
    let result = 0

    random_numers.forEach(rnum => {
        console.log(input.length)

        if (done)
            return

        // Cross of the number on all bingo cards
        input.forEach(card => {
            markOffNumber(card, rnum)
        })

        if (input.length == 1 && cardHasBingo(input[0])) {
            const sum = bingoUnmarkedSum(input[0])
            result = sum * rnum
            done = true
        }

        input = input.filter(card => !cardHasBingo(card))
    })

    return result
}

// console.log(part1())
console.log(part2())