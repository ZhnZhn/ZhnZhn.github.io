'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _fnArr = require('../fnArr');

var _fnArr2 = _interopRequireDefault(_fnArr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findIndexByProp = _fnArr2.default.findIndexByProp,
    isSameByProp = _fnArr2.default.isSameByProp,
    isStrInArr = _fnArr2.default.isStrInArr;


var propName = 'caption',
    propValue1 = 'caption1',
    propValue2 = 'caption2',
    arr = [(0, _defineProperty3.default)({}, propName, propValue1), (0, _defineProperty3.default)({}, propName, propValue2)];

describe('findIndexByProp', function () {
   var fn = findIndexByProp(propName);

   test('should return function', function () {
      expect(typeof fn === 'undefined' ? 'undefined' : (0, _typeof3.default)(fn)).toBe('function');
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
      expect(typeof fn === 'undefined' ? 'undefined' : (0, _typeof3.default)(fn)).toBe('function');
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

describe('isStrInArr', function () {
   var arr = ['test1', 'test2', 'test3'],
       fnTrue = isStrInArr('test1'),
       fnFalse = isStrInArr('test4');

   test('should return function', function () {
      expect(typeof fnTrue === 'undefined' ? 'undefined' : (0, _typeof3.default)(fnTrue)).toBe('function');
      expect(typeof fnFalse === 'undefined' ? 'undefined' : (0, _typeof3.default)(fnFalse)).toBe('function');
   });
   test('should return bool is str in array', function () {
      expect(fnTrue(arr)).toBe(true);
      expect(fnFalse(arr)).toBe(false);
   });
   test('should return false in edge case', function () {
      expect(fnTrue({})).toBe(false);
      expect(fnFalse('')).toBe(false);
   });
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\__tests__\fnArr.test.js.map