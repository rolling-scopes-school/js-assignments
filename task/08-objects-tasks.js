'use strict';

const { json } = require("mathjs");

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
};

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

const cssSelectorBuilder = {

    element: function (value) {
        if (this.elValue) {
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector',
            );
        }
        if (this.idValue) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
            );
        }
        const copy = { ...this };

        if (!copy.elValue) copy.elValue = value;
        else copy.elValue += value;

        return copy;
    },

    id: function (value) {
        if (this.idValue) {
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector',
            );
        }
        if (this.classValue || this.pEValue) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
            );
        }
        const copy = { ...this };

        if (!copy.idValue) copy.idValue = `#${value}`;
        else copy.idValue += `#${value}`;

        return copy;
    },

    class: function (value) {
        if (this.attrValue) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
            );
        }
        const copy = { ...this };

        if (!copy.classValue) copy.classValue = `.${value}`;
        else copy.classValue += `.${value}`;

        return copy;
    },

    attr: function (value) {
        if (this.pCValue) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
            );
        }
        const copy = { ...this };

        if (!copy.attrValue) copy.attrValue = `[${value}]`;
        else copy.attrValue += `[${value}]`;

        return copy;
    },

    pseudoClass: function (value) {
        if (this.pEValue) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
            );
        }
        const copy = { ...this };

        if (!copy.pCValue) copy.pCValue = `:${value}`;
        else copy.pCValue += `:${value}`;

        return copy;
    },

    pseudoElement: function (value) {
        if (this.pEValue) {
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector',
            );
        }
        const copy = { ...this };

        if (!copy.pEValue) copy.pEValue = `::${value}`;
        else copy.pEValue += `::${value}`;

        return copy;
    },

    combine: function (selector1, combinator, selector2) {
        const copy = { ...this };

        const value = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;

        if (!copy.value) copy.value = value;
        else copy.value += value;

        return copy;
    },

    stringify() {
        if (this.value) return this.value;
    
        let value = '';
    
        if (this.elValue) value += this.elValue;
        if (this.idValue) value += this.idValue;
        if (this.classValue) value += this.classValue;
        if (this.attrValue) value += this.attrValue;
        if (this.pCValue) value += this.pCValue;
        if (this.pEValue) value += this.pEValue;
    
        return value;
      },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
