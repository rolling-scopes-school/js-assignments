'use strict';

function* get99BottlesOfBeer() {
    let bottles = 99;
    while (bottles > 0) {
        yield `${bottles} bottle${bottles > 1 ? 's' : ''} of beer on the wall, ${bottles} bottle${bottles > 1 ? 's' : ''} of beer.`;
        bottles--;
        yield `Take one down and pass it around, ${bottles > 0 ? bottles : 'no more'} bottle${bottles !== 1 ? 's' : ''} of beer on the wall.`;
    }
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}

function* getFibonacciSequence() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function* depthTraversalTree(root) {
    if (!root) return;
    yield root;
    if (root.children) {
        for (const child of root.children) {
            yield* depthTraversalTree(child);
        }
    }
}

function* breadthTraversalTree(root) {
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        yield node;
        if (node.children) {
            queue.push(...node.children);
        }
    }
}

function* mergeSortedSequences(source1, source2) {
    const iterator1 = source1();
    const iterator2 = source2();
    let value1 = iterator1.next();
    let value2 = iterator2.next();

    while (!value1.done || !value2.done) {
        if (value1.done) {
            yield value2.value;
            value2 = iterator2.next();
        } else if (value2.done) {
            yield value1.value;
            value1 = iterator1.next();
        } else {
            if (value1.value < value2.value) {
                yield value1.value;
                value1 = iterator1.next();
            } else {
                yield value2.value;
                value2 = iterator2.next();
            }
        }
    }
}

module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};
