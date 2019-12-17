"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _safeGet = _interopRequireDefault(require("../safeGet"));

//const safeGet = require('../safeGet').default
test('should get prop name', function () {
  var obj = {
    a: 1
  };
  expect((0, _safeGet["default"])(obj, 'a')).toBe(obj.a);
});
test('should get undefined from string for propName', function () {
  expect((0, _safeGet["default"])('str', 'a')).toBe(undefined);
});
test('should get undefined from falsy', function () {
  expect((0, _safeGet["default"])(null, 'a')).toBe(undefined);
  expect((0, _safeGet["default"])(undefined, 'a')).toBe(undefined);
  expect((0, _safeGet["default"])('', 'a')).toBe(undefined);
  expect((0, _safeGet["default"])(false, 'a')).toBe(undefined);
  expect((0, _safeGet["default"])(0, 'a')).toBe(undefined);
  expect((0, _safeGet["default"])(NaN, 'a')).toBe(undefined);
});
test('should get default from falsy with default', function () {
  var df = {
    a: 1
  };
  expect((0, _safeGet["default"])(null, 'a', df)).toBe(df);
  expect((0, _safeGet["default"])(undefined, 'a', df)).toBe(df);
  expect((0, _safeGet["default"])('', 'a', df)).toBe(df);
  expect((0, _safeGet["default"])(false, 'a', df)).toBe(df);
  expect((0, _safeGet["default"])(0, 'a', df)).toBe(df);
  expect((0, _safeGet["default"])(NaN, 'a', df)).toBe(df);
});
test('should get obj form array by index', function () {
  var arr = ['a', 'b', 'c'];
  expect((0, _safeGet["default"])(arr, '[0]')).toBe(arr[0]);
  expect((0, _safeGet["default"])(arr, '[1]')).toBe(arr[1]);
  expect((0, _safeGet["default"])(arr, '[3]')).toBe(undefined);
});
//# sourceMappingURL=safeGet.test.js.map