"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _seriaHelperFn = _interopRequireDefault(require("../seriaHelperFn"));

var isNotEmptyArr = _seriaHelperFn["default"].isNotEmptyArr,
    isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter,
    fGetY = _seriaHelperFn["default"].fGetY,
    getZeroCountFromStart = _seriaHelperFn["default"].getZeroCountFromStart,
    getZeroIndexFromEnd = _seriaHelperFn["default"].getZeroIndexFromEnd;
describe("isNotEmptyArr", function () {
  var fn = isNotEmptyArr;
  test('should return true for arr with object', function () {
    expect(fn([{}])).toBe(true);
    expect(fn([[]])).toBe(true);
  });
  test('should return false for not arr and arr without object', function () {
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(function () {})).toBe(false);
    expect(fn('str')).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn(true)).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn([null, void 0, 'str', 1, true])).toBe(false);
  });
});
describe("isNumber", function () {
  var fn = isNumber;
  test("should check is value number type", function () {
    expect(fn(0.1)).toBe(true);
    expect(fn(0)).toBe(true);
    expect(fn(-0)).toBe(true);
    expect(fn(+0)).toBe(true);
    expect(fn(NaN)).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(undefined)).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn({})).toBe(false);
  });
});
describe("crPointGetter", function () {
  var fn = crPointGetter;
  test("should create getter for array points", function () {
    var _data = [[0, 0], [1, 1]];

    var _fn = fn(_data),
        getX = _fn.getX,
        getY = _fn.getY;

    expect(getX(_data[0])).toBe(0);
    expect(getY(_data[0])).toBe(0);
    expect(getX(_data[1])).toBe(1);
    expect(getY(_data[1])).toBe(1);
  });
  test("should create getter for object points", function () {
    var _data = [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 1
    }];

    var _fn2 = fn(_data),
        getX = _fn2.getX,
        getY = _fn2.getY;

    expect(getX(_data[0])).toBe(0);
    expect(getY(_data[0])).toBe(0);
    expect(getX(_data[1])).toBe(1);
    expect(getY(_data[1])).toBe(1);
  });
});
describe("fGetY", function () {
  var fn = fGetY;
  test("should return function for getting y for arr point", function () {
    var point = [1, 2],
        getY = fn(point);
    expect(typeof getY).toBe('function');
    expect(getY(point)).toBe(point[1]);
  });
  test("should return function for getting y for obj point", function () {
    var point = {
      y: 2
    },
        getY = fn(point);
    expect(typeof getY).toBe('function');
    expect(getY(point)).toBe(point.y);
  });
  test('should return undefined for edge case', function () {
    expect(fn(null)).toBe(undefined);
    expect(fn({})).toBe(undefined);
  });
});
describe('getZeroCountFromStart', function () {
  var fn = getZeroCountFromStart;
  test('should return number of points with y 0 or null from data start', function () {
    var dataArr = [[1, 0], [2, null]];
    expect(fn(dataArr, fGetY(dataArr[0]))).toBe(2);
    var dataArr2 = [[1, 0], [2, null], [-1, 1]];
    expect(fn(dataArr2, fGetY(dataArr2[0]))).toBe(2);
    var dataObj = [{
      x: 1,
      y: 0
    }, {
      x: 2,
      y: null
    }];
    expect(fn(dataObj, fGetY(dataObj[0]))).toBe(2);
  });
});
describe('getZeroIndexFromEnd', function () {
  var fn = getZeroIndexFromEnd;
  test('should return index of last y 0 or null from data end', function () {
    var dataArr = [[-1, -1], [1, 0], [2, null]];
    expect(fn(dataArr, fGetY(dataArr[0]))).toBe(1);
    var dataObj = [{
      x: -1,
      y: -1
    }, {
      x: 1,
      y: 0
    }, {
      x: 2,
      y: null
    }];
    expect(fn(dataObj, fGetY(dataObj[0]))).toBe(1);
  });
});
//# sourceMappingURL=seriaHelperFn.test.js.map