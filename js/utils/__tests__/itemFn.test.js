"use strict";

var _itemFn = require("../itemFn");
describe('getCaption', () => {
  const fn = _itemFn.getCaption;
  test('should return string as caption of item', () => {
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
  test('should return string as caption of item by item short prop name c', () => {
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
describe('getValue', () => {
  const fn = _itemFn.getValue;
  test('should return string as value of item', () => {
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
  test('should return string as value of item by item short prop name v', () => {
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
  test('should return option dfValue or empty str in case value null or undefined', () => {
    expect(fn({
      value: void 0
    }, 'dfValue')).toBe('dfValue');
    expect(fn({
      v: void 0
    }, 0)).toBe('0');
    expect(fn({
      value: null
    }, '')).toBe('');
    expect(fn({
      v: null
    }, 'dfStr')).toBe('dfStr');
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
    expect(fn({})).toBe('');
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
  });
});
describe('getValueUpperCase', () => {
  const fn = _itemFn.getValueUpperCase;
  test('should return string upperCase in case isUpper option', () => {
    expect(fn({
      value: 'Abc'
    })).toBe('ABC');
    expect(fn({
      value: '0'
    })).toBe('0');
    expect(fn({
      value: 0
    })).toBe('0');
  });
  test('should retun empty string for edge case', () => {
    expect(fn({})).toBe('');
    expect(fn(void 0)).toBe('');
    expect(fn(null)).toBe('');
  });
});
describe('getValueAndCaption', () => {
  const fn = _itemFn.getValueAndCaption;
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
      c: 'Abc (A)'
    }, 'Df Value')).toEqual(['Df Value', 'Abc (A)']);
  });
  test('shold return array with two empty strings in edge cases', () => {
    expect(fn({})).toEqual(['', '']);
    expect(fn(null)).toEqual(['', '']);
    expect(fn(void 0)).toEqual(['', '']);
  });
});
//# sourceMappingURL=itemFn.test.js.map