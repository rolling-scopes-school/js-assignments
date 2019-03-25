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
    this.height = height;
    this.width = width;
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
const cssSelectorBuilder = {
    element: function(value) {
        let builder = new SelectorBuilder();
        return builder.element(value);
    },

    id: function(value) {
        let builder = new SelectorBuilder();
        return builder.id(value);
    },

    class: function(value) {
        let builder = new SelectorBuilder();
        return builder.class(value);
    },

    attr: function(value) {
        let builder = new SelectorBuilder();
        return builder.attr(value);
    },

    pseudoClass: function(value) {
        let builder = new SelectorBuilder();
        return builder.pseudoClass(value);
    },

    pseudoElement: function(value) {
        let builder = new SelectorBuilder();
        return builder.pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.chain(combinator, selector2);
    }
};

// Said FREEZE wid da gun. He put da gun towards me an said FREEZE!
// I said I neva FREEZE! And den I walked da wae.
let stages = Object.freeze({
    element: 0,
    id: 1,
    class: 2,
    attr: 3,
    pseudoClass: 4,
    pseudoElement: 5
});

class SelectorBuilder {
    constructor() {
        this.stage = stages.element;
        this.follow = [];
        this.content = {
            element: undefined,
            id: undefined,
            classes: [],
            attributes: [],
            pseudoClasses: [],
            pseudoElement: undefined
        };
    }

    element(value) {
        if (this.stage > stages.element) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }

        if (this.content.element === undefined) {
            this.content.element = value;
            return this;
        } else {
            throw new Error('Element, id and pseudo-element ' +
                'should not occur more then one time inside the selector');
        }
    }

    id(value) {
        if (this.stage > stages.id) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this.stage = stages.id;

        if (this.content.id === undefined) {
            this.content.id = value;
            return this;
        } else {
            throw new Error('Element, id and pseudo-element ' +
                'should not occur more then one time inside the selector');
        }
    }

    class(value) {
        if (this.stage > stages.class) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this.stage = stages.class;

        this.content.classes.push(value);
        return this;
    }

    attr(value) {
        if (this.stage > stages.attr) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this.stage = stages.attr;

        this.content.attributes.push(value);
        return this;
    }

    pseudoClass(value) {
        if (this.stage > stages.pseudoClass) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this.stage = stages.pseudoClass;

        this.content.pseudoClasses.push(value);
        return this;
    }

    pseudoElement(value) {
        if (this.stage > stages.pseudoElement) {
            throw new Error('Selector parts should be arranged in the following ' +
                'order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        this.stage = stages.pseudoElement;

        if (this.content.pseudoElement === undefined) {
            this.content.pseudoElement = value;
            return this;
        } else {
            throw new Error('Element, id and pseudo-element ' +
                'should not occur more then one time inside the selector');
        }
    }

    stringify() {
        return (this.content.element !== undefined ? this.content.element : '') +
            (this.content.id !== undefined ? '#' + this.content.id : '') +
            (this.content.classes.length ? '.' + this.content.classes.join('.') : '') +
            (this.content.attributes.length ? this.content.attributes.map(elem => `[${elem}]`).join('') : '') +
            (this.content.pseudoClasses.length ? ':' + this.content.pseudoClasses.join(':') : '') +
            (this.content.pseudoElement !== undefined ? '::' + this.content.pseudoElement : '') +
            (this.follow.length ?
                this.follow.map(elem => ` ${elem.combinator} ` + elem.element.stringify()).join('') : '');
    }

    chain(combinator, chainable) {
        this.follow.push({combinator: combinator, element: chainable});
        return this;
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
