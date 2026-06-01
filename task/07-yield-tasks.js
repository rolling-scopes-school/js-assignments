'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
	let word1='bottles';
	let word2=word1;
    for (let i=99;i>0;i--) {
		if (i==2) word2='bottle';
		if (i==1) word1='bottle';
		yield i+' '+word1+' of beer on the wall, '+i+' '+word1+' of beer.';
		if (i>1) yield 'Take one down and pass it around, '+(i-1)+' '+word2+' of beer on the wall.';
	}
	yield 'Take one down and pass it around, no more bottles of beer on the wall.';
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    yield 0; yield 1;
	let prev1=0; let prev2=1; let current;
	while (1) {
		current=prev1+prev2;
		yield current;
		prev1=prev2;
		prev2=current;
	}
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
/**
 * Traverses a tree using the depth-first strategy
 *
 * @param {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 */
function* depthTraversalTree(root) {
    let stack=[root];
    while (stack.length>0) {
        let node=stack.pop();
        yield node;
		if (node.children)
            for (let i=node.children.length-1;i>=0;i--)
                stack.push(node.children[i]);
    }
}




/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
    let mas=[root];
	let index=0;
    while (index!=mas.length) {
        let node=mas[index++];
        yield node;
		if (node.children)
            for (let i=0;i<node.children.length;i++)
                mas[mas.length]=node.children[i];
    }
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @param {Iterable.<number>} source1
 * @param {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 */
function* mergeSortedSequences(source1, source2) {
    let getIterator=(source)=>{
        if (typeof source === 'function') {
            return source();
        }
        if (source && typeof source[Symbol.iterator] === 'function') {
            return source[Symbol.iterator]();
        }
        return source;
    };
	let mas1 = getIterator(source1);
    let mas2 = getIterator(source2);
    let cur1 = mas1.next();
    let cur2 = mas2.next();
    while (!cur1.done && !cur2.done) {
        if (cur1.value <= cur2.value) {
            yield cur1.value;
            cur1 = mas1.next();
        } else {
            yield cur2.value;
            cur2 = mas2.next();
        }
    }
    while (!cur1.done) {
        yield cur1.value;
        cur1 = mas1.next();
    }
    while (!cur2.done) {
        yield cur2.value;
        cur2 = mas2.next();
    }
}





module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};
