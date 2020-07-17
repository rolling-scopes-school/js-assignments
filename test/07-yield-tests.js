'use strict';

var assert = require('assert');
var tasks = require('../task/07-yield-tasks');
it.optional = require('../extensions/it-optional');

describe('07-yield-tasks', function() {

    it.optional('get99BottlesOfBeer should return the sequence of song lyric lines', () => {

        var expected = [
            '99 bottles of beer on the wall, 99 bottles of beer.',
            'Take one down and pass it around, 98 bottles of beer on the wall.',
            '98 bottles of beer on the wall, 98 bottles of beer.',
            'Take one down and pass it around, 97 bottles of beer on the wall.',
            '97 bottles of beer on the wall, 97 bottles of beer.',
            'Take one down and pass it around, 96 bottles of beer on the wall.',
            '96 bottles of beer on the wall, 96 bottles of beer.',
            'Take one down and pass it around, 95 bottles of beer on the wall.',
            '95 bottles of beer on the wall, 95 bottles of beer.',
            'Take one down and pass it around, 94 bottles of beer on the wall.',
            '94 bottles of beer on the wall, 94 bottles of beer.',
            'Take one down and pass it around, 93 bottles of beer on the wall.',
            '93 bottles of beer on the wall, 93 bottles of beer.',
            'Take one down and pass it around, 92 bottles of beer on the wall.',
            '92 bottles of beer on the wall, 92 bottles of beer.',
            'Take one down and pass it around, 91 bottles of beer on the wall.',
            '91 bottles of beer on the wall, 91 bottles of beer.',
            'Take one down and pass it around, 90 bottles of beer on the wall.',
            '90 bottles of beer on the wall, 90 bottles of beer.',
            'Take one down and pass it around, 89 bottles of beer on the wall.',
            '89 bottles of beer on the wall, 89 bottles of beer.',
            'Take one down and pass it around, 88 bottles of beer on the wall.',
            '88 bottles of beer on the wall, 88 bottles of beer.',
            'Take one down and pass it around, 87 bottles of beer on the wall.',
            '87 bottles of beer on the wall, 87 bottles of beer.',
            'Take one down and pass it around, 86 bottles of beer on the wall.',
            '86 bottles of beer on the wall, 86 bottles of beer.',
            'Take one down and pass it around, 85 bottles of beer on the wall.',
            '85 bottles of beer on the wall, 85 bottles of beer.',
            'Take one down and pass it around, 84 bottles of beer on the wall.',
            '84 bottles of beer on the wall, 84 bottles of beer.',
            'Take one down and pass it around, 83 bottles of beer on the wall.',
            '83 bottles of beer on the wall, 83 bottles of beer.',
            'Take one down and pass it around, 82 bottles of beer on the wall.',
            '82 bottles of beer on the wall, 82 bottles of beer.',
            'Take one down and pass it around, 81 bottles of beer on the wall.',
            '81 bottles of beer on the wall, 81 bottles of beer.',
            'Take one down and pass it around, 80 bottles of beer on the wall.',
            '80 bottles of beer on the wall, 80 bottles of beer.',
            'Take one down and pass it around, 79 bottles of beer on the wall.',
            '79 bottles of beer on the wall, 79 bottles of beer.',
            'Take one down and pass it around, 78 bottles of beer on the wall.',
            '78 bottles of beer on the wall, 78 bottles of beer.',
            'Take one down and pass it around, 77 bottles of beer on the wall.',
            '77 bottles of beer on the wall, 77 bottles of beer.',
            'Take one down and pass it around, 76 bottles of beer on the wall.',
            '76 bottles of beer on the wall, 76 bottles of beer.',
            'Take one down and pass it around, 75 bottles of beer on the wall.',
            '75 bottles of beer on the wall, 75 bottles of beer.',
            'Take one down and pass it around, 74 bottles of beer on the wall.',
            '74 bottles of beer on the wall, 74 bottles of beer.',
            'Take one down and pass it around, 73 bottles of beer on the wall.',
            '73 bottles of beer on the wall, 73 bottles of beer.',
            'Take one down and pass it around, 72 bottles of beer on the wall.',
            '72 bottles of beer on the wall, 72 bottles of beer.',
            'Take one down and pass it around, 71 bottles of beer on the wall.',
            '71 bottles of beer on the wall, 71 bottles of beer.',
            'Take one down and pass it around, 70 bottles of beer on the wall.',
            '70 bottles of beer on the wall, 70 bottles of beer.',
            'Take one down and pass it around, 69 bottles of beer on the wall.',
            '69 bottles of beer on the wall, 69 bottles of beer.',
            'Take one down and pass it around, 68 bottles of beer on the wall.',
            '68 bottles of beer on the wall, 68 bottles of beer.',
            'Take one down and pass it around, 67 bottles of beer on the wall.',
            '67 bottles of beer on the wall, 67 bottles of beer.',
            'Take one down and pass it around, 66 bottles of beer on the wall.',
            '66 bottles of beer on the wall, 66 bottles of beer.',
            'Take one down and pass it around, 65 bottles of beer on the wall.',
            '65 bottles of beer on the wall, 65 bottles of beer.',
            'Take one down and pass it around, 64 bottles of beer on the wall.',
            '64 bottles of beer on the wall, 64 bottles of beer.',
            'Take one down and pass it around, 63 bottles of beer on the wall.',
            '63 bottles of beer on the wall, 63 bottles of beer.',
            'Take one down and pass it around, 62 bottles of beer on the wall.',
            '62 bottles of beer on the wall, 62 bottles of beer.',
            'Take one down and pass it around, 61 bottles of beer on the wall.',
            '61 bottles of beer on the wall, 61 bottles of beer.',
            'Take one down and pass it around, 60 bottles of beer on the wall.',
            '60 bottles of beer on the wall, 60 bottles of beer.',
            'Take one down and pass it around, 59 bottles of beer on the wall.',
            '59 bottles of beer on the wall, 59 bottles of beer.',
            'Take one down and pass it around, 58 bottles of beer on the wall.',
            '58 bottles of beer on the wall, 58 bottles of beer.',
            'Take one down and pass it around, 57 bottles of beer on the wall.',
            '57 bottles of beer on the wall, 57 bottles of beer.',
            'Take one down and pass it around, 56 bottles of beer on the wall.',
            '56 bottles of beer on the wall, 56 bottles of beer.',
            'Take one down and pass it around, 55 bottles of beer on the wall.',
            '55 bottles of beer on the wall, 55 bottles of beer.',
            'Take one down and pass it around, 54 bottles of beer on the wall.',
            '54 bottles of beer on the wall, 54 bottles of beer.',
            'Take one down and pass it around, 53 bottles of beer on the wall.',
            '53 bottles of beer on the wall, 53 bottles of beer.',
            'Take one down and pass it around, 52 bottles of beer on the wall.',
            '52 bottles of beer on the wall, 52 bottles of beer.',
            'Take one down and pass it around, 51 bottles of beer on the wall.',
            '51 bottles of beer on the wall, 51 bottles of beer.',
            'Take one down and pass it around, 50 bottles of beer on the wall.',
            '50 bottles of beer on the wall, 50 bottles of beer.',
            'Take one down and pass it around, 49 bottles of beer on the wall.',
            '49 bottles of beer on the wall, 49 bottles of beer.',
            'Take one down and pass it around, 48 bottles of beer on the wall.',
            '48 bottles of beer on the wall, 48 bottles of beer.',
            'Take one down and pass it around, 47 bottles of beer on the wall.',
            '47 bottles of beer on the wall, 47 bottles of beer.',
            'Take one down and pass it around, 46 bottles of beer on the wall.',
            '46 bottles of beer on the wall, 46 bottles of beer.',
            'Take one down and pass it around, 45 bottles of beer on the wall.',
            '45 bottles of beer on the wall, 45 bottles of beer.',
            'Take one down and pass it around, 44 bottles of beer on the wall.',
            '44 bottles of beer on the wall, 44 bottles of beer.',
            'Take one down and pass it around, 43 bottles of beer on the wall.',
            '43 bottles of beer on the wall, 43 bottles of beer.',
            'Take one down and pass it around, 42 bottles of beer on the wall.',
            '42 bottles of beer on the wall, 42 bottles of beer.',
            'Take one down and pass it around, 41 bottles of beer on the wall.',
            '41 bottles of beer on the wall, 41 bottles of beer.',
            'Take one down and pass it around, 40 bottles of beer on the wall.',
            '40 bottles of beer on the wall, 40 bottles of beer.',
            'Take one down and pass it around, 39 bottles of beer on the wall.',
            '39 bottles of beer on the wall, 39 bottles of beer.',
            'Take one down and pass it around, 38 bottles of beer on the wall.',
            '38 bottles of beer on the wall, 38 bottles of beer.',
            'Take one down and pass it around, 37 bottles of beer on the wall.',
            '37 bottles of beer on the wall, 37 bottles of beer.',
            'Take one down and pass it around, 36 bottles of beer on the wall.',
            '36 bottles of beer on the wall, 36 bottles of beer.',
            'Take one down and pass it around, 35 bottles of beer on the wall.',
            '35 bottles of beer on the wall, 35 bottles of beer.',
            'Take one down and pass it around, 34 bottles of beer on the wall.',
            '34 bottles of beer on the wall, 34 bottles of beer.',
            'Take one down and pass it around, 33 bottles of beer on the wall.',
            '33 bottles of beer on the wall, 33 bottles of beer.',
            'Take one down and pass it around, 32 bottles of beer on the wall.',
            '32 bottles of beer on the wall, 32 bottles of beer.',
            'Take one down and pass it around, 31 bottles of beer on the wall.',
            '31 bottles of beer on the wall, 31 bottles of beer.',
            'Take one down and pass it around, 30 bottles of beer on the wall.',
            '30 bottles of beer on the wall, 30 bottles of beer.',
            'Take one down and pass it around, 29 bottles of beer on the wall.',
            '29 bottles of beer on the wall, 29 bottles of beer.',
            'Take one down and pass it around, 28 bottles of beer on the wall.',
            '28 bottles of beer on the wall, 28 bottles of beer.',
            'Take one down and pass it around, 27 bottles of beer on the wall.',
            '27 bottles of beer on the wall, 27 bottles of beer.',
            'Take one down and pass it around, 26 bottles of beer on the wall.',
            '26 bottles of beer on the wall, 26 bottles of beer.',
            'Take one down and pass it around, 25 bottles of beer on the wall.',
            '25 bottles of beer on the wall, 25 bottles of beer.',
            'Take one down and pass it around, 24 bottles of beer on the wall.',
            '24 bottles of beer on the wall, 24 bottles of beer.',
            'Take one down and pass it around, 23 bottles of beer on the wall.',
            '23 bottles of beer on the wall, 23 bottles of beer.',
            'Take one down and pass it around, 22 bottles of beer on the wall.',
            '22 bottles of beer on the wall, 22 bottles of beer.',
            'Take one down and pass it around, 21 bottles of beer on the wall.',
            '21 bottles of beer on the wall, 21 bottles of beer.',
            'Take one down and pass it around, 20 bottles of beer on the wall.',
            '20 bottles of beer on the wall, 20 bottles of beer.',
            'Take one down and pass it around, 19 bottles of beer on the wall.',
            '19 bottles of beer on the wall, 19 bottles of beer.',
            'Take one down and pass it around, 18 bottles of beer on the wall.',
            '18 bottles of beer on the wall, 18 bottles of beer.',
            'Take one down and pass it around, 17 bottles of beer on the wall.',
            '17 bottles of beer on the wall, 17 bottles of beer.',
            'Take one down and pass it around, 16 bottles of beer on the wall.',
            '16 bottles of beer on the wall, 16 bottles of beer.',
            'Take one down and pass it around, 15 bottles of beer on the wall.',
            '15 bottles of beer on the wall, 15 bottles of beer.',
            'Take one down and pass it around, 14 bottles of beer on the wall.',
            '14 bottles of beer on the wall, 14 bottles of beer.',
            'Take one down and pass it around, 13 bottles of beer on the wall.',
            '13 bottles of beer on the wall, 13 bottles of beer.',
            'Take one down and pass it around, 12 bottles of beer on the wall.',
            '12 bottles of beer on the wall, 12 bottles of beer.',
            'Take one down and pass it around, 11 bottles of beer on the wall.',
            '11 bottles of beer on the wall, 11 bottles of beer.',
            'Take one down and pass it around, 10 bottles of beer on the wall.',
            '10 bottles of beer on the wall, 10 bottles of beer.',
            'Take one down and pass it around, 9 bottles of beer on the wall.',
            '9 bottles of beer on the wall, 9 bottles of beer.',
            'Take one down and pass it around, 8 bottles of beer on the wall.',
            '8 bottles of beer on the wall, 8 bottles of beer.',
            'Take one down and pass it around, 7 bottles of beer on the wall.',
            '7 bottles of beer on the wall, 7 bottles of beer.',
            'Take one down and pass it around, 6 bottles of beer on the wall.',
            '6 bottles of beer on the wall, 6 bottles of beer.',
            'Take one down and pass it around, 5 bottles of beer on the wall.',
            '5 bottles of beer on the wall, 5 bottles of beer.',
            'Take one down and pass it around, 4 bottles of beer on the wall.',
            '4 bottles of beer on the wall, 4 bottles of beer.',
            'Take one down and pass it around, 3 bottles of beer on the wall.',
            '3 bottles of beer on the wall, 3 bottles of beer.',
            'Take one down and pass it around, 2 bottles of beer on the wall.',
            '2 bottles of beer on the wall, 2 bottles of beer.',
            'Take one down and pass it around, 1 bottle of beer on the wall.',
            '1 bottle of beer on the wall, 1 bottle of beer.',
            'Take one down and pass it around, no more bottles of beer on the wall.',
            'No more bottles of beer on the wall, no more bottles of beer.',
            'Go to the store and buy some more, 99 bottles of beer on the wall.'
        ];

        var lineNo = 0;
        for(let line of tasks.get99BottlesOfBeer()) {
            assert.equal(
                line,
                expected[lineNo++],
                `Text mismatch at line no ${lineNo}: `
            );
        }

        assert.equal(
            expected.length,
            lineNo,
            'Lines count is incorrect:'
        );
    });


    it.optional('getFibonacciSequence should return the Fibonacci sequence', () => {

        var expected = [
            0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181,
            6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269,
            2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169
        ];

        var index = 0;
        for(let num of tasks.getFibonacciSequence()) {
            assert.equal(
                num,
                expected[index++],
                `Sequence mismatch at index no ${index}: `
            );
            if (index>=expected.length) break;
        }
        if (index<expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);

    });


    it.optional('depthTraversalTree should return the sequence of tree nodes in depth-first order', () => {

      /*
       *     source tree (root = 1):
       *
       *            1
       *          / | \
       *         2  6  7
       *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
       *       3   4     8
       *           |
       *           5
       */

        var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 }, node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
        node1.children = [ node2, node6, node7 ];
        node2.children = [ node3, node4 ];
        node4.children = [ node5 ];
        node7.children = [ node8 ];
        var expected = [ node1, node2, node3, node4, node5, node6, node7, node8 ];
        var index = 0;
        for(let num of tasks.depthTraversalTree(node1)) {
            if (index>=expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);
            assert.equal(
                num.n,
                expected[index++].n,
                `Sequence mismatch at index no ${index}: `
            );
        }
        if (index<expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);
    });

    const MAX_NODE_COUNT = 100000;

    function createDeepTree() {
        var root = { n: MAX_NODE_COUNT };
        for(var i=MAX_NODE_COUNT-1; i>0; i--) {
            root = { n : i, children : [ root ] };
        }
        return root;
    }

    function createWideTree() {
        var root = { n: 1, children: [] };
        for(var i=2; i<=MAX_NODE_COUNT; i++) {
            root.children.push({ n: i });
        }
        return root;
    }

    it.optional('depthTraversalTree should process a deep tree', () => {
        var root = createDeepTree();
        var index = 1;
        for(let node of tasks.depthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });

    it.optional('depthTraversalTree should process a wide tree', () => {
        this.timeout(30000);
        var root = createWideTree();
        var index = 1;
        for(let node of tasks.depthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });


    it.optional('breadthTraversalTree should return the sequence of tree nodes in depth-first order', () => {

      /*
       *     source tree (root = 1):
       *
       *            1
       *          / | \
       *         2  3  4
       *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
       *       5   6     7
       *           |
       *           8
       */

        var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 }, node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
        node1.children = [ node2, node3, node4 ];
        node2.children = [ node5, node6 ];
        node4.children = [ node7 ];
        node6.children = [ node8 ];
        var expected = [ node1, node2, node3, node4, node5, node6, node7, node8 ];
        var index = 0;
        for(let num of tasks.breadthTraversalTree(node1)) {
            if (index>=expected.length) assert.fail(null,null,`sequence length should be equal to ${expected.length}`);
            assert.equal(
                num.n,
                expected[index++].n,
                `Sequence mismatch at index no ${index}: `
            );
        }
        if (index<expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);
    });


    it.optional('breadthTraversalTree should process a deep tree', () => {
        var root = createDeepTree();
        var index = 1;
        for(let node of tasks.breadthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });

    it.optional('breadthTraversalTree should process a wide tree', () => {
        var root = createWideTree();
        var index = 1;
        for(let node of tasks.breadthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });


    it.optional('mergeSortedSequences should merge two sorted sequences into one sorted sequence', () => {
        const ITEMS_COUNT = 500;
        
        var odds = function* () {
               for(var i=1; true; i+=2) yield i;
            };
        var evens = function* () {
               for(var i=2; true; i+=2) yield i;
            };
        var expected = 1;
        var count = 0;
        for(let value of tasks.mergeSortedSequences(odds, evens)) {
            assert.equal(
                value,
                expected++
            );
            count++;
            if (count==ITEMS_COUNT) break;
        }
        assert.equal(count, ITEMS_COUNT);

        var zero = function* () { yield 0; }
        expected = 0;
        count = 0;
        for(let value of tasks.mergeSortedSequences(zero, evens)) {
            assert.equal(
                value,
                expected
            );
            expected +=2;
            count++;
            if (count == ITEMS_COUNT) break;
        }
        assert.equal(count, ITEMS_COUNT);
        

        var minus1 = function* () { yield -1; }
        expected = -1;
        count = 0;
        for(let value of tasks.mergeSortedSequences(odds, minus1)) {
            assert.equal(
                value,
                expected
            );
            expected +=2;
            count++;
            if (count == ITEMS_COUNT) break;
        }
        assert.equal(count, ITEMS_COUNT);

    });

    it.optional('async should resolve Promises and take values step by step', () => {
        return new Promise((resolve, reject)=> {
            tasks.async(function*() {
                let a = yield new Promise((resolve)=> setTimeout(()=>resolve(5), 100)),
                    b = yield Promise.resolve(6);
                assert.equal(a, 5);
                assert.equal(b, 6);

                return yield new Promise((resolve)=> resolve(a + b));
            }).then(value=> {
                try {
                    assert.equal(value, 11);
                    resolve()
                } catch (err) {
                    reject(err);
                }
            }, (err)=> {
                reject(err);
            });
        });
    });

    it.optional('async should resolve Promises and take values step by step', () => {
        return new Promise((resolve, reject)=> {
            tasks.async(function*() {
                let a = yield new Promise((resolve)=> setTimeout(()=>resolve(5), 100)),
                    b = yield Promise.resolve(6),
                    c = yield Promise.resolve(6);
                assert.equal(a, 5);
                assert.equal(b, 6);
                assert.equal(c, 6);
                return yield new Promise((resolve)=> resolve(a + b + c));
            }).then(value=> {
                try {
                    assert.equal(value, 17);
                    resolve()
                } catch (err) {
                    reject(err);
                }
            }, (err)=> {
                reject(err);
            });
        });
    });

    it.optional('async should handle exception during generator work', () => {
        return new Promise((resolve, reject)=> {
            tasks.async(function*() {
                yield new Promise(()=> {throw new Error("test error");});
            }).then(()=> {
                reject();
            }, (err)=> {
                if (err.message === 'test error') resolve();
                else reject(err);
            });
        });
    });
});
