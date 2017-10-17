module.exports = parallel;
var forEach = require('@timelaps/n/for/each');

function parallel(items, handler, callback) {
    forEach(items, function (item) {
        handler(item, callback);
    });
}