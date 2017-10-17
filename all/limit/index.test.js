// var b = require('@timelaps/batterie');
// var allLimit = require('./');
// b.describe('all/limit', function () {
//     b.expect(allLimit).toBeFunction();
//     b.expect(allLimit).toThrow();
//     b.async('calls fns async', function (t) {
//         debugger;
//         allLimit([1, 2, 3, 4], function (input, callback) {
//             setTimeout(function () {
//                 callback(null, input * 100);
//             }, input);
//         }, function (list) {
//             t.expect(list).toEqual([100, 200, 300, 400]);
//             t.done();
//         });
//     });
// });