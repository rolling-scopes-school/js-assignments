'use strict';

function createCompassPoints() {
    const directions = ['N', 'NbE', 'NNE', 'NEbE', 'NE', 'NEbN', 'ENE', 'EbN', 'E', 'EbS', 'ESE', 'SEbE', 'SE', 'SEbS', 'SSE', 'SbE', 'S', 'SbW', 'SSW', 'SWbS', 'SW', 'SWbW', 'WSW', 'WbS', 'W', 'WbN', 'WNW', 'NbW', 'NW', 'NWbN', 'NNW'];
    const result = [];
    let azimuth = 0;
    for (let i = 0; i < directions.length; i++) {
        result.push({ abbreviation: directions[i], azimuth: azimuth });
        azimuth += 11.25;
    }
    return result;
}

function* expandBraces(str) {
    let regex = /{([^{}]+)}/g;
    while (regex.test(str)) {
        str = str.replace(regex, (_, content) => content.split(',').join(''));
        yield str;
    }
}

function getZigZagMatrix(n) {
    let matrix = Array(n).fill().map(() => Array(n));
    let val = 0;
    let row = 0;
    let col = 0;
    let direction = 1;
    while (val < n * n) {
        matrix[row][col] = val++;
        row -= direction;
        col += direction;
        if (row < 0 || row >= n || col < 0 || col >= n) {
            if (row < 0 || row >= n) {
                row += direction;
            } else {
                col -= direction;
            }
            direction *= -1;
        }
    }
    return matrix;
}

function canDominoesMakeRow(dominoes) {
    let values = {};
    for (let [a, b] of dominoes) {
        values[a] = (values[a] || 0) + 1;
        values[b] = (values[b] || 0) + 1;
    }
    return Object.values(values).every(val => val % 2 === 0);
}

function extractRanges(nums) {
    let result = [];
    let rangeStart = null;
    for (let i = 0; i < nums.length; i++) {
        if (rangeStart === null) {
            rangeStart = nums[i];
        }
        if (nums[i] + 1 !== nums[i + 1]) {
            if (rangeStart === nums[i]) {
                result.push(`${nums[i]}`);
            } else {
                result.push(`${rangeStart}-${nums[i]}`);
            }
            rangeStart = null;
        }
    }
    return result.join(',');
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};
