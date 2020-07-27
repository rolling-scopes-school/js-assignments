'use strict';

var assert = require('assert');
var tasks = require('../task/01-strings-tasks');
it.optional = require('../extensions/it-optional');

describe('01-strings-tasks', function() {

    it.optional('concatenateStrings should return concatenation of two strings', function() {
        assert.equal('aabb', tasks.concatenateStrings('aa','bb'));
        assert.equal('aa', tasks.concatenateStrings('aa',''));
        assert.equal('bb', tasks.concatenateStrings('','bb'));
    });

    it.optional('getStringLength should return the length of string', function() {
        assert.equal(5, tasks.getStringLength('aaaaa'), "'aaaaa' length should be 5");
        assert.equal(0, tasks.getStringLength(''), "'' length should be 0");
    });

    it.optional('getStringFromTemplate should create a string from template using given parameters', function() {
        assert.equal('Hello, John Doe!', tasks.getStringFromTemplate('John','Doe'));
        assert.equal('Hello, Chuck Norris!', tasks.getStringFromTemplate('Chuck','Norris'));
    });

    it.optional('getFirstChar should return the first char from given string', function() {
        assert.equal('J', tasks.getFirstChar('John Doe'));
        assert.equal('c', tasks.getFirstChar('cat'));
    });

    it.optional('extractNameFromTemplate should parse the name from given string', function() {
        assert.equal('John Doe', tasks.extractNameFromTemplate('Hello, John Doe!'));
        assert.equal('Chuck Norris', tasks.extractNameFromTemplate('Hello, Chuck Norris!'));
    });

    it.optional('removeLeadingAndTrailingWhitespaces should remove leading and trailing whitespaces from the string', function() {
        assert.equal('Abracadabra', tasks.removeLeadingAndTrailingWhitespaces('  Abracadabra'));
        assert.equal('cat', tasks.removeLeadingAndTrailingWhitespaces('cat'));
        assert.equal('Hello, World!', tasks.removeLeadingAndTrailingWhitespaces('\tHello, World! '));
    });

    it.optional('repeatString should repeat string specified number of times', function() {
        assert.equal('AAAAA', tasks.repeatString('A', 5));
        assert.equal('catcatcat', tasks.repeatString('cat', 3));
    });

    it.optional('removeFirstOccurrences should remove all specified values from a string', function() {
        assert.equal('To be or to be', tasks.removeFirstOccurrences('To be or not to be', ' not'));
        assert.equal('I like legs', tasks.removeFirstOccurrences('I like legends', 'end'));
        assert.equal('ABAB', tasks.removeFirstOccurrences('ABABAB','BA'));
    });

    it.optional('unbracketTag should remove first and last angle brackets from tag string', function() {
        assert.equal('div', tasks.unbracketTag('<div>'));
        assert.equal('span', tasks.unbracketTag('<span>'));
        assert.equal('a', tasks.unbracketTag('<a>'));
    });

    it.optional('convertToUpperCase should convert all chars from specified string into upper case', function() {
        assert.equal('THUNDERSTRUCK', tasks.convertToUpperCase('Thunderstruck'));
        assert.equal('ABCDEFGHIJKLMNOPQRSTUVWXYZ', tasks.convertToUpperCase('abcdefghijklmnopqrstuvwxyz'));
    });

    it.optional('extractEmails should extract emails from string list delimeted by semicolons', function() {
        assert.deepEqual(
            ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com'],
            tasks.extractEmails('angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com')
        );
        assert.deepEqual(
            ['info@gmail.com'],
            tasks.extractEmails('info@gmail.com')
        );
    });

    it.optional('getRectangleString should return the string reprentation of rectangle with specified size', function() {
        assert.equal(
           '┌────┐\n'+
           '│    │\n'+
           '│    │\n'+
           '└────┘\n',
            tasks.getRectangleString(6, 4)
        );
        assert.deepEqual(
           '┌┐\n'+
           '└┘\n',
            tasks.getRectangleString(2, 2)
        );
        assert.deepEqual(
           '┌──────────┐\n'+
           '│          │\n'+
           '└──────────┘\n',
            tasks.getRectangleString(12, 3)
        );
    });

    it.optional('encodeToRot13 should encode-decode string using ROT13 algorithm', function() {
        assert.equal('uryyb', tasks.encodeToRot13('hello'));
        assert.equal('Jul qvq gur puvpxra pebff gur ebnq?', tasks.encodeToRot13('Why did the chicken cross the road?'));
        assert.equal('To get to the other side!', tasks.encodeToRot13('Gb trg gb gur bgure fvqr!'));
        assert.equal(
            'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm',
            tasks.encodeToRot13('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
        );
    });

    it.optional('isString should return true if argument ia a string', function() {
        assert.equal(false, tasks.isString(), "undefined");
        assert.equal(false, tasks.isString(null), "null");
        assert.equal(false, tasks.isString([]), "[]");
        assert.equal(true, tasks.isString('test'), "test");
        assert.equal(true, tasks.isString(new String('test')), "new String('test')");
    });
    
    it.optional('getCardId should return the index of card in the initial deck', function() {
        [
             'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
             'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
             'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
             'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠' 
        ].forEach((val, index) => {
            assert.equal(
                index,
                tasks.getCardId(val),
                `Invalid id for card '${val}':`
            )
        });
       
    });
});
