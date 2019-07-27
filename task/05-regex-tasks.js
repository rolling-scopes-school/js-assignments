'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions           *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the regexp that matches a GUID string representation
 * '{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}',
 * where X is hexadecimal digit (0,1,2...,9,A,a,B,b,C,c,D,d,F,f)
 *
 * See more details: https://en.wikipedia.org/wiki/Globally_unique_identifier
 *
 * Match :
 *   '{3F2504E0-4F89-41D3-9A0C-0305E82C3301}'
 *   '{21EC2020-3AEA-4069-A2DD-08002B30309D}'
 *   '{0c74f13f-fa83-4c48-9b33-68921dd72463}'
 *
 *  Do not match:
 *   '{D44EF4F4-280B47E5-91C7-261222A59621}'
 *   '{D1A5279D-B27D-4CD4-A05E-EFDH53D08E8D}'
 *   '{5EDEB36C-9006-467A8D04-AFB6F62CD7D2}'
 *   '677E2553DD4D43B09DA77414DB1EB8EA'
 *   '0c74f13f-fa83-4c48-9b33-68921dd72463'
 *   'The roof, the roof, the roof is on fire'
 *
 * @return {RegExp}
 */
function getRegexForGuid() {
    return /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})[/{\1/}]/;
}


/**
 * Returns the regexp that matches all the strings from first column
 * but of them from the second
 *
 * Match :                 Do not match:
 * -----------             --------------
 *  'pit'                     ' pt'
 *  'spot'                    'Pot'
 *  'spate'                   'peat'
 *  'slap two'                'part'
 *  'respite'
 *
 * NOTE : the regex lenth should be < 13
 *
 * @return {RegExp}
 *
 */
function getRegexForPitSpot() {
    return /(?=.*p[a-z ]t)/;
}


/**
 * Returns the regexp that matches all IPv4 strings in
 * 'XX.XX.XX.XX' dotted format where XX is number 0 to 255
 *
 * Valid IPv4:                       Invalid IPv4
 * ---------------                  -----------------
 * '0.0.0.0'                         '300.0.0.0'
 * '127.0.0.1'                       '127.0.0.-1'
 * '10.10.1.1'                       '23.24.25.26.27'
 * '46.61.155.237'                   'Set dns to 8.8.8.8'
 * '010.234.015.001'
 *
 * @return {RegExp}
 */
function getRegexForIPv4() {
    return /^((\d|\d{2}|[01]\d{2}|2[0-4]\d|25[0-4]).(\d|\d{2}|[01]\d{2}|2[0-4]\d|25[0-4]).(\d|\d{2}|[01]\d{2}|2[0-4]\d|25[0-4]).(\d|\d{2}|[01]\d{2}|2[0-4]\d|25[0-4]))$/;
}


/**
 * Returns the regexp that matches all SSN (Social Security Number) codes in
 * 'XXX-XX-XXXX' format where X is digit, where each group can't be all zeros
 * https://en.wikipedia.org/wiki/Social_Security_number
 *
 * Valid SSN:                       Invalid SSN
 * ---------------                  -----------------
 * '123-45-6789'                     '123456789'
 * '234-56-2349'                     '000-56-2349'
 * '875-43-0298'                     '875-00-0298'
 * '034-01-0008'                     '034-01-0000'
 *                                   '0S4-H1-HACK'
 * @return {RegExp}
 */
function getRegexForSSN() {
    return /[0-9]{2}[1-9]-[0-9][1-9]-[0-9]{3}[1-9]/;
}


/**
 * Returns the password validator regex.
 * Regex will validate a password to make sure it meets the follwing criteria:
 *  - At least specified characters long (argument minLength)
 *  - Contains a lowercase letter
 *  - Contains an uppercase letter
 *  - Contains a number
 *  - Valid passwords will only be alphanumeric characters.
 *
 * @param {number} minLength
 * @return {Regex}
 *
 * @example
 *   let validator = getPasswordValidator(6);
 *   'password'.match(validator)  => false
 *   'Pa55Word'.match(validator)  => true
 *   'PASSw0rd'.match(validator)  => true
 *   'PASSW0RD'.match(validator)  => false
 *   'Pa55'.match(validator) => false
 */
function getPasswordValidator(minLength) {
    return new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ _!@#\$%\^&\*])(?=.{' + minLength + ',})');
}


module.exports = {
    getRegexForGuid: getRegexForGuid,
    getRegexForPitSpot: getRegexForPitSpot,
    getRegexForIPv4: getRegexForIPv4,
    getRegexForSSN: getRegexForSSN,
    getPasswordValidator: getPasswordValidator
};
