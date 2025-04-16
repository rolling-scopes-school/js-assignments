'use strict';

function getFizzBuzz(num) {
    if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
    if (num % 3 === 0) return 'Fizz';
    if (num % 5 === 0) return 'Buzz';
    return num;
}

function getFactorial(n) {
    if (n === 0) return 1;
    return n * getFactorial(n - 1);
}

function getSumBetweenNumbers(n1, n2) {
    let sum = 0;
    for (let i = n1; i <= n2; i++) {
        sum += i;
    }
    return sum;
}

function isTriangle(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
}

function doRectanglesOverlap(rect1, rect2) {
    return rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top;
}

function isInsideCircle(circle, point) {
    const dx = point.x - circle.center.x;
    const dy = point.y - circle.center.y;
    return dx * dx + dy * dy < circle.radius * circle.radius;
}

function findFirstSingleChar(str) {
    const charCount = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }
    for (let i = 0; i < str.length; i++) {
        if (charCount[str[i]] === 1) {
            return str[i];
        }
    }
    return null;
}

function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    const startBracket = isStartIncluded ? '[' : '(';
    const endBracket = isEndIncluded ? ']' : ')';
    return `${startBracket}${start}, ${end}${endBracket}`;
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function reverseInteger(num) {
    return parseInt(num.toString().split('').reverse().join(''), 10);
}

function isCreditCardNumber(ccn) {
    const digits = ccn.toString().split('').reverse().map(Number);
    const sum = digits.reduce((acc, digit, index) => {
        if (index % 2 !== 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        return acc + digit;
    }, 0);
    return sum % 10 === 0;
}

function getDigitalRoot(num) {
    while (num >= 10) {
        num = num.toString().split('').reduce((acc, digit) => acc + +digit, 0);
    }
    return num;
}

function isBracketsBalanced(str) {
    const stack = [];
    const pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (pairs[char]) {
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            if (pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

function timespanToHumanString(startDate, endDate) {
    const diff = Math.abs(endDate - startDate);
    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (diff < 45 * sec) return 'a few seconds ago';
    if (diff < 90 * sec) return 'a minute ago';
    if (diff < 45 * min) return `${Math.round(diff / min)} minutes ago`;
    if (diff < 90 * min) return 'an hour ago';
    if (diff < 22 * hour) return `${Math.round(diff / hour)} hours ago`;
    if (diff < 36 * hour) return 'a day ago';
    if (diff < 25 * day) return `${Math.round(diff / day)} days ago`;
    if (diff < 45 * day) return 'a month ago';
    if (diff < 345 * day) return `${Math.round(diff / month)} months ago`;
    if (diff < 545 * day) return 'a year ago';
    return `${Math.round(diff / year)} years ago`;
}

function toNaryString(num, n) {
    return num.toString(n);
}

function getCommonDirectoryPath(pathes) {
    const splitPaths = pathes.map(path => path.split('/'));
    let commonPath = '';
    for (let i = 0; i < splitPaths[0].length; i++) {
        const segment = splitPaths[0][i];
        if (splitPaths.every(path => path[i] === segment)) {
            commonPath += segment + '/';
        } else {
            break;
        }
    }
    return commonPath || '';
}

function getMatrixProduct(m1, m2) {
    const result = [];
    for (let i = 0; i < m1.length; i++) {
        result[i] = [];
        for (let j = 0; j < m2[0].length; j++) {
            result[i][j] = m1[i].reduce((sum, value, index) => sum + value * m2[index][j], 0);
        }
    }
    return result;
}

function evaluateTicTacToePosition(position) {
    const lines = [
        [position[0][0], position[0][1], position[0][2]],
        [position[1][0], position[1][1], position[1][2]],
        [position[2][0], position[2][1], position[2][2]],
        [position[0][0], position[1][0], position[2][0]],
        [position[0][1], position[1][1], position[2][1]],
        [position[0][2], position[1][2], position[2][2]],
        [position[0][0], position[1][1], position[2][2]],
        [position[0][2], position[1][1], position[2][0]],
    ];

    for (let line of lines) {
        if (line[0] && line[0] === line[1] && line[0] === line[2]) {
            return line[0];
        }
    }

    return undefined;
}

module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString: getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString: timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition: evaluateTicTacToePosition,
};
