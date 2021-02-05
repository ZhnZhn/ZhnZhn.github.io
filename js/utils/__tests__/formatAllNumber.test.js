"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _formatAllNumber = _interopRequireDefault(require("../formatAllNumber"));

describe('formatAllNumber', function () {
  test('should format value without decimals to str with blanks', function () {
    expect((0, _formatAllNumber["default"])(1)).toBe('1');
    expect((0, _formatAllNumber["default"])(10)).toBe('10');
    expect((0, _formatAllNumber["default"])(100)).toBe('100');
    expect((0, _formatAllNumber["default"])(1000)).toBe('1 000');
    expect((0, _formatAllNumber["default"])(100000)).toBe('100 000');
    expect((0, _formatAllNumber["default"])(100000000)).toBe('100 000 000');
    expect((0, _formatAllNumber["default"])(-1)).toBe('-1');
    expect((0, _formatAllNumber["default"])(-10)).toBe('-10');
    expect((0, _formatAllNumber["default"])(-100)).toBe('-100');
    expect((0, _formatAllNumber["default"])(-1000)).toBe('-1 000');
    expect((0, _formatAllNumber["default"])(-100000)).toBe('-100 000');
    expect((0, _formatAllNumber["default"])(-100000000)).toBe('-100 000 000');
  });
  test('should format value with decimals for str with blanks', function () {
    expect((0, _formatAllNumber["default"])(100.001)).toBe('100.001');
    expect((0, _formatAllNumber["default"])(100000.001)).toBe('100 000.001');
    expect((0, _formatAllNumber["default"])(-100.001)).toBe('-100.001');
    expect((0, _formatAllNumber["default"])(-100000.001)).toBe('-100 000.001');
  });
  test('should format small values [0, 1e-7)', function () {
    expect((0, _formatAllNumber["default"])(0.000001099)).toBe('0.000001099');
    expect((0, _formatAllNumber["default"])(1.099e-6)).toBe('0.000001099');
    expect((0, _formatAllNumber["default"])(-0.000001099)).toBe('-0.000001099');
    expect((0, _formatAllNumber["default"])(-1.099e-6)).toBe('-0.000001099');
  });
  test('should format small values (1e-7, +) to exponential format', function () {
    expect((0, _formatAllNumber["default"])(0.0000001099)).toBe('1.099e-7');
    expect((0, _formatAllNumber["default"])(1.099e-7)).toBe('1.099e-7');
    expect((0, _formatAllNumber["default"])(-0.0000001099)).toBe('-1.099e-7');
    expect((0, _formatAllNumber["default"])(-1.099e-7)).toBe('-1.099e-7');
  });
  test('should return same value for already formated str', function () {
    expect((0, _formatAllNumber["default"])('100 000')).toBe('100 000');
    expect((0, _formatAllNumber["default"])('100.001')).toBe('100.001');
    expect((0, _formatAllNumber["default"])('100 000.001')).toBe('100 000.001');
    expect((0, _formatAllNumber["default"])('100 000 000')).toBe('100 000 000');
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