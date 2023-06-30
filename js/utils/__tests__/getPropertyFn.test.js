"use strict";

var _getPropertyFn = require("../getPropertyFn");
describe('getC', () => {
  const fn = _getPropertyFn.getC;
  test('should return string item caption', () => {
    expect(fn({
      caption: 'Abc'
    })).toBe('Abc');
    expect(fn({
      caption: '0'
    })).toBe('0');
    expect(fn({
      caption: 0
    })).toBe('0');
    expect(fn({})).toBe('');
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
  });
  test('should return string item caption by item short prop name c', () => {
    expect(fn({
      c: 'Abc'
    })).toBe('Abc');
    expect(fn({
      c: '0'
    })).toBe('0');
    expect(fn({
      c: 0
    })).toBe('0');
  });
});
describe('getV', () => {
  const fn = _getPropertyFn.getV;
  test('should return string item value', () => {
    expect(fn({
      value: 'Abc'
    })).toBe('Abc');
    expect(fn({
      value: '0'
    })).toBe('0');
    expect(fn({
      value: 0
    })).toBe('0');
  });
  test('should return string item value by item short prop name v', () => {
    expect(fn({
      v: 'Abc'
    })).toBe('Abc');
    expect(fn({
      v: '0'
    })).toBe('0');
    expect(fn({
      v: 0
    })).toBe('0');
  });
  test('should return string upperCase in case isUpper option', () => {
    const option = {
      isUpper: true
    };
    expect(fn({
      value: 'Abc'
    }, option)).toBe('ABC');
    expect(fn({
      value: '0'
    }, option)).toBe('0');
    expect(fn({
      value: 0
    }, option)).toBe('0');
  });
  test('should return option dfValue or empty str in case value null or undefined', () => {
    const option = {
      dfValue: 'dfValue'
    };
    expect(fn({
      value: void 0
    }, option)).toBe('dfValue');
    expect(fn({
      v: void 0
    }, option)).toBe('dfValue');
    expect(fn({
      value: null
    }, option)).toBe('dfValue');
    expect(fn({
      v: null
    }, option)).toBe('dfValue');
    expect(fn({
      value: void 0
    })).toBe('');
    expect(fn({
      v: void 0
    })).toBe('');
    expect(fn({
      value: null
    })).toBe('');
    expect(fn({
      v: null
    })).toBe('');
  });
  test('should retun empty string for edge case', () => {
    const option = {
      isUpper: true
    };
    expect(fn({})).toBe('');
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
    expect(fn({}, option)).toBe('');
    expect(fn(void 0, option)).toBe('');
    expect(fn(null, option)).toBe('');
  });
});
describe('getVc', () => {
  const fn = _getPropertyFn.getVc;
  test('should return array with value, caption from item, options', () => {
    expect(fn({
      v: 'abc',
      c: 'Abc (A)'
    })).toEqual(['abc', 'Abc (A)']);
    expect(fn({
      value: 0,
      caption: 'Abc (A)'
    })).toEqual(['0', 'Abc (A)']);
    expect(fn({
      v: 'abc',
      c: 'Abc (A)'
    }, {
      isUpper: true
    })).toEqual(['ABC', 'Abc (A)']);
    expect(fn({
      c: 'Abc (A)'
    }, {
      dfValue: 'Df Value'
    })).toEqual(['Df Value', 'Abc (A)']);
  });
  test('shold return array with two empty strings in edge cases', () => {
    expect(fn({})).toEqual(['', '']);
    expect(fn(null)).toEqual(['', '']);
    expect(fn(void 0)).toEqual(['', '']);
  });
});
//# sourceMappingURL=getPropertyFn.test.js.map