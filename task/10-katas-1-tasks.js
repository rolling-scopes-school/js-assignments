'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 * npm test ./test/10-katas-1-tests.js 
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    let resArr = [], direction = "", degrees = 0;
    var sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!
    for (let i = 0; i < sides.length; i++) {
        let btwcardinal = (i == 0 || i == 2) ? (sides[i] + sides[i + 1])
            : (sides[i == 3 ? 0 : i + 1] + sides[i]);
        for (let count = 0; count < 8; count++) {
            switch (count) {
                case 0: direction = sides[i]; break;
                case 1: direction = sides[i] + 'b' + sides[i == 3 ? 0 : i + 1]; break;
                case 2: direction = sides[i] + btwcardinal; break;
                case 3: direction = btwcardinal + "b" + sides[i]; break;
                case 4: direction = btwcardinal; break;
                case 5: direction = btwcardinal + "b" + sides[i == 3 ? 0 : i + 1]; break;
                case 6: direction = sides[i == 3 ? 0 : i + 1] + btwcardinal; break;
                case 7: direction = sides[i == 3 ? 0 : i + 1] + "b" + sides[i]; break;
            }
            resArr.push({ abbreviation: direction, azimuth: degrees });
            degrees += 11.25;
        }
    }
    return resArr;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    const OPEN_BR = '{';
    const CLOSE_BR = '}';
    const SEPARATOR = ',';

    yield* parse(str);

    function parse(str) {
        let items = [''];
        let pos = 0;
        while (str[pos]) {
            if (str[pos] !== OPEN_BR) {
                items = combine(items, [readUntil([OPEN_BR])]);
            } 
            else 
            {
                pos += 1;
                items = combine(items, parseExpr());
            }
        }
        return items;

        function parseExpr() {
            let items = [];
            let sepCount = 0;
            while (str[pos] !== CLOSE_BR) 
            {
                if (str[pos] === SEPARATOR) 
                {
                    pos += 1;
                    sepCount += 1;
                } 
                else 
                {
                    items = items.concat(parseExprPart());
                }
            }
            if (items.length < sepCount + 1) items.push('');
            pos += 1;
            return items;
        }

        function parseExprPart() {
            let items = [''];
            while (str[pos] !== SEPARATOR && str[pos] !== CLOSE_BR) 
            {
                if (str[pos] !== OPEN_BR) 
                {
                    items = combine(items, [readUntil([SEPARATOR, OPEN_BR, CLOSE_BR])]);
                } else 
                {
                    pos += 1;
                    items = combine(items, parseExpr());
                }
            }
            return items;
        }

        function combine(leftItems, rightItems) {
            const res = [];
            for (let left of leftItems)
                for (let right of rightItems)
                    res.push(left + right);
            return res;
        }

        function readUntil(chars) {
            let res = '';
            while (str[pos] && chars.every(x => x !== str[pos])) {
                res += str[pos];
                pos += 1;
            }
            return res;
        }
    }
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let mtx = [];
    for (var i = 0; i < n; i++)
        mtx[i] = [];

    var i=1, j=1;
    for (var e = 0; e < n*n; e++) {
        mtx[i-1][j-1] = e;
        if ((i + j) % 2 == 0) {
            if (j < n) 
                j++;
            else
                i += 2;
            if (i > 1) 
                i--;
        } else {
            if (i < n) 
                i++;
            else
                j += 2;
            if (j > 1) 
                j--;
        }
    }
    return mtx;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let res = "" + dominoes.shift();
    let i = 0;
    while (dominoes.length != 0) {
        if (dominoes[i][0] == res[0]) {
            res = dominoes[i].reverse() + res;
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][1] == res[0]) {
            res = dominoes[i] + res;
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][0] == res[res.length - 1]) {
            res = res + dominoes[i];
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        if (dominoes[i][1] == res[res.length - 1]) {
            res = res + dominoes[i].reverse();
            dominoes.splice(i, 1);
            i = 0;
            continue;
        }
        i++;
        if (i == dominoes.length)
            return false;
    }
    return true;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let res = "";
    for (let j = 0; j < nums.length; j++) {
        let i = 0;
        if ((nums[j + 1] - nums[j] == 1) && (nums[j + 2] - nums[j] == 2)) {
            while (nums[j + 1] - nums[j] == 1) {
                i++;
                j++;
            }
            res += `${nums[j - i]}-${nums[j]},`;

        } else
            res += nums[j] + ",";
    }
    return res.slice(0, res.length - 1);
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
