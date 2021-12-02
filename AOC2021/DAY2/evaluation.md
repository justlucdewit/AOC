# Advent of code day 2

Todat I woke up too late again, however this time only 3 minutes too late.
despite that, i managed to solve this problem in just 11 minutes and 32
seconds. :D

This problem was slightly more advanced then day 1, but still very easy. The
parsing was very easy, since i could split on the lines to get the commands,
and then for each command, split on space to get the individual tokens:

```
const input = fs.readFileSync('./input.txt')
                .toString()
                .split('\n')
                .map(x => x.split(' '))
                .map(x => {
                    x[1] = Number(x[1]);
                    return x
                })
```

And then it was just a matter of looping over all of the commands in the input
and throwing the first token into a if else chain, and modifying some variables
based on that.

```
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
```
