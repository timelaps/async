var b = require('@timelaps/batterie');
var all = require('./');
b.describe('all', function () {
    b.expect(all).toBeFunction();
    b.expect(all).toThrow();
    b.async('calls fns async', function (t) {
        all([1, 2, 3, 4], function (input, callback) {
            setTimeout(function () {
                callback(null, input * 100);
            }, input);
        }, function (err, results) {
            t.expect(err).toBeNull();
            t.expect(results).toEqual([100, 200, 300, 400]);
            t.done();
        });
    }, 2);
    b.async('results will always be in correct order', function (t) {
        var list = [1, 2, 3, 4];
        all(list, function (input, callback) {
            setTimeout(function () {
                callback(null, input * input);
            }, list.length - input);
        }, function (err, results) {
            t.expect(err).toBeNull();
            t.expect(results).toEqual([1, 4, 9, 16]);
            t.done();
        });
    }, 2);
    b.async('will pass the error through if it should occur at any time', function (t) {
        var list = [1, 2, 3, 4];
        all(list, function (input, callback) {
            setTimeout(function () {
                if (input === 2) {
                    callback(new Error());
                } else {
                    callback(null, input);
                }
            });
        }, function (err, results) {
            t.expect(err).toBeObject();
            t.expect(arguments.length).toBe(1);
            t.done();
        });
    }, 2);
});