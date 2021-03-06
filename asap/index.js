var asapSet = setImmediate || setTimeout;
var asapClear = clearImmediate || clearTimeout;
module.exports = {
    set: set,
    clear: clear
};

function set(fn) {
    return asapSet(fn);
}

function clear(id) {
    return asapClear(id);
}
