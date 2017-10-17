module.exports = debounce;
var isNull = require('@timelaps/is/null');
var now = require('@timelaps/hacks/now');
var toArrayFromArrayLike = require('@timelaps/to/array/from/array-like');

function debounce(fn, timeout, immediate, context) {
    var last = immediate ? 0 : null;
    return debounceInstance;

    function debounceInstance() {
        var time,
            diff,
            args = toArrayFromArrayLike(arguments);
        if (!isNull(last) && (diff = ((time = now()) - last)) > timeout) {
            finish();
        } else {
            time = null;
            diff = diff || ((time || now()) - last);
            setTimeout(finish, timeout - diff)
        }

        function finish() {
            last = time || now();
            fn.apply(context || scope, args);
        }
    }
}