"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _formatAllNumber = _interopRequireDefault(require("../formatAllNumber"));

describe('formatAllNumber', function () {
  test('should format value without decimals to str with blanks', function () {
    var str1 = (0, _formatAllNumber["default"])(100);
    expect(str1).toBe('100');
    expect(typeof str1).toBe('string');
    var str2 = (0, _formatAllNumber["default"])(100000);
    expect(str2).toBe('100 000');
    expect(typeof str2).toBe('string');
    var str3 = (0, _formatAllNumber["default"])(100000000);
    expect(str3).toBe('100 000 000');
    expect(typeof str3).toBe('string');
  });
  test('should format value with decimals for str with blanks', function () {
    var str1 = (0, _formatAllNumber["default"])(100.001);
    expect(str1).toBe('100.001');
    expect(typeof str1).toBe('string');
    var str2 = (0, _formatAllNumber["default"])(100000.001);
    expect(str2).toBe('100 000.001');
    expect(typeof str2).toBe('string');
  });
  test('should format small values [0, 1e-7)', function () {
    var str1 = (0, _formatAllNumber["default"])(0.000001099);
    expect(str1).toBe('0.000001099');
    var str2 = (0, _formatAllNumber["default"])(1.099e-6);
    expect(str2).toBe('0.000001099');
  });
  test('should format small values (1e-7, +) to exponential format', function () {
    var str1 = (0, _formatAllNumber["default"])(0.0000001099);
    expect(str1).toBe('1.099e-7');
    var str2 = (0, _formatAllNumber["default"])(1.099e-7);
    expect(str2).toBe('1.099e-7');
  });
  test('should return same value for already formated str', function () {
    var str1 = '100 000',
        str2 = '100.001',
        str3 = '100 000.001',
        str4 = '100 000 000';
    expect((0, _formatAllNumber["default"])(str1)).toBe(str1);
    expect((0, _formatAllNumber["default"])(str2)).toBe(str2);
    expect((0, _formatAllNumber["default"])(str3)).toBe(str3);
    expect((0, _formatAllNumber["default"])(str4)).toBe(str4);
  });
  test('should return for falsy values str 0', function () {
    expect((0, _formatAllNumber["default"])(null)).toBe('0');
    expect((0, _formatAllNumber["default"])()).toBe('0');
    expect((0, _formatAllNumber["default"])(0)).toBe('0');
    expect((0, _formatAllNumber["default"])(NaN)).toBe('0');
    expect((0, _formatAllNumber["default"])(false)).toBe('0');
    expect((0, _formatAllNumber["default"])('')).toBe('0');
  });
});
//# sourceMappingURL=formatAllNumber.test.js.map