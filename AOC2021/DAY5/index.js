const fs = require('fs')
const input = fs.readFileSync('./input.txt')
                .toString()
                .split('\n')
                .map(x => x.split(' -> '))
                .map(x => x.map(y => y.split(',').map(Number)))
                .map(x => ({
                    x1: x[0][0],
                    y1: x[0][1],
                    x2: x[1][0],
                    y2: x[1][1]
                }))

vent_coords = {}

const handleHorizontal = vector => {
    const until = Math.max(vector.y1, vector.y2)
    const start = Math.min(vector.y1, vector.y2)
    const x = vector.x1

    for (let y = start; y <= until; y++) {
        if (vent_coords[`${x},${y}`] === undefined)
            vent_coords[`${x},${y}`] = 1
        else
            vent_coords[`${x},${y}`]++
    }
}

const handleVertical = vector => {
    const until = Math.max(vector.x1, vector.x2)
    const start = Math.min(vector.x1, vector.x2)
    const y = vector.y1

    for (let x = start; x <= until; x++) {
        if (vent_coords[`${x},${y}`] === undefined)
            vent_coords[`${x},${y}`] = 1
        else
            vent_coords[`${x},${y}`]++
    }
}

const handleDiagonal = vector => {
    let x = vector.x1
    let XDirection = vector.x2 > vector.x1 ? 1 : -1

    let y = vector.y1
    let YDirection = vector.y2 > vector.y1 ? 1 : -1

    while (x != vector.x2 + XDirection) {
        if (vent_coords[`${x},${y}`] === undefined)
            vent_coords[`${x},${y}`] = 1
        else
            vent_coords[`${x},${y}`]++

        y += YDirection
        x += XDirection
    }
}

const numOfDangerousAreas = () => {
    return Object.values(vent_coords).filter(x => x >= 2).length
}

const part1 = () => {
    input.forEach(line => {

        // Handle horizontal line
        if (line.x1 == line.x2)
            handleHorizontal(line)

        // Handle vertical line
        else if (line.y1 == line.y2)
            handleVertical(line)
    })
    
    return numOfDangerousAreas()
}

const part2 = () => {
    input.forEach(line => {

        // Handle horizontal line
        if (line.x1 == line.x2)
            handleHorizontal(line)

        // Handle vertical line
        else if (line.y1 == line.y2)
            handleVertical(line)

        // Handle diagonal line
        else if (Math.abs(line.x1 - line.x2) == Math.abs(line.y1 - line.y2))
            handleDiagonal(line)
    })

    return numOfDangerousAreas()
}

console.log(part1())

vent_coords = {}

console.log(part2())