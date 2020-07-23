"use strict";

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/

/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  Rectangle.prototype.getArea = function () {
    return this.width * this.height;
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
  return Object.setPrototypeOf(JSON.parse(json), proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function error(turn1, turn2, name1, name2) {
  if (turn1 > turn2) {
    throw new Error(
      "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element"
    );
  }
  if (
    (name1 === name2 && name1 === "element") ||
    name1 === "id" ||
    name1 === "pseudoElement"
  ) {
    throw new Error(
      "Element, id and pseudo-element should not occur more then one time inside the selector"
    );
  }
}

const cssSelectorBuilder = {
  value: "",

  element: function (value) {
    let turn = 1;
    let name = "element";
    error(this.turn, turn, this.name, name);
    let obj = Object.create(cssSelectorBuilder);
    obj.value = this.value + value;
    obj.turn = turn;
    obj.name = name;
    return obj;
  },

  id: function (value) {
    let turn = 2;
    let name = "id";
    error(this.turn, turn, this.name, name);
    let obj = Object.create(cssSelectorBuilder);
    obj.value = this.value + "#" + value;
    obj.turn = turn;
    obj.name = name;
    return obj;
  },

  class: function (value) {
    let turn = 3;
    error(this.turn, turn);
    let obj = Object.create(cssSelectorBuilder);
    obj.value = this.value + "." + value;
    obj.turn = turn;
    return obj;
  },

  attr: function (value) {
    let turn = 4;
    error(this.turn, turn);
    let obj = Object.create(cssSelectorBuilder);
    obj.value = this.value + "[" + value + "]";
    obj.turn = turn;
    return obj;
  },

  pseudoClass: function (value) {
    let turn = 5;
    error(this.turn, turn);
    let obj = Object.create(cssSelectorBuilder);
    obj.value = this.value + ":" + value;
    obj.turn = turn;
    return obj;
  },

  pseudoElement: function (value) {
    let turn = 6;
    let name = "pseudoElement";
    error(this.turn, turn, this.name, name);
    let obj = Object.create(cssSelectorBuilder);
    obj.value = this.value + "::" + value;
    obj.turn = turn;
    obj.name = name;
    return obj;
  },

  combine: function (selector1, combinator, selector2) {
    let obj = Object.create(cssSelectorBuilder);
    obj.value = selector1.value + " " + combinator + " " + selector2.value;
    return obj;
  },
  stringify: function () {
    return this.value;
  },
};

module.exports = {
  Rectangle: Rectangle,
  getJSON: getJSON,
  fromJSON: fromJSON,
  cssSelectorBuilder: cssSelectorBuilder,
};
