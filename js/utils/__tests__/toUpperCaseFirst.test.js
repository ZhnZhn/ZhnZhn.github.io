"use strict";

var _toUpperCaseFirst = require("../toUpperCaseFirst");
describe('toUpperCaseFirst', () => {
  const fn = _toUpperCaseFirst.toUpperCaseFirst;
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
//# sourceMappingURL=toUpperCaseFirst.test.js.map