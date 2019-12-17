"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fnObj = _interopRequireDefault(require("../fnObj"));

var findInPropArrayByProp = _fnObj["default"].findInPropArrayByProp;
describe('findInPropArrayByProp', function () {
  test('should return obj', function () {
    var obj = {
      lists: [{
        a: 1
      }, {
        a: 2
      }, {
        a: 3
      }]
    },
        fn = findInPropArrayByProp('lists', 'a');
    expect(typeof fn).toBe('function');
    expect(fn(obj, 1)).toEqual({
      a: 1
    });
    expect(fn(obj, 2)).toEqual({
      a: 2
    });
    expect(fn(obj, 3)).toEqual({
      a: 3
    });
  });
});
//# sourceMappingURL=fnObj.test.js.map