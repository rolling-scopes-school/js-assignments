'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates          *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math    *
 *                                                                                          *
 ********************************************************************************************/


function getRectangleArea(width, height) {
    return width * height;
}

function getCicleCircumference(radius) {
    return 2 * Math.PI * radius;
}

function getAverage(value1, value2) {
    return (value1 / 2) + (value2 / 2);
}

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function getLinearEquationRoot(a, b) {
    return -b / a;
}

function getAngleBetweenVectors(x1, y1, x2, y2) {
    const dotProduct = x1 * x2 + y1 * y2;
    const magnitude1 = Math.sqrt(x1 * x1 + y1 * y1);
    const magnitude2 = Math.sqrt(x2 * x2 + y2 * y2);
    const cosTheta = dotProduct / (magnitude1 * magnitude2);
    return Math.acos(cosTheta);
}

function getLastDigit(value) {
    return Math.abs(value % 10);
}

function parseNumberFromString(value) {
    return parseFloat(value);
}

function getParallelipidedDiagonal(a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
}

function roundToPowerOfTen(num, pow) {
    const factor = Math.pow(10, pow);
    return Math.round(num / factor) * factor;
}

function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

function toNumber(value, def) {
    const num = Number(value);
    return isNaN(num) ? def : num;
}

module.exports = {
    getRectangleArea: getRectangleArea,
    getCicleCircumference: getCicleCircumference,
    getAverage: getAverage,
    getDistanceBetweenPoints: getDistanceBetweenPoints,
    getLinearEquationRoot: getLinearEquationRoot,
    getAngleBetweenVectors: getAngleBetweenVectors,
    getLastDigit: getLastDigit,
    parseNumberFromString: parseNumberFromString,
    getParallelipidedDiagonal: getParallelipidedDiagonal,
    roundToPowerOfTen: roundToPowerOfTen,
    isPrime: isPrime,
    toNumber: toNumber
};
