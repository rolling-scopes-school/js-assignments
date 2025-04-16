'use strict';

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.getArea = function() {
        return this.width * this.height;
    };
}

function getJSON(obj) {
    return JSON.stringify(obj);
}

function fromJSON(proto, json) {
    const obj = JSON.parse(json);
    Object.setPrototypeOf(obj, proto);
    return obj;
}

const cssSelectorBuilder = {
    element: function(value) {
        this._element = value;
        return this;
    },
    id: function(value) {
        this._id = `#${value}`;
        return this;
    },
    class: function(value) {
        if (!this._classes) this._classes = [];
        this._classes.push(`.${value}`);
        return this;
    },
    attr: function(value) {
        this._attributes = this._attributes || [];
        this._attributes.push(`[${value}]`);
        return this;
    },
    pseudoClass: function(value) {
        this._pseudoClasses = this._pseudoClasses || [];
        this._pseudoClasses.push(`:${value}`);
        return this;
    },
    pseudoElement: function(value) {
        this._pseudoElement = `::${value}`;
        return this;
    },
    combine: function(selector1, combinator, selector2) {
        this._combined = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
        return this;
    },
    stringify: function() {
        let result = '';
        if (this._element) result += this._element;
        if (this._id) result += this._id;
        if (this._classes) result += this._classes.join('');
        if (this._attributes) result += this._attributes.join('');
        if (this._pseudoClasses) result += this._pseudoClasses.join('');
        if (this._pseudoElement) result += this._pseudoElement;
        if (this._combined) return this._combined;
        return result;
    },
};

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
