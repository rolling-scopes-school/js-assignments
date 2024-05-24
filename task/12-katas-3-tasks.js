'use strict';

/** npm test ./test/12-katas-3-tests.js 
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    class RouteMap {
        constructor() {
            this._route = {};
            this._width = puzzle[0].length;
            this._height = puzzle.length;
        }

        _key(x, y) {
            return `${x},${y}`;
        }

        markAvailable(x, y) {
            this._route[this._key(x, y)] = false;
        }

        markVisited(x, y) {
            this._route[this._key(x, y)] = true;
        }

        isAvailable(x, y) {
            return x >= 0
                && x < this._width
                && y >= 0
                && y < this._height
                && !this._route[this._key(x, y)];
        }
    }

    function* getSiblings(x, y) {
        yield [x - 1, y];
        yield [x + 1, y];
        yield [x, y - 1];
        yield [x, y + 1];
    }

    function checkRoute(x, y, search, route) {
        if (!route.isAvailable(x, y) || puzzle[y][x] !== search[0]) {
            return false;
        }
        if (search.length === 1) {
            return true;
        }
        route.markVisited(x, y);
        const nextSearch = search.slice(1);

        for (let [sx, sy] of getSiblings(x, y)) {
            if (checkRoute(sx, sy, nextSearch, route)) {
                return true;
            }
        }

        route.markAvailable(x, y);
        return false;
    }

    for (let y = 0; y < puzzle.length; ++y) {
        for (let x = 0; x < puzzle[0].length; ++x) {
            if (checkRoute(x, y, searchStr, new RouteMap())) {
                return true;
            }
        }
    }
    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function Perm(str) {
    let ret = [];

    if (str.length == 1) return [str];
    if (str.length == 2) return str != str[1] + str[0] ? [str, str[1] + str[0]] : [str];

    str.split('').forEach(function (chr, idx, arr) {
        let sub = [...arr];
        sub.splice(idx, 1);
        Perm(sub.join('')).forEach(function (perm) {
            ret.push(chr + perm);
        });
    });

    return ret.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });
}
function* getPermutations(chars) {
    let ret = Perm(chars);
    for (let i = 0; i < ret.length; i++) {
        yield ret[i];
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    if (!quotes.length) return 0;
    let maxNum = Math.max.apply(null, quotes);
    let indMax = quotes.lastIndexOf(maxNum);
    return quotes.slice(0, indMax).reduce((prev, curr) => prev += maxNum - curr, 0) +
        getMostProfitFromStockQuotes(quotes.slice(indMax + 1));
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function (url) {
        var res = '';
        for (let i = 0; i * 2 < url.length; i++) {
            res += String.fromCodePoint(url.codePointAt(2 * i) * 256 + (url.codePointAt(2 * i + 1) || 0))
        }
        return res;
    },

    decode: function (code) {
        var res = '';
        for (let i = 0; i < code.length; i++) {
            let c = code.codePointAt(i);
            res += String.fromCodePoint(c / 256 | 0) + (c % 256 ? String.fromCodePoint(c % 256) : '');
        }
        return res;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
