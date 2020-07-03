"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fCompareBy = _interopRequireDefault(require("../fCompareBy"));

describe('fCompareBy', function () {
  var fn = _fCompareBy["default"];
  it('should create fn for comparing arr by index', function () {
    var _compare = fn(0),
        arr = [[3, 0], [4, 0], [2, 0], [2, 1], [1, 0]];

    expect(typeof fn).toBe('function');
    expect(arr.sort(_compare)).toEqual([[1, 0], [2, 0], [2, 1], [3, 0], [4, 0]]);
  });
  it('should create fn for comparing by propName', function () {
    var _compare = fn('y'),
        arr = [{
      y: 3,
      x: 0
    }, {
      y: 4,
      x: 0
    }, {
      y: 2,
      x: 0
    }, {
      y: 2,
      x: 1
    }, {
      y: 1,
      x: 0
    }];

    expect(typeof fn).toBe('function');
    expect(arr.sort(_compare)).toEqual([{
      y: 1,
      x: 0
    }, {
      y: 2,
      x: 0
    }, {
      y: 2,
      x: 1
    }, {
      y: 3,
      x: 0
    }, {
      y: 4,
      x: 0
    }]);
  });
});
//# sourceMappingURL=fCompareBy.test.js.map