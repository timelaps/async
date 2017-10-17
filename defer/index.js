var toArrayFromArrayLike = require('@timelaps/to/array/from/array-like');
module.exports = defer;

function defer(fn, time, context) {
    var id;
    defer.bypass = bypass;
    return defer;

    function bypass(context, args) {
        clearTimeout(id);
        finish(context, args);
    }

    function finish(context, args) {
        fn.apply(context, args);
    }

    function defer() {
        var context = context || this,
            args = toArrayFromArrayLike(arguments);
        clearTimeout(id);
        id = setTimeout(function () {
            finish(context, args);
        }, time);
        return id;
    }
}