const fs = require('fs')
const helpers = require('../helpers/helpers')
const entries = fs.readFileSync('./input.txt')
                .toString()
                .replace(/\r/g, '')
                .split('\n')
                .map(entry => {
                    const delimited = entry.split(' | ');
                    return {
                        uniqueSignalPatterns: delimited[0].split(' '),
                        outputValue: delimited[1]?.split(' ')
                    }
                })

// Remove last entry

const part1 = () => {
    let sum = 0;
    entries.forEach(entry => {
        const outputValueDigitsWithUniqueNumberOfSegments = (entry.outputValue?.filter(x => x.length == 7 || x.length == 2 || x.length == 3 || x.length == 4))
        sum += outputValueDigitsWithUniqueNumberOfSegments?.length

    })

    return sum
}

const part2 = () => {
    const produceRandomConfiguration = (uniqueSignalPatterns) => {
        // Based on the unique signal patterns, 
        let parts = 'abcdefg'.split('');
        const output = {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
        };

        const segmentsForSeven = uniqueSignalPatterns.filter(x => x.length == 3)[0];
        const segmentsForOne = uniqueSignalPatterns.filter(x => x.length == 2)[0];

        // If both are found
        if (segmentsForSeven.length > 0 && segmentsForOne.length > 0) {
            // Find the segment that is in segmentsForSeven but not in segmentsForOne
            const theFirstSegment = segmentsForSeven.split('').filter(x => !segmentsForOne.split('').includes(x))[0];
            output[0] = theFirstSegment;

            // Remove theFirstSegment from the parts
            parts = parts.filter(x => x != theFirstSegment);
        }

        // Loop over the keys of output
        for (let key in output) {
            // Only if not set yet
            if (output[key] != null)
                continue;
                
            // Pick a random part to put into the output
            const randomPart = parts[Math.floor(Math.random() * parts.length)];

            // Remove the part
            parts = parts.filter(x => x !== randomPart);

            // Put the part into the output
            output[key] = randomPart;
        }

        return output;
    }

    const decodeDigit = (value, config) => {
        let output = '';

        // For each digit in value
        value.split('').map(digit => {
            // Find the digit in the config by value
            const matchingKey = Object.keys(config).filter(x => config[x] == digit)[0];
            output += matchingKey;
        })

        const correctDigits = {
            '012456': 0,
            '25': 1,
            '01356': 2,
            '02356': 3,
            '1235': 4,
            '01356': 5,
            '013456': 6,
            '025': 7,
            '0123456': 8,
            '012356': 9
        }

        return correctDigits[output];
    }

    const trying = entries[0];

    let decodedDigit = undefined

    while (decodedDigit == undefined) {
        const randomConfig = produceRandomConfiguration([...trying.uniqueSignalPatterns, trying.outputValue]);
        decodedDigit = decodeDigit(trying.outputValue[0], randomConfig);
    }

    return decodeDigit
}

console.log(part2())