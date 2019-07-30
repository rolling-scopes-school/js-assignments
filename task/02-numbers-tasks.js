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


/**
 * Returns an angle (in radians) between two vectors given by xi and yi, coordinates in Cartesian plane
 * See details https://en.wikipedia.org/wiki/Euclidean_vector#Representations
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {number}
 *
 * @example:
 *   (1,0) (0,1)     => π/2
 *   (0,1) (0,-1)    => π
 *   (0,-1) (1,0)    => π/2
 *   (0,1) (0,1)     => 0
 *   (0,1) (1,2)     => 0
 */
function getAngleBetweenVectors(x1, y1, x2, y2) {
    throw new Error('Not implemented');
}

function getLastDigit(value) {
    return value % 10;
}

function parseNumberFromString(value) {
    return  Number(value);
}

/**
 * Returns a diagonal length of the rectangular parallelepiped given by its sides a,b,c.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 *
 * @example:
 *   1,1,1   => 1.7320508075688772
 *   3,3,3   => 5.196152422706632
 *   1,2,3   => 3.741657386773941
 */
function getParallelipidedDiagonal(a,b,c) {
    throw new Error('Not implemented');
}

/**
 * Returns the number rounded to specified power of 10.
 *
 * @param {number} num
 * @param {number} pow
 * @return {number}
 *  
 * @example:
 *   1234, 0  => 1234
 *   1234, 1  => 1230
 *   1234, 2  => 1200
 *   1234, 3  => 1000
 *   1678, 0  => 1678
 *   1678, 1  => 1680
 *   1678, 2  => 1700
 *   1678, 3  => 2000
 */
function roundToPowerOfTen(num, pow) {
    throw new Error('Not implemented');
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
