'use strict';

var assert = require('assert');
var tasks = require('../task/08-objects-tasks');
it.optional = require('../extensions/it-optional');

describe('08-objects-tasks', function() {

    it.optional('Rectangle constructor should return the rectangle object', function () {
        var rect = new tasks.Rectangle(10,20);

        assert.equal(
            typeof rect,
            'object',
            'Result of Rectangle constructor should be an object'
        );
        assert(
            rect.hasOwnProperty('width'),
            'Result of Rectangle constructor should be an object with "width" property'
        );
        assert.equal(
            rect.width,
            10,
            'Result of new Rectangle(10,20) should be an object with "width" property equals to 10'
        );
        assert(
            rect.hasOwnProperty('height'),
            'Result of new Rectangle(10,20) should be an object with "height" property'
        );
        assert.equal(
            rect.width,
            10,
            'Result of new Rectangle(10,20) should be an object with "height" property equals to 20'
        );
        assert.equal(
            typeof rect.getArea,
            'function',
            'Result of Rectangle constructor should be an object with "getArea" method'
        );
        assert.equal(
            rect.getArea(),
            200,
            'Result of (new Rectangle(10,20)).getArea() should return the correct area of specified rectangle'
        );
        assert.equal(
            (new tasks.Rectangle(3,8)).getArea(),
            24,
            'Result of (new Rectangle(3,8)).getArea() should return the correct area of specified rectangle'
        );
    });


    it.optional('getJSON should return the JSON representation of specified object', function () {
        [
            {
                obj: [ 1, 2, 3],
                expected: '[1,2,3]'
            },{
                obj: { height: 10, width: 20 },
                expected: '{"height":10,"width":20}'
            }
        ].forEach(data => {
            assert.equal(
                tasks.getJSON(data.obj),
                data.expected
            );
        });
    });


    it.optional('fromJSON should return the object of specified type from JSON representation', function () {
        var MockType = function(a,b,c) {
            this.a = a;
            this.b = b;
            this.c = c;
        };

        [
            {
                proto: tasks.Rectangle.prototype,
                json: '{ "width":10, "height":20 }',
                expected: new tasks.Rectangle(10, 20)
            },{
                proto: MockType.prototype,
                json: '{ "a":10, "b":20, "c":30 }',
                expected: new MockType(10,20,30)
            }
        ].forEach(data => {
            var actual = tasks.fromJSON(data.proto, data.json);
            assert.deepEqual(
                actual,
                data.expected,
                'fromJson method shoud restore all properties from json'
            );
            assert.equal(
                actual.__proto__,
                data.expected.__proto__,
                'fromJson method shoud restore type from prototype argument'
            );
        });
    });


    it.optional('cssSelectorBuilder should creates css selector object with stringify() method', function () {
        const builder = tasks.cssSelectorBuilder;

        // Test simple selectors
        assert.equal(
            builder.element('div').stringify(),
            'div'
        );
        assert.equal(
            builder.id('nav-bar').stringify(),
            '#nav-bar'
        );
        assert.equal(
            builder.class('warning').stringify(),
            '.warning'
        );
        assert.equal(
            builder.attr('href$=".png"').stringify(),
            '[href$=".png"]'
        );
        assert.equal(
            builder.pseudoClass('invalid').stringify(),
            ':invalid'
        );
        assert.equal(
            builder.pseudoElement('first-letter').stringify(),
            '::first-letter'
        );

        // Test complex selectors
        assert.equal(
            builder.element('li').id('main').stringify(),
            'li#main'
        );
        assert.equal(
            builder.element('div').class('container').stringify(),
            'div.container'
        );
        assert.equal(
            builder.element('div').class('container').class('clickable').stringify(),
            'div.container.clickable'
        );
        assert.equal(
            builder.id('main').class('container').class('editable').stringify(),
            '#main.container.editable'
        );
        assert.equal(
            builder.element('li').id('home-menu').class('active').stringify(),
            'li#home-menu.active'
        );
        assert.equal(
            builder.class('container').class('nav-bar').class('navbar-inverted').stringify(),
            '.container.nav-bar.navbar-inverted'
        );
        assert.equal(
            builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify(),
            'a[href$=".png"]:focus'
        );
        assert.equal(
            builder.element('p').pseudoClass('first-of-type').pseudoElement('first-letter').stringify(),
            'p:first-of-type::first-letter'
        );
        assert.equal(
            builder.element('input').pseudoClass('focus').pseudoClass('invalid').stringify(),
            'input:focus:invalid'
        );

        // Test combined selectors
        assert.equal(
            builder.combine(
                builder.element('p').pseudoClass('focus'),
                '>',
                builder.element('a').attr('href$=".png"')
            ).stringify(),
            'p:focus > a[href$=".png"]'
        );

        assert.equal(
            builder.combine(
                builder.element('p').id('introduction'),
                '~',
                builder.element('img').attr('href$=".png"')
            ).stringify(),
            'p#introduction ~ img[href$=".png"]'
        );

        assert.equal(
            builder.combine(
                builder.id('charter1').class('touch'),
                '+',
                builder.element('table')
            ).stringify(),
            '#charter1.touch + table'
        );

        assert.equal(
            builder.combine(
                builder.element('ul').class('animable'),
                ' ',
                builder.element('li').pseudoClass('nth-of-type(1)')
            ).stringify(),
            'ul.animable   li:nth-of-type(1)'
        );

        assert.equal(
            builder.combine(
                builder.element('div').id('main').class('container').class('draggable'),
                '+',
                builder.combine(
                    builder.element('table').id('data'),
                    '~',
                    builder.combine(
                        builder.element('tr').pseudoClass('nth-of-type(even)'),
                        ' ',
                        builder.element('td').pseudoClass('nth-of-type(even)')
                    )
                )
            ).stringify(),
            'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
        );

        // Test validation
        [
            () => builder.element('table').element('div'),
            () => builder.id('id1').id('id2'),
            () => builder.pseudoElement('after').pseudoElement('before'),
        ].forEach(fn => {
            assert.throws(
                fn,
                /Element, id and pseudo-element should not occur more then one time inside the selector/,
                
                '\nPlease throw an exception "Element, id and pseudo-element should not occur more then one time inside the selector" '+
                'if element, id or pseudo-element occurs twice or more times'
            );
        });

        [
            () => builder.class('draggable').class('animated'),
            () => builder.attr('href').attr('title'),
            () => builder.pseudoClass('invalid').pseudoClass('focus'),
        ].forEach(fn => {
            assert.doesNotThrow(
                fn,
                /Element, id and pseudo-element should not occur more then one time inside the selector/
            );
        });

        [
            () => builder.id('id').element('div'),
            () => builder.class('main').id('id'),
            () => builder.attr('href').class('download-link'),
            () => builder.pseudoClass('hover').attr('title'),
            () => builder.pseudoElement('after').pseudoClass('valid'),
            () => builder.pseudoElement('after').id('id'),
        ].forEach(fn => {
            assert.throws(
                fn,
                /Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element/,
                
                '\nPlease throw an exception "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element" '+
                'if selector parts arranged in an invalid order.'
            );
        });

    });

});
