"use strict";

var _strFn = require("../strFn");
describe('toUpperCaseFirst', () => {
  const fn = _strFn.toUpperCaseFirst;
  const EMPTY = '';
  test('should return string with first upper case letter for string or String input', () => {
    expect(fn('abc')).toBe('Abc');
    expect(fn('aBc')).toBe('ABc');
    expect(fn('aBC')).toBe('ABC');
  });
  test('should retunr empty string for instance of String', () => {
    expect(fn(new String('abc'))).toBe('');
    expect(fn(new String('aBc'))).toBe('');
    expect(fn(new String('aBC'))).toBe('');
  });
  test('should return empty string in edge case', () => {
    expect(fn('')).toBe(EMPTY);
    expect(fn(undefined)).toBe(EMPTY);
    expect(fn(null)).toBe(EMPTY);
    expect(fn({})).toBe(EMPTY);
    expect(fn([])).toBe(EMPTY);
    expect(fn({
      str: 'abc'
    })).toBe(EMPTY);
    expect(fn(() => {})).toBe(EMPTY);
    expect(fn(/\s/)).toBe(EMPTY);
    expect(fn(Date.now())).toBe(EMPTY);
  });
});
describe("safeReplaceIn", () => {
  const fn = _strFn.safeReplaceIn;
  test("should replace in str from-token to to-token", () => {
    expect(fn("a b a", "a", "1")).toBe("1 b a");
    expect(fn("a b a", "b", "2")).toBe("a 2 a");
    expect(fn("a b a", "d", "2")).toBe("a b a");
  });
  test("should return empty str in edge cases", () => {
    expect(fn(null, "a", "b")).toBe("");
    expect(fn(void 0, "a", "b")).toBe("");
    expect(fn(true, "a", "b")).toBe("");
    expect(fn(1, "a", "b")).toBe("");
    expect(fn({}, "a", "b")).toBe("");
  });
});
//# sourceMappingURL=strFn.test.js.map