'use strict';

function getComposition(f, g) {
    return function(x) {
        return f(g(x));
    };
}

function getPowerFunction(exponent) {
    return function(x) {
        return Math.pow(x, exponent);
    };
}

function getPolynom(...coeffs) {
    if (coeffs.length === 0) return null;
    return function(x) {
        return coeffs.reduce((sum, coeff, index) => sum + coeff * Math.pow(x, coeffs.length - index - 1), 0);
    };
}

function memoize(func) {
    let cachedResult;
    let isCalculated = false;
    return function() {
        if (!isCalculated) {
            cachedResult = func();
            isCalculated = true;
        }
        return cachedResult;
    };
}

function retry(func, attempts) {
    return function() {
        let attempt = 0;
        let result;
        while (attempt < attempts) {
            try {
                result = func();
                break;
            } catch (e) {
                attempt++;
            }
        }
        return result;
    };
}

function logger(func, logFunc) {
    return function(...args) {
        logFunc(`${func.name}(${args.join(', ')}) starts`);
        const result = func(...args);
        logFunc(`${func.name}(${args.join(', ')}) ends`);
        return result;
    };
}

function partialUsingArguments(fn, ...partialArgs) {
    return function(...args) {
        return fn(...partialArgs, ...args);
    };
}

function getIdGeneratorFunction(startFrom) {
    let id = startFrom;
    return function() {
        return id++;
    };
}

module.exports = {
    getComposition: getComposition,
    getPowerFunction: getPowerFunction,
    getPolynom: getPolynom,
    memoize: memoize,
    retry: retry,
    logger: logger,
    partialUsingArguments: partialUsingArguments,
    getIdGeneratorFunction: getIdGeneratorFunction,
};
