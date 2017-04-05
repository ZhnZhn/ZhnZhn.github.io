'use strict';

var _safeGet = require('../safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('should get prop name', function () {
  var obj = { a: 1 };
  expect((0, _safeGet2.default)(obj, 'a')).toBe(obj.a);
}); //const safeGet = require('../safeGet').default


test('should get undefined from string for propName', function () {
  expect((0, _safeGet2.default)('str', 'a')).toBe(undefined);
});

test('should get undefined from falsy', function () {
  expect((0, _safeGet2.default)(null, 'a')).toBe(undefined);
  expect((0, _safeGet2.default)(undefined, 'a')).toBe(undefined);
  expect((0, _safeGet2.default)('', 'a')).toBe(undefined);
  expect((0, _safeGet2.default)(false, 'a')).toBe(undefined);
  expect((0, _safeGet2.default)(0, 'a')).toBe(undefined);
  expect((0, _safeGet2.default)(NaN, 'a')).toBe(undefined);
});

test('should get default from falsy with default', function () {
  var df = { a: 1 };
  expect((0, _safeGet2.default)(null, 'a', df)).toBe(df);
  expect((0, _safeGet2.default)(undefined, 'a', df)).toBe(df);
  expect((0, _safeGet2.default)('', 'a', df)).toBe(df);
  expect((0, _safeGet2.default)(false, 'a', df)).toBe(df);
  expect((0, _safeGet2.default)(0, 'a', df)).toBe(df);
  expect((0, _safeGet2.default)(NaN, 'a', df)).toBe(df);
});

test('should get obj form array by index', function () {
  var arr = ['a', 'b', 'c'];
  expect((0, _safeGet2.default)(arr, '[0]')).toBe(arr[0]);
  expect((0, _safeGet2.default)(arr, '[1]')).toBe(arr[1]);
  expect((0, _safeGet2.default)(arr, '[3]')).toBe(undefined);
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\__tests__\safeGet.test.js.map