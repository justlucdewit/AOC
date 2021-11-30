Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b);
}

Array.prototype.product = function () {
    return this.reduce((a, b) => a * b);
}

Array.prototype.select_max = function (predicate = (x) => x) {
    let max_predicate_value = null;
    let max_value = null;

    this.forEach(val => {
        predicate_value = predicate(val);

        if (predicate_value > max_predicate_value || max_predicate_value == null) {
            max_predicate_value = predicate_value;
            max_value = val;
        }
    });

    return max_value;
}

Array.prototype.select_min = function (predicate = (x) => x) {
    let min_predicate_value = null;
    let min_value = null;

    this.forEach(val => {
        predicate_value = predicate(val);

        if (predicate_value < min_predicate_value || min_predicate_value == null) {
            min_predicate_value = predicate_value;
            min_value = val;
        }
    });

    return min_value;
}

const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

const isPrime = n => {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0) return false;

    return n > 1;
};

const isPythTriplet = (a, b, c) => Math.sqrt(a ** 2 + b ** 2) === c;

const nthTriangleNum = (n) => range(1, n).sum()

const divisors = (n) => {
    let acc = [];

    for (let i = 1; i < Math.ceil(n / 2) + 1; i++)
        if (n % i === 0)
            acc.push(i);

    acc.push(n)

    return acc;
}

const divisorsCount = (n) => {
    let acc = 0;

    for (let i = 1; i < Math.ceil(Math.sqrt(n)); i++)
        if (n % i === 0)
            acc += Number.isInteger(Math.sqrt(n)) ? 1 : 2;

    return acc;
}

const time = (predicate, test_perf = 1) => {
    start = Date.now();

    for (let i = 0; i < test_perf; i++) {
        predicate();
    }

    timeDuration = Date.now() - start;

    if (test_perf > 1) {
        console.log(`Did ${test_perf} tests\nExecution took ${timeDuration / 1000 / test_perf}sec on avarage`)
    } else {
        console.log(`execution took ${timeDuration / 1000}sec`)
    }
}

const collatzSequence = (n) => {
    const acc = [n];

    while (n !== 1) {
        // collartz alg
        n = n % 2 == 0 ? n / 2 : 3 * n + 1;
        acc.push(n);
    }

    return acc
};

const collatzSequenceCount = (n) => {
    let acc = 0;

    while (n !== 1) {
        // collartz alg
        n = n % 2 == 0 ? n / 2 : 3 * n + 1;
        ++acc;
    }

    return acc;
};

const factorial = n => n == 1 ? n : n * factorial(n - 1);

const bigint_factorial = n => n == 1 ? n : n * bigint_factorial(n - BigInt(1));

const aChooseB = (a, b) => {
    return factorial(a) / (factorial(b) * factorial(a - b))
}

// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
const yearIsLeap = year =>
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

// Function to test if n is amicable
// with d() as helper function

// d(n) is defined as the sum of the proper divisors of n
// (proper divisors = numbers less than n which divide
// evenly into n)
const d = n => divisors(n).sum() - n;
const isAmicable = n =>
    d(d(n)) == n && n !== d(n);

module.exports = {
    range,
    isPrime,
    isPythTriplet,
    nthTriangleNum,
    divisors,
    divisorsCount,
    time,
    collatzSequence,
    collatzSequenceCount,
    aChooseB,
    factorial,
    yearIsLeap,
    bigint_factorial,
    isAmicable
}
