"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sma = _interopRequireDefault(require("../sma"));

describe("math sma", function () {
  test("should return empty array for not array or empty array input", function () {
    expect((0, _sma["default"])()).toEqual([]);
    expect((0, _sma["default"])(null)).toEqual([]);
    expect((0, _sma["default"])(1)).toEqual([]);
    expect((0, _sma["default"])('str')).toEqual([]);
    expect((0, _sma["default"])(true)).toEqual([]);
    expect((0, _sma["default"])({})).toEqual([]);
    expect((0, _sma["default"])([])).toEqual([]);
  });
  test('should return [] in case not enough data', function () {
    expect((0, _sma["default"])([[1, 2], [2, 4]], 2)).toEqual([[2, 3]]);
    expect((0, _sma["default"])([[1, 2], [2, 4]], 3)).toEqual([]);
  });
  test('should return sma arr', function () {
    var data = [[1, 2], [2, 4], [3, 2], [4, 6], [5, 4]];
    expect((0, _sma["default"])(data, 0)).toEqual(data);
    expect((0, _sma["default"])(data)).toEqual(data);
    expect((0, _sma["default"])(data, 1)).toEqual(data);
    expect((0, _sma["default"])(data, 2)).toEqual([[2, 3], [3, 3], [4, 4], [5, 5]]);
  });
  test("should return correct sma toFixed 2 array for array points", function () {
    expect((0, _sma["default"])([[1, 0.7745], [2, 0.7844], [3, 0.78], [4, 0.78]], 2)).toEqual([[2, 0.78], [3, 0.78], [4, 0.78]]); // JS 3*0.7 = 2.0999999999999996 < 2.1

    expect((0, _sma["default"])([[1, 0.7], [2, 0.7], [3, 0.7]], 3)).toEqual([[3, 0.7]]); // JS 3*0.2 = 0.6000000000000001 > 0.6

    expect((0, _sma["default"])([[1, 0.2], [2, 0.2], [3, 0.2]], 3)).toEqual([[3, 0.2]]);
  });
  test("should return correct sma array toFixed 2 for x, y points", function () {
    expect((0, _sma["default"])([{
      x: 1,
      y: 0.7777
    }, {
      x: 2,
      y: 0.7777
    }, {
      x: 3,
      y: 0.7777
    }, {
      x: 4,
      y: 0.7777
    }], 2)).toEqual([[2, 0.78], [3, 0.78], [4, 0.78]]);
    expect((0, _sma["default"])([{
      x: 1,
      y: 0.7
    }, {
      x: 2,
      y: 0.7
    }, {
      x: 3,
      y: 0.7
    }], 3)).toEqual([[3, 0.7]]);
    expect((0, _sma["default"])([{
      x: 1,
      y: 0.2
    }, {
      x: 2,
      y: 0.2
    }, {
      x: 3,
      y: 0.2
    }], 3)).toEqual([[3, 0.2]]);
  });
  test("should filter not number values", function () {
    expect((0, _sma["default"])([[1, 0.7], [2, void 0], [3, 'str'], [4, NaN], [5, null], [6, 0.7]], 2)).toEqual([[6, 0.7]]);
  });
});
//# sourceMappingURL=sma.test.js.map