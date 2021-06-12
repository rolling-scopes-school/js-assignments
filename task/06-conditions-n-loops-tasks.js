'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/



/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function getFizzBuzz(num) {
    if((num % 3 === 0) && (num % 5 === 0)) {
        return 'FizzBuzz'
    } else if(num % 5 === 0) {
        return'Buzz'
    } else if (num % 3 === 0) {
        return 'Fizz'
    }
    return num
}

function getFactorial(n) {
    if (n < 0)
        return -1;
    else if (n === 0)
        return 1;
    else {
        return (n * getFactorial(n - 1));
    }
}

function getSumBetweenNumbers(n1, n2) {
    let count = 0;
    for(let i = n1; i <=n2; i++ ) {
        count +=i
    }
    return count;
}

function doRectanglesOverlap(rect1, rect2) {
    return !(
        rect1.left + rect1.width < rect2.left ||
        rect2.left + rect2.width < rect1.left ||
        rect1.top + rect1.height < rect2.top ||
        rect2.top + rect2.height < rect1.top
    );
}

function findFirstSingleChar(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
            return str[i];
        }
    }

    return null;
}

function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    let res = "";
    res += (isStartIncluded && res.length === 0) ? "[" : "(";
    res += a <= b ? `${a}, ${b}` : `${b}, ${a}`;
    res += isEndIncluded ? "]" : ")";
    return res;
}



function isTriangle(a,b,c) {
    return a < b + c && b < a + c && c < a + b;
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of 
 *  {
 *     center: {
 *       x: 5,       
 *       y: 5
 *     },        
 *     radius: 20
 *  }
 * 
 * Point is object of 
 *  {
 *     x: 5,
 *     y: 5
 *  }
 * 
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *   
 */
function isInsideCircle(circle, point) {
    let dx = point.x - circle.center.x;
    let dy = point.y - circle.center.y;
    return (dx*dx + dy*dy) < (circle.radius * circle.radius);
}




/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    return [...str].reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    let str = '';
    str += num;
    return [...str].reverse().join('');
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
    return num.toString(n);
}

function isCreditCardNumber(ccn) {
    ccn = [...String(ccn)].reverse();
    ccn = ccn.reduce(function(sum, val, ind)
    {
        let dig = Number(val);
        if(ind % 2)
            dig *= 2;
        sum += Math.floor(dig / 10);
        sum += dig % 10;
        return sum;
    }, 0);
    return (ccn * 3) % 10 == 0;
}

function getDigitalRoot(num) {
    do{
        let sum = 0;
        while(num > 0){
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        num = sum;
    }while(num > 9);
    return num;
}

function isBracketsBalanced(str) {
    let pair = {
        '>': '<',
        ')': '(',
        ']': '[',
        '}': '{'
    }
    let res = [...str].reduce(function(acc, x, ind)
    {
        if (['(', '{', '[', '<'].indexOf(x) != -1)
            acc.push(x);
        else
        {
            if (acc.length > 0 && acc[acc.length - 1] == pair[x])
                acc.pop();
            else
                acc.push(x);
        }
        return acc;
    }, []);
    return res.length == 0;
}

function timespanToHumanString(startDate, endDate) {
    throw new Error('Not implemented');
}

function getCommonDirectoryPath(pathes) {
    throw new Error('Not implemented');
}

function getMatrixProduct(m1, m2) {
    throw new Error('Not implemented');
}

function evaluateTicTacToePosition(position) {
    throw new Error('Not implemented');
}

module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    ToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
