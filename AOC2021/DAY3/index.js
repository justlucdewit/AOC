const fs = require('fs')
const helpers = require('../helpers/helpers')
const input = fs.readFileSync('./input.txt')
                .toString()
                .split('\n')
                .map(x => x.split('').map(x => x === '1' ? true : false))

const input_len = input.length

const part1 = () => {
    let oneCounts = new Array(input[0].length)

    oneCounts = [...oneCounts].map(x => 0)

    input.forEach(num => {
        num.forEach((bit, i) => {
            oneCounts[i] += Number(num[i])
        })
    })

    const gamma = parseInt(oneCounts.map(x => x > input_len / 2 ? '1' : '0').join(''), 2);
    const epsilon = parseInt(oneCounts.map(x => x > input_len / 2 ? '0' : '1').join(''), 2);

    return gamma * epsilon
}

const part2 = () => {
    let oxygen_input = JSON.parse(JSON.stringify(input))
    let co2_input = JSON.parse(JSON.stringify(input))
    let stop = false

    oxygen_input[0].forEach((_, bitpos) => {
        if (stop)
            return

        let mostlyOnes = oxygen_input.filter(x => x[bitpos]).length

        if (mostlyOnes > oxygen_input.length/2)
            mostlyOnes = true
        else if (mostlyOnes < oxygen_input.length/2)
            mostlyOnes = false
        else
            mostlyOnes = true

        if (mostlyOnes)
            oxygen_input = oxygen_input.filter(x => x[bitpos])
        else
            oxygen_input = oxygen_input.filter(x => !x[bitpos])

        if (oxygen_input.length <= 1)
            stop = true
    });

    stop = false;

    co2_input[0].forEach((_, bitpos) => {
        if (stop)
            return

        let mostlyOnes = co2_input.filter(x => x[bitpos]).length

        if (mostlyOnes > co2_input.length/2)
        mostlyOnes = false
        else if (mostlyOnes < co2_input.length/2)
        mostlyOnes = true
        else
        mostlyOnes = false

        if (mostlyOnes)
            co2_input = co2_input.filter(x => x[bitpos])
        else
            co2_input = co2_input.filter(x => !x[bitpos])

        if (co2_input.length <= 1)
            stop = true
    });

    const oxygen_rate = parseInt(co2_input[0].map(x => x ? '1' : '0').join(''), 2);
    const co2_rate = parseInt(oxygen_input[0].map(x => x ? '1' : '0').join(''), 2);

    return oxygen_rate * co2_rate
}

console.log(part1())
console.log(part2())