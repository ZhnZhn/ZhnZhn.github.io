"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _calcDirection = _interopRequireDefault(require("../calcDirection"));

describe('calcDirection', function () {
  var points = [{
    x: 1,
    y: 1
  }, {
    x: 2,
    y: 2
  }, {
    x: 3,
    y: 0
  }, {
    x: 4,
    y: 0
  }];
  test('should return y direction', function () {
    expect((0, _calcDirection["default"])(points, 1)).toBe(-1);
    expect((0, _calcDirection["default"])(points, 2)).toBe(1);
    expect((0, _calcDirection["default"])(points, 3)).toBe(0);
  });
  test('should return 0 for index 0', function () {
    expect((0, _calcDirection["default"])(points, 0)).toBe(0);
  });
  test('should return 0 for array with one point', function () {
    expect((0, _calcDirection["default"])([{
      x: 1,
      y: 1
    }], 2)).toBe(0);
  });
});
//# sourceMappingURL=calcDirection.test.js.map