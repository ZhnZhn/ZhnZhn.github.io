"use strict";

var _isTypeFn = require("../isTypeFn");
describe('isTypeNumber', () => {
  const fn = _isTypeFn.isTypeNumber;
  test('should retun true for type number otherwise false', () => {
    expect(fn(0)).toBe(true);
    expect(fn(0.1)).toBe(true);
    expect(fn(NaN)).toBe(true);
    expect(fn('str')).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(void 0)).toBe(false);
    expect(fn(true)).toBe(false);
  });
});
describe('isNumber', () => {
  const fn = _isTypeFn.isNumber;
  test('should return true for number otherwise false', () => {
    expect(fn(-0.2)).toBe(true);
    expect(fn(2)).toBe(true);
    expect(fn(0)).toBe(true);
    expect(fn(-0)).toBe(true);
    expect(fn(+0)).toBe(true);
    expect(fn(NaN)).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(undefined)).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn({})).toBe(false);
  });
});
describe('isPositiveNumber', () => {
  const fn = _isTypeFn.isPositiveNumber;
  test('should return true for positive number otherwise false', () => {
    expect(fn(0.000001)).toBe(true);
    expect(fn(-0.000001)).toBe(false);
    expect(fn(0)).toBe(false);
    expect(fn(-0)).toBe(false);
    expect(fn(+0)).toBe(false);
    expect(fn(NaN)).toBe(false);
    expect(fn()).toBe(false);
    expect(fn(void 0)).toBe(false);
    expect(fn("")).toBe(false);
  });
});
describe('isNaN', () => {
  const fn = _isTypeFn.isNaN;
  test('should return true for NaN value otherwise false', () => {
    expect(fn(NaN)).toBe(true);
    expect(fn(2)).toBe(false);
    expect(fn(0.2)).toBe(false);
  });
});
describe('isInt', () => {
  const fn = _isTypeFn.isInt;
  test('should return true for integer value otherwise false', () => {
    expect(fn(-2)).toBe(true);
    expect(fn(0)).toBe(true);
    expect(fn(1)).toBe(true);
    expect(fn(-0.2)).toBe(false);
    expect(fn(0.1)).toBe(false);
    expect(fn(NaN)).toBe(false);
  });
});
describe('isBool', () => {
  const fn = _isTypeFn.isBool;
  test('should return true for boolean values otherwise false', () => {
    expect(fn(true)).toBe(true);
    expect(fn(false)).toBe(true);
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(0)).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn(NaN)).toBe(false);
  });
});
describe('isStr', () => {
  const fn = _isTypeFn.isStr;
  test('should return true for string value otherwise false', () => {
    expect(fn('')).toBe(true);
    expect(fn('str')).toBe(true);
    expect(fn(new String())).toBe(false);
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(true)).toBe(false);
    expect(fn(2)).toBe(false);
  });
});
describe('isUndef', () => {
  const fn = _isTypeFn.isUndef;
  test('should return true for undefined value otherwise false', () => {
    expect(fn()).toBe(true);
    expect(fn(void 0)).toBe(true);
    expect(fn(null)).toBe(false);
    expect(fn('')).toBe(false);
  });
});
describe("isFn", () => {
  const fn = _isTypeFn.isFn;
  test('should return true for function value otherwise flase', () => {
    expect(fn(fn)).toBe(true);
    expect(fn(() => {})).toBe(true);
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn('')).toBe(false);
  });
});
describe('isObj', () => {
  const fn = _isTypeFn.isObj;
  test('should return true for object except null othewise false', () => {
    expect(fn({})).toBe(true);
    expect(fn(null)).toBe(false);
  });
});
describe('isNotEmptyArr', () => {
  const fn = _isTypeFn.isNotEmptyArr;
  test('should return true for array with not zero length othewise false', () => {
    expect(fn([''])).toBe(true);
    expect(fn([])).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
  });
});
//# sourceMappingURL=isTypeFn.test.js.map