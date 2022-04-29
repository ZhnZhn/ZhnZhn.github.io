"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _factoryFindInPropArrayByProp = _interopRequireDefault(require("../factoryFindInPropArrayByProp"));

describe('factoryFindInPropArrayByProp', () => {
  test('should return obj', () => {
    const obj = {
      lists: [{
        a: 1
      }, {
        a: 2
      }, {
        a: 3
      }]
    },
          fn = (0, _factoryFindInPropArrayByProp.default)('lists', 'a');
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
//# sourceMappingURL=factoryFindInPropArrayByProp.test.js.map