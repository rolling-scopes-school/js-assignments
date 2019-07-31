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
    let c = 2 * radius * Math.PI;
    return c;
}

function getAverage(value1, value2) {
   return ((value1 / 2) + (value2 / 2)); 
}

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    let horizontalDistSqrd = Math.pow(x1 - x2, 2);
    let verticalDistSqrd   = Math.pow(y1 - y2, 2);
    let distance           = Math.sqrt(horizontalDistSqrd + verticalDistSqrd);

    return distance;
}

function getLinearEquationRoot(a, b) {
    return -(b / a);
}


function getAngleBetweenVectors(x1, y1, x2, y2) {
    
    let numerator = (x1 * x2) + (y1 * y2);
    let denumerator = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)) * 
                      Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
    let cosfi = numerator / denumerator;

    return Math.acos(cosfi);
} 


function getLastDigit(value) {
    return value % 10;
}

function parseNumberFromString(value) {
    return  Number(value);
}

function getParallelipidedDiagonal(a,b,c) {
    let sqrOfA = Math.pow(a, 2);
    let sqrOfB = Math.pow(b, 2);
    let sqrOfC = Math.pow(c, 2);
    let sum = sqrOfA + sqrOfB + sqrOfC;

    return Math.sqrt(sum);
}

function roundToPowerOfTen(num, pow) {
    let valueOfTen   = Math.pow(10, pow);
    let remainder    = num % valueOfTen;
    let valueToRound = valueOfTen - remainder;

        if(valueToRound > remainder)
            num -= remainder;
        else
            num += valueToRound;

    return num;   
}

function isPrime(n) {
    let i = 2;
    let lowerLimit = Math.sqrt(n); 
    /*the iterator runs till the sqrt of n*/

    for(; i <= lowerLimit; i++) {
        if(n % i === 0) 
            return false; 
    }
    return n > 1; 
}

function toNumber(value, def) {
    if (!!Number(value))
        return Number(value);
    
    return def;
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
