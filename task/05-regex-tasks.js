'use strict';

/********************************************************************************************
 *                                                                                          *
 * Пожалуйста, прочтите информацию по ссылке перед выполнением заданий:                            *
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions           *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Возвращает регулярное выражение, которое валидирует GUID строку, представленную в виде
 * '{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}',
 * гед X - шестнадцатеричное число (0,1,2...,9,A,a,B,b,C,c,D,d,F,f)
 *
 * Больше информации по ссылке: https://en.wikipedia.org/wiki/Globally_unique_identifier
 *
 *  Match :
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
   throw new Error('Not implemented');
}


/**
 * Вернуть регулярное выражение, которое считает валидными варианты
 * из колонки Match и невалидными - Do not match
 *
 * Match :                 Do not match:
 * -----------             --------------
 *  'pit'                     ' pt'
 *  'spot'                    'Pot'
 *  'spate'                   'peat'
 *  'slap two'                'part'
 *  'respite'
 *
 * NOTE : длина конечного регулярного выражения должна быть меньше 13 символов
 *
 * @return {RegExp}
 *
 */
function getRegexForPitSpot() {
   throw new Error('Not implemented');
}


/**
 * Вернуть регулярное выражение, которое валидирует IPv4 строку в формате
 * 'XX.XX.XX.XX', где XX - число от 0 до 255
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
   throw new Error('Not implemented');
}


/**
 * Вернуть регулярное выражение, которое валидирует все SSN (Social Security Number) коды в
 * 'XXX-XX-XXXX' формате, где X это цифра, из которой состоит группа  XXX
 * Каждая группа XXX не может состоять из все нулей.
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
   throw new Error('Not implemented');
}


/**
 * Возвращает регулярное выражение для проверки валидности пароля
 * Регулярное выражение проверит пароль по следующим критериям:
 *  - Длина пароля не меньше minLength (аргумент minLength)
 *  - Содержит строку в нижнем регистре
 *  - Содержит строку в верхнем регистре
 *  - Содержит число
 *  - Валидный пароль содержит только буквенно-цифровые символы.
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
   throw new Error('Not implemented');
}


module.exports = {
    getRegexForGuid: getRegexForGuid,
    getRegexForPitSpot: getRegexForPitSpot,
    getRegexForIPv4: getRegexForIPv4,
    getRegexForSSN: getRegexForSSN,
    getPasswordValidator: getPasswordValidator
};
