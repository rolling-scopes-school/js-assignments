'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String  *
 *                                                                                          *
 ********************************************************************************************/
function concatenateStrings(value1, value2) {
    return value1.concat(value2);
}

function getStringLength(value) {
    return value.length;
}

function getStringFromTemplate(firstName, lastName) {
    let message =  "Hello, " + firstName +
                    " " + lastName + "!";

    return message;
}

function extractNameFromTemplate(value) {
    return value.substring(7, value.length - 1);
}

function getFirstChar(value) {
    return value.charAt(0);
}

function removeLeadingAndTrailingWhitespaces(value) {
   return value.trim();
}

function repeatString(value, count) {
    return value.repeat(count);
}

function removeFirstOccurrences(str, value) {
    return str.replace(value, '');
}

function unbracketTag(str) {
    return str.substring(1, str.length - 1);
}

function convertToUpperCase(str) {
    return str.toUpperCase();
}

function extractEmails(str) {
    return str.split(";");
}

/**
 * Returns the string representation of rectangle with specified width and height
 * using pseudograhic chars
 *
 * @param {number} width
 * @param {number} height
 * @return {string}
 *
 * @example
 *
 *            '┌────┐\n'+
 *  (6,4) =>  '│    │\n'+
 *            '│    │\n'+
 *            '└────┘\n'
 *
 *  (2,2) =>  '┌┐\n'+
 *            '└┘\n'
 *
 *             '┌──────────┐\n'+
 *  (12,3) =>  '│          │\n'+
 *             '└──────────┘\n'
 *
 */
function getRectangleString(width, height) {
    throw new Error('Not implemented');
   }

function encodeToRot13(str) {
  return str.split('')
            .map(x => encodeToRot13.lookup[x] || x)
            .join('')
}

  encodeToRot13.input  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  encodeToRot13.output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'.split('')
  encodeToRot13.lookup = encodeToRot13.input.reduce((m,k,i) => 
                         Object.assign(m, {[k]: encodeToRot13.output[i]}), {})

function isString(value) {
     if(typeof value === 'string' 
        || value instanceof String) 
        return true;

 return false;
}

function getCardId(value) {
    let array = ['A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
                 'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
                 'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
                 'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'];

    return array.indexOf(value);

}


module.exports = {
    concatenateStrings: concatenateStrings,
    getStringLength: getStringLength,
    getStringFromTemplate: getStringFromTemplate,
    extractNameFromTemplate: extractNameFromTemplate,
    getFirstChar: getFirstChar,
    removeLeadingAndTrailingWhitespaces: removeLeadingAndTrailingWhitespaces,
    repeatString: repeatString,
    removeFirstOccurrences: removeFirstOccurrences,
    unbracketTag: unbracketTag,
    convertToUpperCase: convertToUpperCase,
    extractEmails: extractEmails,
    getRectangleString: getRectangleString,
    encodeToRot13: encodeToRot13,
    isString: isString,
    getCardId: getCardId
};
