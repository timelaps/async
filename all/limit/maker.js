module.exports = maker;
var wrapTry = require('@timelaps/fn/wrap-try');
var reduce = require('@timelaps/array/reduce');
var has = require('@timelaps/n/has/shallow');
var bindWith = require('@timelaps/fn/bind/with');

function maker(mutator_) {
    var mutatr = mutator_ || mutator;
    return all;

    function all(collection, limit, doer, callback) {
        var length = collection.length;
        if (!length) {
            callback(null, []);
        }
        var terminated = false;
        var chunk = collection;
        if (limit <= length) {
            // slice is exclusive
            chunk = collection.slice(0, limit);
        }
        var memo = {
            next: limit,
            length: length,
            list: new Array(length),
            collection: collection,
            counter: 0,
            terminated: false
        };
        reduce(chunk, empty, memo);
        memo.terminated = true;
        if (!hasErred()) {
            finish();
        }

        function empty(memo, item, index) {
            if (!hasErred()) {
                wrapTry(bindWith(doer, [null, item, handle]));
            }
            return memo;

            function handle(err, result) {
                var next;
                if (hasErred()) {
                    return;
                } else if (arguments.length === 1) {
                    erred(err);
                } else {
                    memo.list = mutatr(memo.counter, result, index, memo.list);
                    memo.next += 1;
                    memo.counter += 1;
                    next = memo.next;
                    if (next < memo.length) {
                        // fifo
                        empty(memo, collection[next], next);
                    } else if (memo.terminated) {
                        finish();
                    }
                }
            }
        }

        function erred(err) {
            memo.error = err;
            callback(err);
        }

        function hasErred() {
            return has(memo, 'error');
        }

        function finish() {
            if (memo.counter >= memo.length) {
                callback(null, memo.list);
            }
        }
    }
}

function mutator(counter, value, index, list) {
    // maintains order
    list[index] = value;
    return list;
}