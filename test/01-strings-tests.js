'use strict';

var assert = require('assert');
var tasks = require('../task/01-strings-tasks');
var lint = require('mocha-eslint');
it.optional = require('../extensions/it-optional');

describe('01-strings-tasks', function() {

    it.optional('concatenateStrings should return concatenation of two strings', function() {
        assert.equal(tasks.concatenateStrings('aa','bb'),'aabb');
        assert.equal(tasks.concatenateStrings('aa',''),'aa');
        assert.equal(tasks.concatenateStrings('','bb'),'bb');
    });

    it.optional('getStringLength should return the length of string', function() {
        assert.equal(tasks.getStringLength('aaaaa'), 5, "'aaaaa' length should be 5");
        assert.equal(tasks.getStringLength(''), 0, "'' length should be 0");
    });

    it.optional('getStringFromTemplate should create a string from template using given parameters', function() {
        assert.equal(tasks.getStringFromTemplate('John','Doe'), 'Hello, John Doe!');
        assert.equal(tasks.getStringFromTemplate('Chuck','Norris'), 'Hello, Chuck Norris!');
    });

    it.optional('getFirstChar should return the first char from given string', function() {
        assert.equal(tasks.getFirstChar('John Doe'), 'J');
        assert.equal(tasks.getFirstChar('cat'), 'c');
    });

    it.optional('extractNameFromTemplate should parse the name from given string', function() {
        assert.equal(tasks.extractNameFromTemplate('Hello, John Doe!'), 'John Doe');
        assert.equal(tasks.extractNameFromTemplate('Hello, Chuck Norris!'), 'Chuck Norris');
    });

    it.optional('removeLeadingAndTrailingWhitespaces should remove leading and trailing whitespaces from the string', function() {
        assert.equal(tasks.removeLeadingAndTrailingWhitespaces('  Abracadabra'), 'Abracadabra');
        assert.equal(tasks.removeLeadingAndTrailingWhitespaces('cat'), 'cat');
        assert.equal(tasks.removeLeadingAndTrailingWhitespaces('\tHello, World! '), 'Hello, World!');
    });

    it.optional('repeatString should repeat string specified number of times', function() {
        assert.equal(tasks.repeatString('A', 5), 'AAAAA');
        assert.equal(tasks.repeatString('cat', 3), 'catcatcat');
    });

    it.optional('removeFirstOccurrences should remove all specified values from a string', function() {
        assert.equal(tasks.removeFirstOccurrences('To be or not to be', ' not'), 'To be or to be');
        assert.equal(tasks.removeFirstOccurrences('I like legends', 'end'), 'I like legs');
        assert.equal(tasks.removeFirstOccurrences('ABABAB','BA'), 'ABAB');
    });

    it.optional('unbracketTag should remove first and last angle brackets from tag string', function() {
        assert.equal(tasks.unbracketTag('<div>'), 'div');
        assert.equal(tasks.unbracketTag('<span>'), 'span');
        assert.equal(tasks.unbracketTag('<a>'), 'a');
    });

    it.optional('convertToUpperCase should convert all chars from specified string into upper case', function() {
        assert.equal(tasks.convertToUpperCase('Thunderstruck'), 'THUNDERSTRUCK');
        assert.equal(tasks.convertToUpperCase('abcdefghijklmnopqrstuvwxyz'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });

    it.optional('extractEmails should extract emails from string list delimeted by semicolons', function() {
        assert.deepEqual(
            tasks.extractEmails('angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com'),
            ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com']
        );
        assert.deepEqual(
            tasks.extractEmails('info@gmail.com'),
            ['info@gmail.com']
        );
    });

    it.optional('getRectangleString should return the string reprentation of rectangle with specified size', function() {
        assert.equal(
            tasks.getRectangleString(6, 4),
           '┌────┐\n'+
           '│    │\n'+
           '│    │\n'+
           '└────┘\n'            
        );
        assert.deepEqual(
            tasks.getRectangleString(2, 2),
           '┌┐\n'+
           '└┘\n'
        );
        assert.deepEqual(
            tasks.getRectangleString(12, 3),
           '┌──────────┐\n'+
           '│          │\n'+
           '└──────────┘\n'
        );
    });

    it.optional('encodeToRot13 should encode-decode string using ROT13 algorithm', function() {
        assert.equal(tasks.encodeToRot13('hello'), 'uryyb');
        assert.equal(tasks.encodeToRot13('Why did the chicken cross the road?'), 'Jul qvq gur puvpxra pebff gur ebnq?');
        assert.equal(tasks.encodeToRot13('Gb trg gb gur bgure fvqr!'), 'To get to the other side!');
        assert.equal(
            tasks.encodeToRot13('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
            'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
        );
    });

    it.optional('isString should return true if argument ia a string', function() {
        assert.equal(tasks.isString(), false, "undefined");
        assert.equal(tasks.isString(null), false, "null");
        assert.equal(tasks.isString([]), false, "[]");
        assert.equal(tasks.isString('test'), true, "test");
        assert.equal(tasks.isString(new String('test')), true, "new String('test')");
    });
    
    it.optional('getCardId should return the index of card in the initial deck', function() {
        [
             'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
             'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
             'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
             'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠' 
        ].forEach((val, index) => {
            assert.equal(
                tasks.getCardId(val),
                index,
                `Invalid id for card '${val}':`
            )
        });
       
    });

    var paths = [
        'task/01-strings-tasks.js'
    ];

    var options = {
        // Specify style of output
        formatter: 'compact',  // Defaults to `stylish`
        // Only display warnings if a test is failing
        alwaysWarn: false,  // Defaults to `true`, always show warnings
        // Increase the timeout of the test if linting takes to long
        timeout: 5000,  // Defaults to the global mocha `timeout` option
        // Increase the time until a test is marked as slow
        slow: 1000,  // Defaults to the global mocha `slow` option
        // Consider linting warnings as errors and return failure
        strict: true,  // Defaults to `false`, only notify the warnings
        contextName: 'eslint',  // Defaults to `eslint`, but can be any string
    };

    lint(paths, options);
});
