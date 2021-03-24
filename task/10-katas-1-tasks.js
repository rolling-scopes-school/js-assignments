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
    function transform(arr, func) {
        let trn = arr.map(func);
        let ans = [];
        arr.forEach((e, i) => ans.push(e, trn[i]));
        return ans;
    }

    let sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!
    // get N, NE, E, ....
    sides = transform(sides, (e, i, arr) => {
        if (i % 2 === 0) return arr[i] + arr[i + 1];
        else return arr[(i + 1) % 4] + arr[i];
    });
    // get N, NNE, NE, ....
    sides = transform(sides, (e, i, arr) => {
        if (i % 2 === 0) return arr[i] + arr[i + 1];
        else return arr[(i + 1) % 8] + arr[i];
    });
    // get N, NbE, NNE, ...
    sides = transform(sides, (e, i, arr) => {
        if (i % 2 === 0) return arr[i] + 'b' + arr[(i + 4 - i % 4) % 16];
        else return arr[(i + 1) % 16] + 'b' + arr[i - i % 4];
    });
    const dAngle = 360 / sides.length;
    return sides.map((e, i) => ({'abbreviation': e, 'azimuth': i * dAngle}));
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
class Node {
    constructor(str) {
        this.str = str || '';
        this.children = [];
    }
}

function createDigraph(head, str) {
    let cur = head;
    let headStack = [], tailStack = [];
    for (let c of str) {
        if (c === '{') {
            let _head = new Node();
            let _tail = new Node();
            headStack.push(_head);
            tailStack.push(_tail);
            cur.children.push(_head);
            cur = _head;
        } else if (c === '}') {
            let _root = headStack.pop();
            let _tail = tailStack.pop();
            cur.children.push(_tail);
            cur = _tail;
        } else if (c === ',' && headStack.length) {
            let _root = headStack.slice(-1)[0];
            let _tail = tailStack.slice(-1)[0];
            cur.children.push(_tail);
            cur = _root;
        } else {
            let node = new Node(c);
            cur.children.push(node);
            cur = node;
        }
    }
}

function* expandBraces(str) {
    let head = new Node();
    createDigraph(head, str);

    let q = [head], ans = [];
    while (q.length) {
        let node = q.slice(-1)[0];
        if (node.used) {
            node.used = false;
            q.pop();
            ans.pop();
        } else {
            node.used = true;
            q.push(...node.children);
            ans.push(node.str);
            if (!node.children.length) {
                yield ans.join('');
            }
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
    let ans = Array.from({'length': n}, () => new Array(n));
    let v = 0;
    for (let i = 0; i < 2 * n - 1; i++)
        for (let j = 0; j < n; j++) {
            let y = (i % 2 === 0 ? j : n - 1 - j),
                x = i - y;
            if (x >= 0 && x < n) ans[x][y] = v++;
        }
    return ans;
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
 * @return {boolean}
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
    let adjMatrix = Array.from({length: 7}, () => new Array(7).fill(0));
    for (let e of dominoes) {
        adjMatrix[e[0]][e[1]]++;
        adjMatrix[e[1]][e[0]]++;
    }

    let degrees = adjMatrix.map(e => e.reduce((p, e) => p + e));
    let odds = degrees.reduce((p, e, i) => {
        if (e % 2) p.push(i);
        return p;
    }, []);
    if (odds.length > 2) return false;

    let start = (odds.length ? odds[0] : degrees.findIndex(e => e > 0));
    let stack = [start];
    while (stack.length) {
        let from = stack.slice(-1)[0];
        if (degrees[from] === 0) {
            stack.pop();
        } else {
            let to = adjMatrix[from].findIndex(e => e);
            adjMatrix[from][to]--;
            adjMatrix[to][from]--;
            degrees[from]--;
            degrees[to]--;
            stack.push(to);
        }
    }
    return degrees.reduce((p, e) => p + e) === 0;
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
 * @return {string}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    return nums.reduce((p, e, i) => {
        if (p.end === e - 1) p.end = e;
        if (p.end !== e || i === nums.length - 1) {
            p.str += (p.begin === p.end) ? `,${p.begin}` :
                (p.begin === p.end - 1) ? `,${p.begin},${p.end}` :
                    `,${p.begin}-${p.end}`;
            p.begin = p.end = e;
        }
        return p;
    }, {str: '', begin: NaN, end: NaN}).str.slice(9);
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
