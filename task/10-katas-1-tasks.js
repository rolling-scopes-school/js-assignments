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
    //throw new Error('Not implemented');
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    let ret = new Array();
    let curSide, nextSide, midSide, abbreviation;
    for (let side = 0; side < sides.length; side++) {
        curSide = sides[side];
        nextSide = sides[(side + 1) % sides.length];
        midSide = (side % 2 == 0) ? curSide + nextSide : nextSide + curSide;
        for (let compassPoint = 0; compassPoint < 8; compassPoint++) {
            switch (compassPoint) {
                case 0:
                    abbreviation = curSide;
                    break;
                case 1:
                    abbreviation = curSide + 'b' + nextSide;
                    break;
                case 2:
                    abbreviation = curSide + midSide;
                    break;
                case 3:
                    abbreviation = midSide + 'b' + curSide;
                    break;
                case 4:
                    abbreviation = midSide;
                    break;
                case 5:
                    abbreviation = midSide + 'b' + nextSide;
                    break;
                case 6:
                    abbreviation = nextSide + midSide;
                    break;
                case 7:
                    abbreviation = nextSide + 'b' + curSide;
                    break;
                default:
                    break;
            }
            ret.push({ abbreviation: abbreviation, azimuth: (side * 8 + compassPoint) * 11.25 });
        }
    }
    return ret;
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
	let toExpand = [str];
    let appeared = new Array();
    let matched, replacementArr;
    while (toExpand.length > 0) {
        str = toExpand.pop();
        matched = str.match(/{([^{}]*)}/);
        if (matched != null) {
            replacementArr = matched[1].split(',');
            for (let replacement of replacementArr) {
                toExpand.push(str.replace(matched[0], replacement));
            }
        } else if (!appeared.includes(str)) {
            appeared.push(str);
            yield str;
        }
    }
    //throw new Error('Not implemented');
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
	let arr = [];
    for (let i = 0; i < n; i++)
        arr[i] = [];

    let i = 1, j = 1;
    for (let k = 0; k < n * n; k++) {
        arr[i - 1][j - 1] = k;
        if ((i + j) % 2 == 0) {
            // чётные диагонали
            if (j < n)
                j++;
            else
                i += 2;
            if (i > 1)
                i--;
        } else {
            // нечётные диагонали
            if (i < n)
                i++;
            else
                j += 2;
            if (j > 1)
                j--;
        }
    }
    return arr;
    //throw new Error('Not implemented');
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
	for (let i = 0; i < (dominoes.length - 1); i++) {
        if (dominoes[i][1] != dominoes[i + 1][0]) {

            //swap domino
            let temp = dominoes[i + 1][0];
            dominoes[i + 1][0] = dominoes[i + 1][1];
            dominoes[i + 1][1] = temp;

            if (dominoes[i][1] != dominoes[i + 1][0]) {

                //change domino
                var isFound = false
                for (let j = i + 2; ((j < dominoes.length) && (!isFound)); j++) {
                    if (dominoes[i][1] == dominoes[j][0]) {
                        isFound = true;
                        let tempDomino = dominoes[j];
                        dominoes[j] = dominoes[i + 1];
                        dominoes[i + 1] = tempDomino;
                    }
                    else if (dominoes[i][1] == dominoes[j][1]) {
                        isFound = true;

                        //swap temp domino
                        let tempNumb = dominoes[j][1];
                        dominoes[j][1] = dominoes[j][0];
                        dominoes[j][0] = tempNumb;

                        let tempDomino = dominoes[j];
                        dominoes[j] = dominoes[i + 1];
                        dominoes[i + 1] = tempDomino;
                    }
                }
                if (!isFound) {
                    return false;
                }
            }
        }
    }
    return true;
    //throw new Error('Not implemented');
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
	let min, max;
    let ret = Array();
    while (nums.length > 0) {
        min = nums.shift();
        max = min;
        while ((nums.length > 0) && (nums[0] - max == 1)) {
            max = nums.shift();
        }
        switch (max - min) {
            case 0:
                ret.push(min.toString());
                break
            case 1:
                ret.push(min.toString());
                ret.push(max.toString());
                break;
            default:
                ret.push(min + '-' + max);
                break;
        }
    }
    return ret.toString();
    //throw new Error('Not implemented');
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
