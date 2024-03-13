'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *  npm test ./test/08-objects-tests.js                                                                                              *
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

    this.getArea = () => {
        return this.width * this.height
    }
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
    let jsonObj = JSON.parse(json);
    let obj = Object.create(proto);
    for (let field in proto.prototype)
        obj[field] = proto[field];
    for (let field in jsonObj)
        obj[field] = jsonObj[field]
    return Object.setPrototypeOf(jsonObj, proto);
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
const CssSelector = (function () {
    const extraPartsErrorMsg = 'Element, id and pseudo-element should not occur more then one time inside the selector';
    const invalidOrderErrorMsg = 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
    const map = new WeakMap();

    const State = Object.freeze({
        ELEMENT: 0,
        ID: 1,
        CLASS: 2,
        ATTR: 3,
        PSEUDO_CLASS: 4,
        PSEUDO_ELEMENT: 5,
        COMBINED_SELECTOR: 10
    });

    function internal(ref) {
        if (!map.get(ref)) {
            map.set(ref, {});
        }
        return map.get(ref);
    }

    function addPart(scope, value, validState, nextState) {
        const selector = internal(scope);
        if (selector.alreadyCalled[validState]) {
            throw new Error(extraPartsErrorMsg);
        }
        if (selector.currentState > validState) {
            throw new Error(invalidOrderErrorMsg);
        }
        if (nextState) {
            selector.alreadyCalled[validState] = true;
        }
        scope.selector += value;
        selector.currentState = nextState || validState;
        return scope;
    }

    function CssSelector(selector, state) {
        this.selector = selector || '';
        internal(this).currentState = state || State.ELEMENT;
        internal(this).alreadyCalled = {};
    }

    CssSelector.prototype = {

        element: function (value) {
            return addPart(this, value, State.ELEMENT, State.ID);
        },

        id: function (value) {
            return addPart(this, `#${value}`, State.ID, State.CLASS);
        },

        class: function (value) {
            return addPart(this, `.${value}`, State.CLASS);
        },

        attr: function (value) {
            return addPart(this, `[${value}]`, State.ATTR);
        },

        pseudoClass: function (value) {
            return addPart(this, `:${value}`, State.PSEUDO_CLASS);
        },

        pseudoElement: function (value) {
            return addPart(this, `::${value}`, State.PSEUDO_ELEMENT, State.COMBINED_SELECTOR);
        },

        combine: function (second, combinator) {
            const combinedSelector = `${this.selector} ${combinator} ${second.selector}`;
            return new CssSelector(combinedSelector, State.COMBINED_SELECTOR);
        },

        stringify: function () {
            return this.selector;
        }
    };

    return CssSelector;

}());
const cssSelectorBuilder = {

    element: function (value) {
        return new CssSelector().element(value);
    },

    id: function (value) {
        return new CssSelector().id(value);
    },

    class: function (value) {
        return new CssSelector().class(value);
    },

    attr: function (value) {
        return new CssSelector().attr(value);
    },

    pseudoClass: function (value) {
        return new CssSelector().pseudoClass(value);
    },

    pseudoElement: function (value) {
        return new CssSelector().pseudoElement(value);
    },

    combine: function (selector1, combinator, selector2) {
        return selector1.combine(selector2, combinator);
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
