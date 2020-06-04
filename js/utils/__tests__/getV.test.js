"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getV = _interopRequireDefault(require("../getV"));

describe('getV', function () {
  var fn = _getV["default"];
  test('should return string item value', function () {
    expect(fn({
      value: 'Abc'
    })).toBe('Abc');
    expect(fn({
      value: '0'
    })).toBe('0');
    expect(fn({
      value: 0
    })).toBe('0');
    expect(fn({})).toBe('');
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
  });
  test('should return string item value by item short prop name v', function () {
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
  test('should return string upperCase in case isUpper option', function () {
    var option = {
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
    expect(fn({}, option)).toBe('');
    expect(fn(void 0, option)).toBe('');
    expect(fn(null, option)).toBe('');
  });
});
//# sourceMappingURL=getV.test.js.map