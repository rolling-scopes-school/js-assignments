'use strict';

var assert = require('assert');
var tasks = require('../task/02-numbers-tasks');
it.optional = require('../extensions/it-optional');

describe('02-numbers-tasks', function() {

    it.optional('getRectangleArea should return a square of rectangle', function() {
        assert.equal(50, tasks.getRectangleArea(5, 10));
        assert.equal(25, tasks.getRectangleArea(5, 5));
    });

    it.optional('getCicleCircumference should return a circumference of cicle', function() {
        assert.equal(31.41592653589793, tasks.getCicleCircumference(5));
        assert.equal(19.729201864543903, tasks.getCicleCircumference(3.14));
        assert.equal(0, tasks.getCicleCircumference(0));
    });

    it.optional('getAverage should return an average of two numbers', function() {
        assert.equal(5, tasks.getAverage(5, 5));
        assert.equal(5, tasks.getAverage(10, 0));
        assert.equal(0, tasks.getAverage(-3, 3));
        assert.equal(Number.MAX_VALUE-1, tasks.getAverage(Number.MAX_VALUE-2, Number.MAX_VALUE));
        assert.equal(Number.MAX_VALUE / 4, tasks.getAverage(Number.MAX_VALUE, -Number.MAX_VALUE / 2));
    });

    it.optional('getDistanceBetweenPoints should return a distance between points', function() {
        assert.equal(1, tasks.getDistanceBetweenPoints(0, 0, 0, 1));
        assert.equal(1, tasks.getDistanceBetweenPoints(0, 0, 1, 0));
        assert.equal(18.027756377319946, tasks.getDistanceBetweenPoints(-5, 0, 10, -10));
    });

    it.optional('getLinearEquationRoot should return a root of linear equation', function() {
        assert.equal(2, tasks.getLinearEquationRoot(5, -10));
        assert.equal(-8, tasks.getLinearEquationRoot(1, 8));
        assert.equal(0, tasks.getLinearEquationRoot(5, 0));
    });
    
    it.optional('getAngleBetweenVectors should return a angle (in radians) between two linear vectors', function() {
        assert.equal(Math.PI/2, tasks.getAngleBetweenVectors(1, 0, 0, 1));
        assert.equal(Math.PI, tasks.getAngleBetweenVectors(0, 1, 0, -1));
        assert.equal(Math.PI/2, tasks.getAngleBetweenVectors(0, -1, 1, 0));
        assert.equal(0, tasks.getAngleBetweenVectors(0, 1, 0, 1));
    });

    it.optional('getLastDigit should return a last digit of the number', function() {
        assert.equal(0, tasks.getLastDigit(100));
        assert.equal(7, tasks.getLastDigit(37));
        assert.equal(5, tasks.getLastDigit(5));
        assert.equal(0, tasks.getLastDigit(0));
    });

    it.optional('parseNumberFromString should return a number from the given string representation', function() {
        assert.equal(100, tasks.parseNumberFromString('100'));
        assert.equal(37, tasks.parseNumberFromString('37'));
        assert.equal(-525.5, tasks.parseNumberFromString('-525.5'));
    });

    it.optional('getParallelipidedDiagonal should return a diagonal length of the rectagular parallepiped', function() {
        assert.equal(Math.sqrt(3), tasks.getParallelipidedDiagonal(1,1,1));
        assert.equal(Math.sqrt(27), tasks.getParallelipidedDiagonal(3,3,3));
        //assert.equal(Math.sqrt(14), tasks.getParallelipidedDiagonal(1,2,3));
    });

    it.optional('roundToPowerOfTen should return an number rounded to specified power of 10', function() {
        assert.equal(1234, tasks.roundToPowerOfTen(1234,0));
        assert.equal(1230, tasks.roundToPowerOfTen(1234,1));
        assert.equal(1200, tasks.roundToPowerOfTen(1234,2));
        assert.equal(1000, tasks.roundToPowerOfTen(1234,3));
        
        assert.equal(9678, tasks.roundToPowerOfTen(9678,0));
        assert.equal(9680, tasks.roundToPowerOfTen(9678,1));
        assert.equal(9700, tasks.roundToPowerOfTen(9678,2));
        assert.equal(10000, tasks.roundToPowerOfTen(9678,3));
    });

    it.optional('isPrime should return true if specified number is prime', function() {
        assert.equal(true, tasks.isPrime(2), "2");
        assert.equal(true, tasks.isPrime(3), "3");
        assert.equal(false, tasks.isPrime(4), "4");
        assert.equal(true, tasks.isPrime(5), "5");
        assert.equal(false, tasks.isPrime(6), "6");
        assert.equal(true, tasks.isPrime(7), "7");
        assert.equal(false, tasks.isPrime(8), "8");
        assert.equal(false, tasks.isPrime(9), "9");
        assert.equal(false, tasks.isPrime(10), "10");
        assert.equal(true, tasks.isPrime(11), "11");
        assert.equal(false, tasks.isPrime(12), "12");
        assert.equal(true, tasks.isPrime(13), "13");
        assert.equal(true, tasks.isPrime(113), "113");
        assert.equal(false, tasks.isPrime(119), "119");
    });

    it.optional('toNumber should convert any value to number or return the default', function() {
        assert.equal(0, tasks.toNumber(null, 0));
        assert.equal(0, tasks.toNumber('test', 0));
        assert.equal(1, tasks.toNumber('1', 0));
        assert.equal(42, tasks.toNumber(42, 0));
        assert.equal(42, tasks.toNumber(new Number(42), 0));
        assert.equal(-1, tasks.toNumber(undefined, -1));
    });
});
