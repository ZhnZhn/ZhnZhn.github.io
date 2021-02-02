"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fnArr = _interopRequireDefault(require("../fnArr"));

var _ref, _ref2;

var findIndexByProp = _fnArr["default"].findIndexByProp,
    isSameByProp = _fnArr["default"].isSameByProp;
var propName = 'caption',
    propValue1 = 'caption1',
    propValue2 = 'caption2',
    arr = [(_ref = {}, _ref[propName] = propValue1, _ref), (_ref2 = {}, _ref2[propName] = propValue2, _ref2)];
describe('findIndexByProp', function () {
  var fn = findIndexByProp(propName);
  test('should return function', function () {
    expect(typeof fn).toBe('function');
  });
  test('should return index by prop', function () {
    expect(fn(arr, propValue1)).toBe(0);
    expect(fn(arr, propValue2)).toBe(1);
  });
  test('should return -1 in edge cases', function () {
    var fnEdgeCase = findIndexByProp('notexist');
    expect(fn(arr, 'notexist')).toBe(-1);
    expect(fnEdgeCase(arr, propValue1)).toBe(-1);
    expect(fnEdgeCase({}, propValue1)).toBe(-1);
  });
});
describe('isSameByProp', function () {
  var fn = isSameByProp(propName);
  test('should return function', function () {
    expect(typeof fn).toBe('function');
  });
  test('should return is same by prop', function () {
    expect(fn(arr, propValue1)).toBe(true);
    expect(fn(arr, propValue2)).toBe(true);
    expect(fn(arr, 'notexist')).toBe(false);
  });
  test('should return false in edge cases', function () {
    var fnEdgeCase = isSameByProp('notexist');
    expect(fn(arr, 'notexist')).toBe(false);
    expect(fnEdgeCase(arr, propValue1)).toBe(false);
    expect(fnEdgeCase({}, propValue1)).toBe(false);
  });
});
//# sourceMappingURL=fnArr.test.js.map