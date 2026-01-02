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
describe('isStrNotBlank', () => {
  const fn = _isTypeFn.isStrNotBlank;
  test('should return true for not blank str', () => {
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(true)).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn('  ')).toBe(false);
    expect(fn('          ')).toBe(false);
    expect(fn('str')).toBe(true);
    expect(fn('0')).toBe(true);
    expect(fn('1')).toBe(true);
  });
});
describe('isStrOrNumber', () => {
  const fn = _isTypeFn.isStrOrNumber;
  test('should return true for not empty string of number othewise false', () => {
    expect(fn('str')).toBe(true);
    expect(fn(0)).toBe(true);
    expect(fn('')).toBe(false);
    expect(fn(NaN)).toBe(false);
    expect(fn(new String())).toBe(false);
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(true)).toBe(false);
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
describe('isEmpty', () => {
  const fn = _isTypeFn.isEmpty;
  test('for {} should return true', () => {
    expect(fn({})).toBe(true);
  });
  test('for obj with prop should return false', () => {
    expect(fn({
      a: 'a'
    })).toBe(false);
  });
  test('for null should return true', () => {
    expect(fn(null)).toBe(true);
  });
  test('for undefined should return true', () => {
    expect(fn()).toBe(true);
  });
});
describe('getObjectKeys', () => {
  const fn = _isTypeFn.getObjectKeys;
  test('should return array with argument object keys', () => {
    expect(fn({
      a: 1,
      b: 2
    })).toEqual(['a', 'b']);
    expect(fn({})).toEqual([]);
  });
  test('should return empty array in edge cases', () => {
    expect(fn({})).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn([1, 2, 3])).toEqual([]);
    expect(fn([])).toEqual([]);
    expect(fn(void 0)).toEqual([]);
    expect(fn('str')).toEqual([]);
    expect(fn('')).toEqual([]);
  });
});
describe('parseIntBy10', () => {
  const fn = _isTypeFn.parseIntBy10;
  test('should return number', () => {
    expect(fn("0")).toBe(0);
    expect(fn(0)).toBe(0);
    expect(fn("1")).toBe(1);
    expect(fn(1)).toBe(1);
    expect(fn("10")).toBe(10);
    expect(fn(10)).toBe(10);
    expect(fn("100")).toBe(100);
    expect(fn(100)).toBe(100);
  });
});
//# sourceMappingURL=isTypeFn.test.js.map