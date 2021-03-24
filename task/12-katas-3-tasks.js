'use strict';

/**
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
    function dfs(x, y, l) { //Depth first search
        if (puzzle[x][y] !== searchStr[l]) return false;
        if (l === searchStr.length - 1) return true;
        used[x][y] = true;
        for (let i = 0; i < 4; i++) {
            let _x = x + dx[i],
                _y = y + dy[i];
            if (!used[_x] || used[_x][_y]) continue;
            if (dfs(_x, _y, l + 1)) return true;
        }
        return used[x][y] = false; //false
    }

    let n = puzzle.length,
        m = puzzle[0].length;
    // out of recursion
    let used = Array.from({length: n}, () => new Array(m).fill(false));
    const dx = [-1, 1, 0, 0],
        dy = [0, 0, -1, 1];
    for (let x = 0; x < n; x++)
        for (let y = 0; y < m; y++) {
            if (dfs(x, y, 0)) return true;
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
function* getPermutations(chars) {
    let arr = chars.split(''),
        l = arr.length;
    let swapElement = (a, b) => {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    };
    arr.sort();
    while (1) {
        yield arr.join('');
        let aInd = l - 2;
        for (; aInd >= 0 && arr[aInd] > arr[aInd + 1]; aInd--) {
        }
        if (aInd === -1) return;
        let bInd = l - 1;
        for (; arr[bInd] < arr[aInd]; bInd--) {
        }
        swapElement(aInd, bInd);
        let l2 = (l - aInd) >> 1;
        for (let i = 1; i <= l2; i++) {
            swapElement(aInd + i, l - i);
        }
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
    let max = +quotes.slice(-1);
    return quotes.reverse().reduce((p, e) => {
        max = Math.max(max, e);
        return p + max - e;
    }, 0);
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
        let ans = '';
        let l = url.length;
        for (let i = 1; i < l; i += 2) {
            ans += String.fromCharCode(
                url.charCodeAt(i - 1) + (url.charCodeAt(i) << 8)
            );
        }
        return (l % 2 ? ans + url[l - 1] : ans);
    },

    decode: function (code) {
        let ans = '';
        for (let i = 0; i < code.length; i++) {
            ans += String.fromCharCode(
                code.charCodeAt(i) & 0xff,
                code.charCodeAt(i) >> 8
            );
        }
        return (ans.slice(-1) === String.fromCharCode(0) ? ans.slice(0, -1) : ans);
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
