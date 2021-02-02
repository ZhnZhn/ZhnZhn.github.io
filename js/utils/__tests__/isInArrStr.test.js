"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _isInArrStr = _interopRequireDefault(require("../isInArrStr"));

describe('isInArrStr', function () {
  var arr = ['test1', 'test2', 'test3'],
      isTest = (0, _isInArrStr["default"])(arr);
  test('should return function', function () {
    expect(typeof isTest).toBe('function');
  });
  test('should return true if str in array', function () {
    expect(isTest('test1')).toBe(true);
    expect(isTest('test3')).toBe(true);
  });
  test('should return false if str not in array', function () {
    expect(isTest('test5')).toBe(false);
    expect(isTest('7')).toBe(false);
  });
  test('should return false in edge case', function () {
    var _isTest1 = (0, _isInArrStr["default"])(),
        _isTest2 = (0, _isInArrStr["default"])({});

    expect(_isTest1('test1')).toBe(false);
    expect(_isTest2('test1')).toBe(false);
  });
});
//# sourceMappingURL=isInArrStr.test.js.map