'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    function transform(str) {
        let ans = '';
        let lines = str.split('\n').slice(0, -1);
        for (let j = 0; j < lines[0].length; j++)
            for (let i = 0; i < lines.length; i++) {
                ans += lines[i][j];
            }
        return ans.match(/.{1,9}/g);
    }

    let digits = ' _     _  _     _  _  _  _  _ \n' +
        '| |  | _| _||_||_ |_   ||_||_|\n' +
        '|_|  ||_  _|  | _||_|  ||_| _|\n';
    let map = new Map(transform(digits).map((e, i) => [e, i]));
    return transform(bankAccount).reduce((p, e) => p * 10 + map.get(e), 0);
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let lines = text.match(new RegExp(`.{1,${columns}}( |$)`, 'g'));
    for (let line of lines) {
        yield line.trim();
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
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
}

function getPokerHandRank(hand) {
    const suites = '♥♠♦♣',
        numbers = 'A234567891JQK';
    let suitArr = Array.from(suites, () => 0),
        numArr = Array.from(numbers, () => 0);
    for (let card of hand) {
        suitArr[suites.indexOf(card.slice(-1))]++;
        numArr[numbers.indexOf(card[0])]++;
    }
    numArr.push(numArr[0]); // Ace card
    let suitStr = suitArr.join(''),
        numStr = numArr.join('');
    return (numStr.indexOf('11111') !== -1) &&
    (suitStr.indexOf('5') !== -1) ? PokerRank.StraightFlush :
        (numStr.indexOf('4') !== -1) ? PokerRank.FourOfKind :
            (numStr.indexOf('2') !== -1) &&
            (numStr.indexOf('3') !== -1) ? PokerRank.FullHouse :
                (suitStr.indexOf('5') !== -1) ? PokerRank.Flush :
                    (numStr.indexOf('11111') !== -1) ? PokerRank.Straight :
                        (numStr.indexOf('3') !== -1) ? PokerRank.ThreeOfKind :
                            (numStr.match(/2.*2.+/)) ? PokerRank.TwoPairs :
                                (numStr.indexOf('2') !== -1) ? PokerRank.OnePair :
                                    PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    const lines = figure.split('\n').slice(0, -1),
        dx = [0, 1, 0, -1, 0],
        dy = [1, 0, -1, 0, 1],
        reg = /[+|\-]/;

    function getRectangle(h, w) {
        const edgeLine = '+' + '-'.repeat(w - 2) + '+\n',
            midLine = '|' + ' '.repeat(w - 2) + '|\n';
        return edgeLine + midLine.repeat(h - 2) + edgeLine;
    }

    function getSizes(x0, y0) {
        let x = x0, y = y0, ind = -1;
        let w = 1, h = 1;
        while (1) {
            let _x = x + dx[ind + 1];
            let _y = y + dy[ind + 1];
            if (lines[_x] && lines[_x][_y] && lines[_x][_y].match(reg)) ind++;
            if (ind === -1 || ind === 4) return;
            x += dx[ind];
            y += dy[ind];
            h = Math.max(h, x + 1 - x0);
            w = Math.max(w, y + 1 - y0);
            if (x === x0 && y === y0) return {h, w};
            if (!lines[x] || !lines[x][y] || !lines[x][y].match(reg)) return;
        }
    }

    for (let x = 0; x < lines.length; x++)
        for (let y = 0; y < lines[0].length; y++) {
            if (lines[x][y] !== '+') continue;
            let sizes = getSizes(x, y);
            if (sizes) yield getRectangle(sizes.h, sizes.w);
        }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
