'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


function parseDataFromRfc2822(value) {
    return new Date(value);
}

function parseDataFromIso8601(value) {
    return new Date(value);
}

function isLeapYear(date) {
    const year = date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function timeSpanToString(startDate, endDate) {
    const diff = endDate - startDate;
    const ms = diff % 1000;
    const sec = Math.floor(diff / 1000) % 60;
    const min = Math.floor(diff / (1000 * 60)) % 60;
    const hrs = Math.floor(diff / (1000 * 60 * 60));

    const pad = (num, len = 2) => num.toString().padStart(len, '0');
    return `${pad(hrs)}:${pad(min)}:${pad(sec)}.${pad(ms, 3)}`;
}

function angleBetweenClockHands(date) {
    const utcHours = date.getUTCHours() % 12;
    const utcMinutes = date.getUTCMinutes();

    const minuteAngle = 6 * utcMinutes;
    const hourAngle = 0.5 * (60 * utcHours + utcMinutes);
    let angle = Math.abs(hourAngle - minuteAngle);
    if (angle > 180) angle = 360 - angle;

    return (angle * Math.PI) / 180;
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
