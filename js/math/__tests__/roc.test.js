"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _roc = _interopRequireDefault(require("../roc"));

// ROC (prev:number, next:number) : number
describe('ROC', function () {
  test('should return rate of change from prev to next fixed by 2', function () {
    expect((0, _roc["default"])(100, 200)).toBe(100);
    expect((0, _roc["default"])(100, 50)).toBe(-50);
    expect((0, _roc["default"])(100, 100.01)).toBe(0.01);
    expect((0, _roc["default"])(100, 99.99)).toBe(-0.01);
    expect((0, _roc["default"])(100, 100.005)).toBe(0.01);
    expect((0, _roc["default"])(100, 100.004)).toBe(0);
    expect((0, _roc["default"])(100, 100.003)).toBe(0);
    expect((0, _roc["default"])(100, 99.997)).toBe(-0);
    expect((0, _roc["default"])(100, 99.996)).toBe(-0);
    expect((0, _roc["default"])(100, 99.995)).toBe(-0.01);
  });
  test('should return correct value for prev number and next 0', function () {
    expect((0, _roc["default"])(0, 0)).toBe(0);
    expect((0, _roc["default"])(1, 0)).toBe(-100);
    expect((0, _roc["default"])(-1, 0)).toBe(100);
  });
  test('should return null for prev value 0 and next not 0 number', function () {
    expect((0, _roc["default"])(0, 1)).toBe(null);
    expect((0, _roc["default"])(0, 2)).toBe(null);
  });
  test('should return null for edge case', function () {
    expect((0, _roc["default"])(null, 10)).toBe(null);
    expect((0, _roc["default"])(void 0, 10)).toBe(null);
    expect((0, _roc["default"])(NaN, 10)).toBe(null);
    expect((0, _roc["default"])('str', 10)).toBe(null);
    expect((0, _roc["default"])(false, 10)).toBe(null);
    expect((0, _roc["default"])(true, 10)).toBe(null);
    expect((0, _roc["default"])(10, null)).toBe(null);
    expect((0, _roc["default"])(10, void 0)).toBe(null);
    expect((0, _roc["default"])(10, NaN)).toBe(null);
    expect((0, _roc["default"])(10, 'str')).toBe(null);
    expect((0, _roc["default"])(10, false)).toBe(null);
    expect((0, _roc["default"])(10, true)).toBe(null);
  });
});
//# sourceMappingURL=roc.test.js.map