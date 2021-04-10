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
    const sides = ['N','E','S','W'];  // use array of cardinal directions only!
    let azimuth, result = [];
    const step = 11.25;

    for ( azimuth = 0; azimuth < 360; azimuth += step ) {
        let leftDirection = sides[ Math.floor( azimuth / 90 ) ],
          rightDirection = sides[ sides.indexOf( leftDirection ) + 1 ] || sides[ 0 ],
          semiDirection,
          abbreviation;

        // South and North is lead directions
        if ( sides.indexOf( leftDirection ) % 2 )
            semiDirection = rightDirection + leftDirection;
        else
            semiDirection = leftDirection + rightDirection;

        let localAzim = azimuth % 90;

        if ( localAzim >= 45 ) {
            localAzim = 90 - localAzim;

            const temp = leftDirection;
            leftDirection = rightDirection;
            rightDirection = temp;
        }

        switch ( localAzim / step ) {
            case 0:
                abbreviation = leftDirection;
                break;
            case 1:
                abbreviation = leftDirection + 'b' + rightDirection;
                break;
            case 2:
                abbreviation = leftDirection + semiDirection;
                break;
            case 3:
                abbreviation = semiDirection + 'b' + leftDirection;
                break;
            case 4:
                abbreviation = semiDirection;
                break;
        }

        result.push( {
            abbreviation,
            azimuth
        } );
    }

    return result;

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
    let stack = [ str ],
      generated = new Set();

    while ( stack.length ) {
        const currentStr = stack.pop(),
          firstCBIndex = currentStr.indexOf( '}' ),
          suitOBIndex = currentStr.slice( 0, firstCBIndex )
            .lastIndexOf( '{' );

        if ( firstCBIndex === -1 || suitOBIndex === -1 ) {
            if ( !generated.has( currentStr ) ) {
                generated.add( currentStr );
                yield currentStr;
            }
            continue;
        }

        const expandedValues = currentStr.slice( suitOBIndex + 1, firstCBIndex )
            .split( ',' ),
          firstPart = currentStr.slice( 0, suitOBIndex ),
          lastPart = currentStr.slice( firstCBIndex + 1 );

        let i = expandedValues.length;
        while ( i-- ) {
            stack.push( firstPart + expandedValues[ i ] + lastPart );
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
    let res = new Array(n),
      stepX = -1,
      stepY = 1,
      currX = 0,
      currY = 0,
      count = 0;
    for (let i = 0; i < n; i++) {
        res[i] = (new Array(n)).fill(0);
    }
    while (count < n * n) {
        if (currX < 0 || currX >= n || currY < 0 || currY >= n) {
            currX += stepX;
            currY += stepY;
        } else {
            res[currX][currY] = count++;
            currX += stepX;
            currY += stepY;
            if (currX < 0 || currX >= n || currY < 0 || currY >= n) {
                currY += 1;
                stepX *= -1;
                stepY *= -1;
            }
        }
    }
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
    const dominoesByNum = dominoes.reduce(
      function ( result, el ) {
          const i = el[ 0 ],
            j = el[ 1 ];

          result[ i ].push( j );

          if ( i !== j ) result[ j ].push( i );

          return result;
      },
      Array.from( {
          length: 7
      }, () => [] ) );

    let i,
      withoutPair = 0;

    for ( i = 0; i < dominoesByNum.length; i++ ) {
        if ( !dominoesByNum[ i ].length ) continue;

        const excludeFish = dominoesByNum[ i ].filter( el => ( el !== i ) ),
          fishCount = dominoesByNum[ i ].length - excludeFish.length;

        if ( excludeFish.length > 0 )
            withoutPair += excludeFish.length % 2;
        else if ( fishCount > 0 )
            return dominoes.length === fishCount;

        if ( withoutPair > 2 ) return false;
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
    for(let i = 0; i < nums.length; i++){
        let j = i;
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
