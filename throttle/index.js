var now = require('@timelaps/hacks/now');
module.exports = function throttle(fn, threshold, scope) {
    var last,
        deferTimer;
    if (!threshold) {
        threshold = 250;
    }
    return function throttleInstance() {
        var context = scope || this,
            _now = now(),
            args = arguments;
        clearTimeout(deferTimer);
        if (last && _now < last + threshold) {
            // hold on to it
            deferTimer = setTimeout(throttled, threshold);
        } else {
            throttled();
        }

        function throttled() {
            last = _now;
            fn.apply(context, args);
        }
    };
};