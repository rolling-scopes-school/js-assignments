'use strict';

exports = module.exports = testOptional;

function testOptional(title, fn) {

    it(title, function () {
        let errHandler = (err) => {
            if (err.message == "Not implemented") {
                this.test.skip();
            } else {
                throw err;
            }
        };

        try {
            let promise = fn.call(this);
            if (promise && promise.catch) {
                return promise.catch(errHandler);
            }
        } catch (err) {
            errHandler(err);
        }
    });

}