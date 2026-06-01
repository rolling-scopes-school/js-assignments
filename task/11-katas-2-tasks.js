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
	let result=0;
    let mas_dig=[' _ | ||_|','     |  |',' _  _||_ ',' _  _| _|','   |_|  |',' _ |_  _|',' _ |_ |_|',' _   |  |',' _ |_||_|',' _ |_| _|'];
	for (let i=1;i<bankAccount.length/9;i++) {
		let str=bankAccount.substr((i-1)*3,3)+bankAccount.substr((i-1)*3+bankAccount.length/3,3)+bankAccount.substr((i-1)*3+bankAccount.length/3*2,3);
		let index=mas_dig.indexOf(str);
		if (index>=0) result=result*10+index;
	}
	return result;
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
    if (text.length<=columns) {
		yield text;
		return;
	}
	let index=text.lastIndexOf(' ',columns);
	yield text.slice(0,index);
	yield* wrapText(text.slice(index+1),columns);
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
    // 1. Маппинг достоинств карт в числовые значения
    const rankValues = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };

    // 2. Парсим карты на достоинства и масти
    const ranks = [];
    const suits = [];

    for (let card of hand) {
        // Так как '10' состоит из 2-х символов, берем всё, кроме последнего символа масти
        const rankStr = card.slice(0, -1);
        const suitStr = card.slice(-1);

        ranks.push(rankValues[rankStr]);
        suits.push(suitStr);
    }

    // Сортируем достоинства по возрастанию
    ranks.sort((a, b) => a - b);

    // 3. Считаем частоту повторений достоинств карт (для пар, сетов, каре)
    const counts = {};
    for (let r of ranks) {
        counts[r] = (counts[r] || 0) + 1;
    }
    const frequencies = Object.values(counts).sort((a, b) => b - a);

    // 4. Проверяем флаги комбинаций
    // Флеш: все 5 карт одной масти
    const isFlush = suits.every(s => s === suits[0]);

    // Стрейт: проверяем классическую последовательность
    let isStraight = false;
    if (ranks[4] - ranks[0] === 4 && new Set(ranks).size === 5) {
        isStraight = true;
    }
    // Особый случай стрейта: колесо (A, 2, 3, 4, 5) -> в отсортированном виде: [2, 3, 4, 5, 14]
    if (ranks[0] === 2 && ranks[1] === 3 && ranks[2] === 4 && ranks[3] === 5 && ranks[4] === 14) {
        isStraight = true;
    }

    // 5. Вычисляем итоговый ранг на основе флагов и частот повторений
    if (isStraight && isFlush) return PokerRank.StraightFlush;
    if (frequencies[0] === 4) return PokerRank.FourOfKind;
    if (frequencies[0] === 3 && frequencies[1] === 2) return PokerRank.FullHouse;
    if (isFlush) return PokerRank.Flush;
    if (isStraight) return PokerRank.Straight;
    if (frequencies[0] === 3) return PokerRank.ThreeOfKind;
    if (frequencies[0] === 2 && frequencies[1] === 2) return PokerRank.TwoPairs;
    if (frequencies[0] === 2) return PokerRank.OnePair;

    return PokerRank.HighCard;
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
   let mas=figure.split('\n');
   let result=[],kol=0,find=0;
   for (let i=0;i<mas.length;i++) {
	   for (let i2=0;i2<mas[i].length;i2++) {
		   if (mas[i][i2]=='+'&&(mas[i][i2+1]=='-'||mas[i][i2+1]=='+')&&(mas[i+1][i2]=='|'||mas[i+1][i2]=='+')) {
			   let width=1,height=1;find=1;
			   while (1) {
				   if (mas[i][i2+width]!='+') width++;
				   else if (mas[i+1][i2+width]=='|'||mas[i+1][i2+width]=='+') break; else width++;
				   if (i2+width>mas[i].length) {find=0;break;}
			   }
			   while (find) {
				   if (mas[i+height][i2]!='+') height++;
				   else if (mas[i+height][i2+1]=='-'||mas[i+height][i2+1]=='+') break; else height++;
			   }
			   if (find) {
					result[kol]='+';
					for (let i3=1;i3<width;i3++) result[kol]+='-'; result[kol]+='+\n';
					for (let i3=1;i3<height;i3++) {
						result[kol]+='|';
						for (let i4=1;i4<width;i4++) result[kol]+=' ';
						result[kol]+='|\n';
					}
					result[kol]+='+'; for (let i3=1;i3<width;i3++) result[kol]+='-'; result[kol++]+='+\n';
			   }			   
		   }
	   }
   }
   for (let i=kol-1;i>=0;i--) yield result[i];   
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
