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
    var sides = ['N','E','S','W'];
var shiftsides = sides.map(function(e,i) { return sides[(i+1)%4] });
var i = 0, j = 0;
    var sides32 = new Array(32);

    while (j < 32){
        switch (true) {
            case j%8 == 0 : sides32[j] = sides[j/8]; break;
            case j%5%4 == 0 : sides32[j] = sides[(j-4)/8] + shiftsides[(j-4)/8]; break;
            default : sides32[j] = shiftsides[(j-4)/8] + sides[(j-4)/8];
        }
        j += 4;
    }

    for (i = 0; i < 32; i++){
        switch (true) {
            case i%4 == 0 : break;
            case i%8 == 1 : sides32[i] = sides[(i-1)/8] + 'b' + shiftsides[(i-1)/8]; break;
            case i%8 == 2 : sides32[i] = sides[(i-2)/8] + sides32[i+2]; break;
            case i%8 == 6 : sides32[i] = shiftsides[(i-6)/8] + sides32[i-2]; break;
            case i%8 == 3 : sides32[i] = sides32[i+1] + 'b' + sides[(i-3)/8]; break;
            case i%8 == 5 : sides32[i] = sides32[i-1] + 'b' + shiftsides[(i-5)/8]; break;
            case i%8 == 7 : sides32[i] = shiftsides[(i-7)/8] + 'b' + sides[(i-7)/8]; break;
        }
    }

   function adde(abb,az) {
    return [{abbreviation: abb, azimuth: parseFloat(az.toFixed(2))}]
     } 

    return sides32 = sides32.map(function(e,i) { return adde(e, i*11.25) }).reduceRight(function(p,c) { return c.concat(p) });
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
    throw new Error('Not implemented');
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
    var stek = [];
    var matrix = new Array(n);
    for (var i = 0; i < n; i++) { matrix[i] = new Array(n); }
    for (var i = 0; i < n*n; i++) { stek.push(n*n-i-1); }

    function odd(num) {
        for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++)  {
                if (num == i+j) { matrix[i][j] = stek.pop(); }
                }
        }
    }

        function even(num) {
        for (var j = 0; j < n; j++) {
                for (var i = 0; i < n; i++)  {
                if (num == i+j) { matrix[i][j] = stek.pop(); }
                } 
        }
    }

    for (var a = 0; a < 2*n-1; a++){
        if (stek.length == 0) { break; } else { if (a%2 == 0) { even(a); } else { odd(a); } }
    }
return matrix;

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

    var start = [1,2,3,4,5,6];
    var isDomino = true;
    if (dominoes.length == 2) { 
        if ((dominoes[0][0] == dominoes[1][0])||(dominoes[0][0] == dominoes[1][1])
            ||(dominoes[0][1] == dominoes[1][0])||(dominoes[0][0] == dominoes[1][1]))
            { return isDomino = true; }
    }
    var arr = dominoes.join().split(',').map(function(e){ return parseInt(e) });
    start = start.map(function (e,i) { return arr.filter(function (ee) { return ee == i }).length });

    var isOdd = start.filter(function (e){ return e%2 == 1 }).length;
    if ( isOdd > 2 ) { return isDomino = false; };

    dominoes.forEach(function(e){ var a = e[0]; var b = e[1]; 
        var zeronum1 = start.filter(function(e){ return e == 0; }).length;
        var startcopy = [].concat(start); startcopy[a]--; startcopy[b]--; 
        var zeronum2 = startcopy.filter(function(e){ return e == 0; }).length;
        if (zeronum1 != zeronum2) { return isDomino = false; };

    });

    return isDomino;

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
    if ((nums.length < 3) || (nums.length == 3)&&(nums[1]-nums[0] != 1)) return nums.join(',');
    var seq = [];
    var end = nums.pop();
    seq.push(end);
    var iscon = false;

while (nums.length > 0) {
var cur = nums.pop();
if (end-cur == 1 && nums.length != 0) { end = cur; iscon = true; seq.push('-');} else { 
    if (!iscon||nums.length == 0) { seq.push('-'); seq.push(cur) } else { seq.push(end); seq.push(cur) }; end = cur; iscon = false; }}
var ans = seq.reverse().join(',').replace(/(-,)(?!-)/g,'').replace(/(-,)/g,'-').replace(/[,-](?=-)/g,'');
return ans;

}


module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
