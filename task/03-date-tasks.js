'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
   return new Date(value)
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
   return new Date(value)
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
   return Boolean(new Date(date.getFullYear(), 1, 29).getDate() === 29);
}

/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
   var timespan = Math.abs(endDate - startDate)
   let hh = Math.floor(MsConverter.ToHours(timespan))
   timespan -= MsConverter.fromHours(hh)
   let mm = Math.floor(MsConverter.ToMinutes(timespan))
   timespan -= MsConverter.fromMinutes(mm)
   let ss = Math.floor(MsConverter.ToSeconds(timespan))
   timespan -= MsConverter.fromSeconds(ss)
   return `${hh.padLeading(2)}:${mm.padLeading(2)}:${ss.padLeading(2)}.${timespan.roundingClipToString(3)}`
}

Number.prototype.roundingClipToString = function(pow) {
   return (Math.round(this * Math.pow(10, pow)) / Math.pow(10, pow)).padTrailing(pow)
}

Number.prototype.padLeading = function(size) {
   var s = String(this)
   while (s.length < (size || 2)) {s = "0" + s}
   return s
}

Number.prototype.padTrailing = function(size) {
   var s = String(this)
   while (s.length < (size || 2)) {s = s + "0"}
   return s
}

/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
   let hours = date.getUTCHours() % 12;
   let minutes = date.getUTCMinutes();
   let angle = Math.abs(0.5 * (60 * hours - 11 * minutes)) / 180 * Math.PI;

   return angle > Math.PI ? angle - Math.PI : angle;
}

module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};

class MsConverter {

	static ToSeconds(ms) {
		return (ms / 1000)
   }

	static ToMinutes(ms) {
		return (this.ToSeconds(ms) / 60)
	}

	static ToHours(ms) {
		return (this.ToMinutes(ms) / 60)
	}

	static ToDays(ms) {
		return (this.ToHours(ms) / 24)
	}

	static ToYearPercentage(ms, isLeap) {
		if (isLeap) {
			return (this.ToDays(ms) / 3.65)
		} else {
			return (this.ToDays(ms) / 3.66)
		}
	}

	static ToDayPercentage(ms) {
		return ((1 - this.ToDays(ms)) * 100);
   }
   
   static fromSeconds(s) {
      return s * 1000
   }   
   
   static fromMinutes(m) {
      return this.fromSeconds(m * 60)
   }

   static fromHours(h) {
      return this.fromMinutes(h * 60)
   }
   
   static fromDays(d) {
      return this.fromHours(d * 24)
   }

   static fromYearPercentage(percentage, isLeap) {
      if (isLeap) {
         return this.fromDays(percentage * 3.65)
		} else {
         return this.fromDays(percentage * 3.66)
		}
   }

   static fromDayPercentage(percentage) {
      return this.fromDays(percentage / 100)
   }
}