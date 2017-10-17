var now = require('@timelaps/hacks/now');
var isNil = require('@timelaps/is/nil');
var set = setTimeout;
var clear = clearTimeout;
module.exports = throttle;

function throttle(fn, threshold_, scope) {
    var last,
        deferTimer,
        threshold = threshold_;
    if (isNil(threshold)) {
        threshold = 250;
    }
    return throttleInstance;

    function throttleInstance() {
        var context = scope || this,
            _now = now(),
            args = arguments;
        clear(deferTimer);
        if (last && _now < last + threshold) {
            // hold on to it
            deferTimer = set(throttled, threshold);
        } else {
            throttled();
        }

        function throttled() {
            last = _now;
            fn.apply(context, args);
        }
    }
}