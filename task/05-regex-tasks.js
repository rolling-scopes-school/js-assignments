'use strict';

function getRegexForGuid() {
    return /^\{[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}\}$/;
}

function getRegexForPitSpot() {
    return /p.t/;
}

function getRegexForIPv4() {
    const num = '(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)';
    return new RegExp(`^(${num}\\.){3}${num}$`);
}

function getRegexForSSN() {
    return /^(?!000)\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
}

function getPasswordValidator(minLength) {
    return new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{${minLength},}$`);
}

module.exports = {
    getRegexForGuid: getRegexForGuid,
    getRegexForPitSpot: getRegexForPitSpot,
    getRegexForIPv4: getRegexForIPv4,
    getRegexForSSN: getRegexForSSN,
    getPasswordValidator: getPasswordValidator
};
