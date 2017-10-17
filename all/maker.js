var allLimit = require('./limit/maker');
module.exports = allMaker;

function allMaker(limit, mutator) {
    var allMutating = allLimit(mutator);
    return all;

    function all(collection, handler, callback) {
        return allMutating(collection, limit, handler, callback);
    }
}