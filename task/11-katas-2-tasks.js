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
    let Arrtmp = bankAccount.split('\n');
    let accNum = 0;
    let numIfDig = 9;
    for (let i = 0; i < numIfDig; i++){
        let tmpd;
        let k = i*3;
        if (Arrtmp[2][k+2] === ' '){
            tmpd = 2;
        } else if (Arrtmp[1][k+2] === ' '){
            if (Arrtmp[2][k] === ' '){
                tmpd = 5;
            } else {
                tmpd = 6;
            }
        } else if (Arrtmp[2][k] === '|'){
            if (Arrtmp[1][k+1] === ' '){
                tmpd = 0;
            } else {
                tmpd = 8;
            }
        } else if (Arrtmp[0][k+1] === ' '){
            if (Arrtmp[1][k+1] === ' '){
                tmpd = 1;
            } else {
                tmpd = 4;
            }
        } else if (Arrtmp[1][k+1] === '_'){
            if (Arrtmp[1][k] === '|'){
                tmpd = 9;
            } else {
                tmpd = 3;
            }
        } else{
            tmpd = 7;
        }
        accNum += tmpd * Math.pow(10, numIfDig - i - 1);
    }
    return accNum;
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
    var words = text.split(' '), curr = '';
    for (var i = 0; i < words.length; i++) {
        if (curr.length + words[i].length <= columns) {
            curr += words[i] + " ";
        } else {
            yield curr.trim();
            curr = words[i] + " ";
        }
    }
    if (curr != '') {
        yield curr.trim();
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
            (numStr.indexOf('2') !== -1) && (numStr.indexOf('3') !== -1) ? PokerRank.FullHouse :
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
    const Arrtmp = figure.split('\n');
    const pluses = [];
    const horizontalLines = [];
    const rectangles = [];

    for (let i = 0; i < Arrtmp.length; i++)
        for (let j = 0; j < Arrtmp[0].length; j++)
            if (Arrtmp[i][j] === '+') {
                pluses.push({x: j, y: i});
            }

    for (let i = 0; i < pluses.length; i++)
        for (let j = i + 1; j < pluses.length; j++)
            if (pluses[i].y === pluses[j].y) {
                if (checkHorizontalLine(Arrtmp, pluses[i], pluses[j]))
                    horizontalLines.push([pluses[i], pluses[j]]);
            }

    for (let i = 0; i < horizontalLines.length; i++)
        for (let j = i + 1; j < horizontalLines.length; j++)
            if (checkRectangle(Arrtmp, horizontalLines[i], horizontalLines[j])) {
                rectangles.push([horizontalLines[i], horizontalLines[j]]);
            }

    for (let i = 0; i < rectangles.length; i++) {
        let rectangle = drawRectangle(rectangles[i]);

        yield rectangle;
    }
}

function checkHorizontalLine(Arrtmp, s, f) {
    for (let i = s.x; i <= f.y; i++)
        if (Arrtmp[s.y][i] !== '-' && Arrtmp[s.y][i] !== '+')
            return false;

    return true;
}

function checkRectangle(Arrtmp, top, bottom) {
    if (top[0].x !== bottom[0].x)
        return false;

    if (top[1].x !== bottom[1].x)
        return false;

    const leftX = top[0].x,
        rightX = top[1].x,
        topY = top[0].y,
        bottomY = bottom[0].y;

    for (let j = leftX + 1; j < rightX; j++)
        if (Arrtmp[topY][j] === '+' && Arrtmp[bottomY][j] === '+') {
            let hasWhiteSpace = false;

            for (let i = topY + 1; i < bottomY; i++)
                if (Arrtmp[i][j] === ' ')
                    hasWhiteSpace = true;


            if (!hasWhiteSpace)
                return false;
        }

    for (let i = topY + 1; i < bottomY; i++) {
        if (Arrtmp[i][leftX] !== '|' && Arrtmp[i][leftX] !== '+')
            return false;

        if (Arrtmp[i][rightX] !== '|' && Arrtmp[i][rightX] !== '+')
            return false;

        for (let j = leftX + 1; j < rightX; j++)
            if (Arrtmp[i][j] !== ' ')
                return false;
    }

    return true;
}

function drawRectangle(item) {
    let width = item[0][1].x - item[0][0].x + 1,
        height = item[1][0].y - item[0][0].y + 1,
        result = '',
        topLine = '+' + ('-').repeat(width - 2) + '+' + '\n';

    result += topLine;
    result += ( '|' + (' ').repeat(width - 2) + '|' + '\n' ).repeat(height - 2);
    result += topLine;

    return result;
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
