module.exports = scoper;
var toArrayFromArrayLike = require('@timelaps/to/array/from/array-like');

function scoper(fn) {
    return function () {
        var context = this;
        var middlewares = isWindow(context) ? [] : context.middlewares || [];
        var args = toArrayFromArrayLike(arguments);
        return fn.apply(context, [middlewares].concat(args));
    };
}