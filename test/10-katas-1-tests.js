'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
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
    var sides = ['N', 'E', 'S', 'W'],  // use array of cardinal directions only!
        res = [];

    function getDoubleSide(side1, side2) {
        switch (side1) {
            case 'E':
                return 'SE';
            case 'W':
                return 'NW';
            default:
                return side1 + side2;
        }
    }

    for (var i = 0, currIndex, curr, next, newObj; i < 32; i++) {
        newObj = {};
        currIndex = Math.trunc(i / 8);
        curr = sides[currIndex];
        // prev = sides[curr > 0 ? curr - 1 : sides.length - 1];
        next = sides[currIndex < sides.length - 1 ? currIndex + 1 : 0];
        // console.log(curr,next);
        switch (i % 8) {
            case 0:
                newObj['abbreviation'] = curr;
                break;
            case 1:
                newObj['abbreviation'] = `${curr}b${next}`;
                break;
            case 2:
                newObj['abbreviation'] = `${curr}${getDoubleSide(curr, next)}`;
                break;
            case 3:
                newObj['abbreviation'] = `${getDoubleSide(curr, next)}b${curr}`;
                break;
            case 4:
                newObj['abbreviation'] = getDoubleSide(curr, next);
                break;
            case 5:
                newObj['abbreviation'] = `${getDoubleSide(curr, next)}b${next}`;
                break;
            case 6:
                newObj['abbreviation'] = `${next}${getDoubleSide(curr, next)}`;
                break;
            case 7:
                newObj['abbreviation'] = `${next}b${curr}`;
                break;
        }
        newObj['azimuth'] = 11.25 * i;
        res.push(newObj);
    }
    return res;
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
    var search = '',
        startIndex = -1, endIndex = -1, stack = [], tmpstr = [];
    startIndex = str.indexOf('{');
    function outerSplit (string, symbol) {
        var res = [], currStart = 0, stack = [];
        for (var i = 0; i < string.length; i++) {
            if (string.charAt(i) == '{') {
                stack.push(0);
            } else {
                if (string.charAt(i) == '}') {
                    stack.pop();
                } else {
                    if (string.charAt(i) == symbol && stack.length == 0) {
                        res.push(string.slice(currStart, i));
                        currStart = i + 1;
                    }
                }
            }
        }
        res.push(string.slice(currStart))
        return res;
    }
    if(startIndex != -1){
        for (endIndex = startIndex + 1; endIndex < str.length; endIndex++){
            if (str.charAt(endIndex) === '}') {
                if (stack.length === 0) {
                    break;
                } else {
                    stack.pop();
                }
            }
            if(str.charAt(endIndex) === '{') {
                stack.push(0);
            }
        }
        search = str.slice(startIndex, endIndex + 1);
    }
    if (search == '') {
        yield str;
    } else {
        // tmpstr = search.slice(1,-1).split(',');
        tmpstr = outerSplit(search.slice(1,-1), ',');
        for (var i = 0; i < tmpstr.length; i++) {
            yield * expandBraces(str.replace(search, tmpstr[i]));
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
    let res = new Array(n).fill().map(()=> new Array(n).fill());
    let i = 0, j = 0;
    let d = -1;
    let start = 0, end = n*n - 1;
    do {
        res[i][j] = start++;
        res[n - i - 1][n - j - 1] = end--;
        i += d;
        j -= d;
        if (i < 0){
            i++;
            d = -d;
        } else if (j < 0){
            j++;
            d = -d;
        }
    } while (start < end);
    if (start === end)
        res[i][j] = start;
    return res;
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
    return dominoes.map(x => x[0] + x[1]).reduce((prev, cur) => prev + cur) %2 != 0;
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
    for(var i = 0; i < nums.length; i++){
        var j = i;
        while(nums[j] - nums[j + 1] == -1) {
            j++;
        }
        if(j != i && j - i > 1) {
            nums.splice(i, j - i + 1, nums[i] + '-' + nums[j]);
        }
    }
    return nums.join();
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
