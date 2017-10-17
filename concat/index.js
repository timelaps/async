module.exports = require('../all/maker')(Infinity, function (counter, value, index, list) {
    list[counter] = value;
    return list;
});