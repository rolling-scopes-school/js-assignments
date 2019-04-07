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
    const graphicDigits = [
        [' _ ', '   ', ' _ ', ' _ ', '   ', ' _ ', ' _ ', ' _ ', ' _ ', ' _ '],
        ['| |', '  |', ' _|', ' _|', '|_|', '|_ ', '|_ ', '  |', '|_|', '|_|'],
        ['|_|', '  |', '|_ ', ' _|', '  |', ' _|', '|_|', '  |', '|_|', ' _|']
    ];

    let number = 0;
    for (let i = 0; i < bankAccount.length / 3 - 1; i += 3) {
        const digit = [bankAccount.slice(i, i + 3),
            bankAccount.slice(i + 3 * 9 + 1, i + 3 * 10 + 1),
            bankAccount.slice(i + 3 * 18 + 2, i + 3 * 19 + 2)];

        for (let j = 0; j < graphicDigits[0].length; j++) {
            if (graphicDigits[0][j] == digit[0] && graphicDigits[1][j] == digit[1] 
                    && graphicDigits[2][j] == digit[2]) {
                number = number * 10 + j;
                break;
            }
        }
    }

    return number;
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
    // check the initial length of the string (maybe string length is smaller than columns number)
    if (columns >= text.length) {
        yield text;
        text = '';
    }

    while (text.length) {
        let column = text.slice(0, columns + 1);
        let spaceIndex = column.lastIndexOf(' ');

        // if the string in the column doesn't has space
        if (spaceIndex == -1) {
            yield text.slice(0, columns + 1);
            text = text.slice(columns + 1);

        } else {
            yield text.slice(0, spaceIndex);
            text = text.slice(spaceIndex + 1);
        }
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
    /*
    StraightFlush =  [
                        [ '4♥','5♥','6♥','7♥','8♥' ],
                        [ 'A♠','4♠','3♠','5♠','2♠' ]
                    ];
    FourOfKind = [ '4♣','4♦','4♥','4♠','10♥' ];
    FullHouse = [ '4♣','4♦','5♦','5♠','5♥' ];
    Flush = [ '4♣','5♣','6♣','7♣','Q♣' ];
    Straight =  [
                    [ '2♠','3♥','4♥','5♥','6♥' ],
                    [ '2♥','4♦','5♥','A♦','3♠' ]
                ];
    ThreeOfKind = [ '2♥','2♠','2♦','7♥','A♥' ];
    TwoPairs = [ '2♥','4♦','4♥','A♦','A♠' ];
    OnePair = [ '3♥','4♥','10♥','3♦','A♠' ];
    HighCard = [ 'A♥','K♥','Q♥','2♦','3♠' ];

    if (hand[0] == StraightFlush[0][0] && hand[1] == StraightFlush[0][1] && 
        hand[2] == StraightFlush[0][2] && hand[3] == StraightFlush[0][3] && 
        hand[4] == StraightFlush[0][4])
        return PokerRank.StraightFlush;
    
    if (hand[0] == StraightFlush[1][0] && hand[1] == StraightFlush[1][1] && 
        hand[2] == StraightFlush[1][2] && hand[3] == StraightFlush[1][3] && 
        hand[4] == StraightFlush[1][4])
        return PokerRank.StraightFlush;

    if (hand[0] == Straight[0][0] && hand[1] == Straight[0][1] && 
        hand[2] == Straight[0][2] && hand[3] == Straight[0][3] && 
        hand[4] == Straight[0][4])
        return PokerRank.Straight;   

    if (hand[0] == Straight[1][0] && hand[1] == Straight[1][1] && 
        hand[2] == Straight[1][2] && hand[3] == Straight[1][3] && 
        hand[4] == Straight[1][4])
        return PokerRank.Straight;

    if (hand[0] == FourOfKind[0] && hand[1] == FourOfKind[1] && 
        hand[2] == FourOfKind[2] && hand[3] == FourOfKind[3] && 
        hand[4] == FourOfKind[4])
        return PokerRank.FourOfKind;    

    if (hand[0] == FullHouse[0] && hand[1] == FullHouse[1] && 
        hand[2] == FullHouse[2] && hand[3] == FullHouse[3] && 
        hand[4] == FullHouse[4])
        return PokerRank.FullHouse;

    if (hand[0] == Flush[0] && hand[1] == Flush[1] && 
        hand[2] == Flush[2] && hand[3] == Flush[3] && 
        hand[4] == Flush[4])
        return PokerRank.Flush;

    if (hand[0] == ThreeOfKind[0] && hand[1] == ThreeOfKind[1] && 
        hand[2] == ThreeOfKind[2] && hand[3] == ThreeOfKind[3] && 
        hand[4] == ThreeOfKind[4])
        return PokerRank.ThreeOfKind;
           
    if (hand[0] == TwoPairs[0] && hand[1] == TwoPairs[1] && 
        hand[2] == TwoPairs[2] && hand[3] == TwoPairs[3] && 
        hand[4] == TwoPairs[4])
        return PokerRank.TwoPairs;  
        
    if (hand[0] == OnePair[0] && hand[1] == OnePair[1] && 
        hand[2] == OnePair[2] && hand[3] == OnePair[3] && 
        hand[4] == OnePair[4])
        return PokerRank.OnePair;  
     
    if (hand[0] == HighCard[0] && hand[1] == HighCard[1] && 
        hand[2] == HighCard[2] && hand[3] == HighCard[3] && 
        hand[4] == HighCard[4])
    return PokerRank.HighCard;  
    */
   throw new Error('Not implemented');    
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
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
