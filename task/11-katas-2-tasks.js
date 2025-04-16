'use strict';

const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
};

function parseBankAccount(bankAccount) {
    const digits = [
        [' _ ', '| |', '|_|'], ['   ', '  |', '  |'],
        [' _ ', ' _|', '|_ '], [' _ ', ' _|', ' _|'],
        ['   ', '|_|', '  |'], [' _ ', '|_ ', ' _|'],
        [' _ ', '|_ ', '|_|'], [' _ ', '  |', '  |'],
        [' _ ', '|_|', '|_|'], [' _ ', '|_|', '  |']
    ];

    let account = '';
    for (let i = 0; i < 9; i++) {
        let part = bankAccount.slice(i * 3, (i + 1) * 3).split('\n');
        for (let j = 0; j < 10; j++) {
            if (part[0] === digits[j][0] && part[1] === digits[j][1] && part[2] === digits[j][2]) {
                account += j;
                break;
            }
        }
    }
    return parseInt(account, 10);
}

function* wrapText(text, columns) {
    let words = text.split(' ');
    let line = '';
    for (let word of words) {
        if (line.length + word.length + 1 > columns) {
            yield line;
            line = word;
        } else {
            line = line ? line + ' ' + word : word;
        }
    }
    if (line) yield line;
}

function getPokerHandRank(hand) {
    let suits = hand.map(card => card.slice(-1));
    let values = hand.map(card => card.slice(0, -1));

    let isFlush = new Set(suits).size === 1;
    let valueCounts = values.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
    let isStraight = Object.keys(valueCounts).length === 5 && Math.max(...values.map(v => '23456789TJQKA'.indexOf(v))) - Math.min(...values.map(v => '23456789TJQKA'.indexOf(v))) === 4;

    if (isFlush && isStraight) return PokerRank.StraightFlush;
    if (Object.values(valueCounts).includes(4)) return PokerRank.FourOfKind;
    if (Object.values(valueCounts).includes(3) && Object.values(valueCounts).includes(2)) return PokerRank.FullHouse;
    if (isFlush) return PokerRank.Flush;
    if (isStraight) return PokerRank.Straight;
    if (Object.values(valueCounts).includes(3)) return PokerRank.ThreeOfKind;
    if (Object.values(valueCounts).filter(count => count === 2).length === 2) return PokerRank.TwoPairs;
    if (Object.values(valueCounts).includes(2)) return PokerRank.OnePair;
    return PokerRank.HighCard;
}

function* getFigureRectangles(figure) {
    let rows = figure.split('\n').map(row => row.trim());
    let rectangles = [];
    let inRectangle = false;
    let startRow, startCol;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === '+') {
                if (!inRectangle) {
                    startRow = i;
                    startCol = j;
                    inRectangle = true;
                } else if (rows[i][j] === '+' && rows[i][j - 1] === '-') {
                    rectangles.push(rows.slice(startRow, i + 1).map(row => row.slice(startCol, j + 1)).join('\n'));
                    inRectangle = false;
                }
            }
        }
    }
    for (let rect of rectangles) {
        yield rect;
    }
}

module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};