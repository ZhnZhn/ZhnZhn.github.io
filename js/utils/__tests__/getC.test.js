"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getC = _interopRequireDefault(require("../getC"));

describe('getC', function () {
  var fn = _getC["default"];
  test('should return string item caption', function () {
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
  test('should return string item caption by item short prop name c', function () {
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
//# sourceMappingURL=getC.test.js.map