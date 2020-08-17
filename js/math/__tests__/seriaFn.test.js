"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _seriaFn = _interopRequireDefault(require("../seriaFn"));

var growthRate = _seriaFn["default"].growthRate,
    changesBetween = _seriaFn["default"].changesBetween,
    normalize = _seriaFn["default"].normalize,
    findMinY = _seriaFn["default"].findMinY,
    findMaxY = _seriaFn["default"].findMaxY,
    filterTrimZero = _seriaFn["default"].filterTrimZero,
    mean = _seriaFn["default"].mean,
    median = _seriaFn["default"].median;

var _crInArrOfObj = function _crInArrOfObj(arr) {
  return arr.map(function (v, i) {
    return {
      x: i + 1,
      y: v
    };
  });
};

var _crInArr = function _crInArr(arr) {
  return arr.map(function (v, i) {
    return [i + 1, v];
  });
};

var _crOutArr = function _crOutArr(arr) {
  return arr.map(function (v, i) {
    return [i + 2, v];
  });
};

var _testFn = function _testFn(fn, inputArr, resultArr) {
  var _dOut = _crOutArr(resultArr);

  expect(fn(_crInArrOfObj(inputArr))).toEqual(_dOut);
  expect(fn(_crInArr(inputArr))).toEqual(_dOut);
};

var _testRtParam = function _testRtParam(fn, rtNumber, inputArr, pointArr) {
  var _dIn = _crInArr(inputArr);

  expect(fn(_dIn, rtNumber)).toEqual([pointArr]);
  expect(fn(_dIn, '' + rtNumber)).toEqual([pointArr]);
};

describe('calc seria growRate', function () {
  var fn = growthRate;
  test('should return empty arr in edge case for unput data arr', function () {
    expect(fn()).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn('')).toEqual([]);
    expect(fn(4.5)).toEqual([]);
    expect(fn(function () {})).toEqual([]);
    expect(fn([{
      x: 1,
      y: 1
    }])).toEqual([]);
  });
  test('should calc growthRate by 0, 0', function () {
    _testFn(fn, [1.0001, 1.0001, 1.0001], [0, 0]);
  });
  test('should calc growthRate as null in case null value', function () {
    _testFn(fn, [1.0001, null, 1.0001], [null, null]);
  });
  test('should calc growthRate by 100, 50', function () {
    _testFn(fn, [1.00001, 2.00002, 3.00003], [100, 50]);
  });
  test('should calc growthRate with presicion of 2 digits by -33.33, -49.75', function () {
    _testFn(fn, [3.00003, 2.00002, 1.005], [-33.33, -49.75]);
  });
  test('should calc growthRate with presicion of 2 digits by 0.01, 0', function () {
    _testFn(fn, [100, 100.01, 100.011], [0.01, 0]);
  });
  test('should fill to null for zero old values', function () {
    _testFn(fn, [0, 0, 1, 1], [0, null, 0]);
  });
  test('should calc growth rate from 0 to values as 0, 100, -100 or null', function () {
    _testFn(fn, [0, 2, 0, 0, -3, 0], [null, -100, 0, null, 100]);
  });
  test('should use rt param as number & string', function () {
    _testRtParam(fn, 2, [1.0001, 1.0001, 1.0001], [3, 0]);

    _testRtParam(fn, 2, [100.0001, 200.0002, 300.0003], [3, 200]);
  });
});
describe('changesBetween', function () {
  var fn = changesBetween;
  test('should return arr with changes between', function () {
    _testFn(fn, [1.1, 2.2, 4.4], [1.1, 2.2]);

    _testFn(fn, [0.13, 0.14], [0.01]);

    _testFn(fn, [209.19, 208.7], [-0.49]);

    _testFn(fn, [1.1, null], [null]);

    _testFn(fn, [null, 2.2], [null]);
  });
  test('should use params rt as number & string', function () {
    _testRtParam(fn, 2, [1.1, 2.2, 4.4], [3, 3.3]);

    _testRtParam(fn, 2, [0.13, 2.2, 0.14], [3, 0.01]);

    _testRtParam(fn, 2, [209.19, 209, 208.7], [3, -0.49]);
  });
});
describe('normalize', function () {
  var fn = normalize;
  test('should return arr with normalize data', function () {
    var dataArr = [[1, 10], [2, 20]];
    expect(fn(dataArr)).toEqual([[1, 100], [2, 200]]);
    var dataObj = [{
      x: 1,
      y: 10
    }, {
      x: 2,
      y: 20
    }];
    expect(fn(dataObj)).toEqual([[1, 100], [2, 200]]);
  });
  test('should return [] in in edge case for data input', function () {
    expect(fn()).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn([])).toEqual([]);
    expect(fn([null])).toEqual([]);
    expect(fn([{
      y: 0
    }, {
      y: 1
    }])).toEqual([]);
  });
});
describe('findMinY', function () {
  var fn = findMinY;
  test('should return min y value from data', function () {
    expect(fn([{
      y: 0
    }, {
      y: 1
    }, {
      y: null
    }])).toBe(0);
    expect(fn([[1, 0], [2, 1], [3, null]])).toBe(0);
  });
  test('should return undefined in edge case for input data', function () {
    expect(fn()).toBe(undefined);
    expect(fn(null)).toBe(undefined);
    expect(fn({})).toBe(undefined);
    expect(fn([])).toBe(undefined);
  });
  test('should return undefined in edge case for input data values', function () {
    expect(fn([[1, NaN], [3, null]])).toBe(undefined);
  });
});
describe('findMaxY', function () {
  var fn = findMaxY;
  test('should return max y value from data', function () {
    expect(fn([{
      y: 0
    }, {
      y: 1
    }, {
      y: null
    }])).toBe(1);
    expect(fn([[1, 0], [2, 1], [3, null]])).toBe(1);
  });
  test('should return undefined in edge case for input data', function () {
    expect(fn()).toBe(undefined);
    expect(fn(null)).toBe(undefined);
    expect(fn({})).toBe(undefined);
    expect(fn([])).toBe(undefined);
  });
  test('should return undefined in edge case for input data values', function () {
    expect(fn([[1, NaN], [3, null]])).toBe(undefined);
  });
});
describe('filterTrimZero', function () {
  var fn = filterTrimZero;
  test('should trim points with 0 or null values', function () {
    var dataArr = [[1, 0], [2, 1], [3, null]];
    expect(fn(dataArr)).toEqual([[2, 1]]);
    var dataObj = [{
      y: 0
    }, {
      y: 1
    }, {
      y: null
    }];
    expect(fn(dataObj)).toEqual([{
      y: 1
    }]);
    var dataArr2 = [[1, 1], [2, 2], [3, 3]];
    expect(fn(dataArr2)).toEqual(dataArr2);
  });
  test('should return echo input in edge case for input', function () {
    expect(fn()).toBe(undefined);
    expect(fn(null)).toBe(null);
    expect(fn([])).toEqual([]);
  });
});
describe('mean', function () {
  var fn = mean;
  test('should return arr with two mean points from data', function () {
    expect(fn([[1, 1], [2, 1], [3, 1]])).toEqual([[1, 1], [3, 1]]);
  });
  test('should return arr with two mean points from data with null, NaN', function () {
    expect(fn([[1, null], [2, 3], [3, NaN]])).toEqual([[1, 3], [3, 3]]);
  });
  test('should return [] in edge case for input', function () {
    expect(fn()).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn([])).toEqual([]);
  });
});
describe('median', function () {
  var fn = median;
  test('should return arr with two median points from data', function () {
    expect(fn([[1, 1], [2, 2], [3, 3]])).toEqual([[1, 2], [3, 2]]);
    expect(fn([[1, 1], [2, 2], [3, 3], [4, 4]])).toEqual([[1, 3], [4, 3]]);
  });
  test('should return [] in edge case for input', function () {
    expect(fn()).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn([])).toEqual([]);
  });
});
//# sourceMappingURL=seriaFn.test.js.map