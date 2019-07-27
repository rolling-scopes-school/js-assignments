'use strict';

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
}
Rectangle.prototype.getArea = function () {
    return this.width * this.height;
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
const DEFAULT = 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
const MORE_THAN_ONCE = 'Element, id and pseudo-element should not occur more then one time inside the selector';

class BaseSelector {
    constructor(value) { this.value = value; }
    element() { throw new Error(DEFAULT); }
    id() { throw new Error(DEFAULT); }
    class() { throw new Error(DEFAULT); }
    attr() { throw new Error(DEFAULT); }
    pseudoClass() { throw new Error(DEFAULT); }
    pseudoElement() { throw new Error(DEFAULT); }
    combine() { throw new Error(DEFAULT); }
    stringify() { return this.value; }
}
class PseudoElementSelector extends BaseSelector {
    pseudoElement() {
        throw new Error(MORE_THAN_ONCE);
    }
}
class PseudoClassSelector extends BaseSelector {
    pseudoClass(value) {
        return new PseudoClassSelector(this.value + ':' + value);
    }
    pseudoElement(value) {
        return new PseudoElementSelector(this.value + '::' + value);
    }
}
class AttrSelector extends PseudoClassSelector {
    attr(value) {
        return new AttrSelector(this.value + '[' + value + ']');
    }
}
class ClassSelector extends AttrSelector {
    class(value) {
        return new ClassSelector(this.value + '.' + value);
    }
}
class IdSelector extends ClassSelector {
    id() {
        throw new Error(MORE_THAN_ONCE);
    }
}
class ElementSelector extends ClassSelector {
    element() {
        throw new Error(MORE_THAN_ONCE);
    }
    id(value) {
        return new IdSelector(this.value + '#' + value);
    }
}
class CombinationSelector extends BaseSelector {
    constructor(selector1, combinator, selector2) {
        super(selector1.stringify() + ' ' + combinator + ' ' + selector2.stringify());
    }
}
const cssSelectorBuilder = {
    element: value => new ElementSelector(value),
    id: value => new IdSelector('#' + value),
    class: value => new ClassSelector('.' + value),
    attr: value => new AttrSelector('[' + value + ']'),
    pseudoClass: value => new PseudoClassSelector(':' + value),
    pseudoElement: value => new PseudoElementSelector('::' + value),
    combine: (selector1, combinator, selector2) => new CombinationSelector(selector1, combinator, selector2),
};

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
