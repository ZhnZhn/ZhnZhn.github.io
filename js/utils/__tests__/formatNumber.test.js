"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _formatNumber = _interopRequireDefault(require("../formatNumber"));

describe('formatNumber', function () {
  test('for -0.01<value<0.01 should return same as str', function () {
    var str1 = (0, _formatNumber["default"])(0.009);
    expect(str1).toBe('0.009');
    expect(typeof str1).toBe('string');
    var str2 = (0, _formatNumber["default"])(-0.009);
    expect(str2).toBe('-0.009');
    expect(typeof str2).toBe('string');
  });
  test('for value>0.01 should return round by 2 decimals as str', function () {
    var str = (0, _formatNumber["default"])(1.009);
    expect(str).toBe('1.01');
    expect(typeof str).toBe('string');
  });
});
//# sourceMappingURL=formatNumber.test.js.map