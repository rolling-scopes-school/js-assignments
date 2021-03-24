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
let id = {
    element: 0,
    id: 1,
    class: 2,
    attr: 3,
    pseudoClass: 4,
    pseudoElement: 5
}

class Selector {
    constructor(selector) {
        this.selector = selector;
        this.counter = {
            element: 0,
            id: 0,
            pseudoElement: 0
        }
        this.prev_id = -1;
        this.cur_id = -1;
    }

    check() {
        if (this.counter.element === 2 ||
            this.counter.id === 2 ||
            this.counter.pseudoElement === 2) {
            throw new Error('Element, id and pseudo-element should not occur ' +
                'more then one time inside the selector');
        }
        if (this.cur_id < this.prev_id) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this.prev_id = this.cur_id;
    }

    element(value) {
        this.cur_id = id.element;
        this.counter.element++;
        this.check();
        this.selector += value;
        return this;
    }

    id(value) {
        this.cur_id = id.id;
        this.counter.id++;
        this.check();
        this.selector += '#' + value;
        return this;
    }

    class(value) {
        this.cur_id = id.class;
        this.check();
        this.selector += '.' + value;
        return this;
    }

    attr(value) {
        this.cur_id = id.attr;
        this.check();
        this.selector += '[' + value + ']';
        return this;
    }

    pseudoClass(value) {
        this.cur_id = id.pseudoClass;
        this.check();
        this.selector += ':' + value;
        return this;
    }

    pseudoElement(value) {
        this.cur_id = id.pseudoElement;
        this.counter.pseudoElement++;
        this.check();
        this.selector += '::' + value;
        return this;
    }

    combine(selector1, combinator, selector2) {
        return new Selector(selector1.selector + ' ' + combinator + ' ' + selector2);
    }

    stringify() {
        return this.selector;
    }
}

const cssSelectorBuilder = {

    element: function(value) {
        let obj = new Selector('');
        return obj.element(value);
    },

    id: function(value) {
        let obj = new Selector('');
        return obj.id(value);
    },

    class: function(value) {
        let obj = new Selector('');
        return obj.class(value);
    },

    attr: function(value) {
        let obj = new Selector('');
        return obj.attr(value);
    },

    pseudoClass: function(value) {
        let obj = new Selector('');
        return obj.pseudoClass(value);
    },

    pseudoElement: function(value) {
        let obj = new Selector('');
        return obj.pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return new Selector(
            selector1.stringify() +
            ' ' + combinator + ' ' +
            selector2.stringify()
        );
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
