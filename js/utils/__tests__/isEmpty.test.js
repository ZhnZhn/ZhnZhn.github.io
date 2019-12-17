"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _isEmpty = _interopRequireDefault(require("../isEmpty"));

describe('isEmpty', function () {
  test('for {} should return true', function () {
    expect((0, _isEmpty["default"])({})).toBe(true);
  });
  test('for obj with prop should return false', function () {
    expect((0, _isEmpty["default"])({
      a: 'a'
    })).toBe(false);
  });
  test('for null should return true', function () {
    expect((0, _isEmpty["default"])(null)).toBe(true);
  });
  test('for undefined should return true', function () {
    expect((0, _isEmpty["default"])()).toBe(true);
  });
});
//# sourceMappingURL=isEmpty.test.js.map