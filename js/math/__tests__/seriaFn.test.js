'use strict';

var _seriaFn = require('../seriaFn');

var _seriaFn2 = _interopRequireDefault(_seriaFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var growthRate = _seriaFn2.default.growthRate;


var _crInArr = function _crInArr(arr) {
  return arr.map(function (v, i) {
    return { x: i + 1, y: v };
  });
};
var _crOutArr = function _crOutArr(arr) {
  return arr.map(function (v, i) {
    return { x: i + 2, y: v };
  });
};

describe('calc seria growRate', function () {
  var fn = growthRate;
  test('should return empty arr on empty args', function () {
    expect(fn()).toEqual([]);
  });
  test('should return empty arr on empty arr', function () {
    expect(fn([])).toEqual([]);
  });
  test('should return empty arr on only one point', function () {
    expect(fn([{ x: 1, y: 1 }])).toEqual([]);
  });
  test('should return empty arr on not arr args', function () {
    expect(fn('')).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn(4.5)).toEqual([]);
    expect(fn(function () {})).toEqual([]);
  });

  test('should calc growthRate by 0, 0', function () {
    var _dIn = _crInArr([1.0001, 1.0001, 1.0001]),
        _dOut = _crOutArr([0, 0]),
        _dR = fn(_dIn);
    _dR.forEach(function (p, i) {
      expect(p).toEqual(_dOut[i]);
    });
  });

  test('should calc growthRate by 100, 50', function () {
    var _dIn = _crInArr([1.00001, 2.00002, 3.00003]),
        _dOut = _crOutArr([100, 50]),
        _dR = fn(_dIn);
    _dR.forEach(function (p, i) {
      expect(p).toEqual(_dOut[i]);
    });
  });

  test('should calc growthRate with presicion of 2 digits by -33.33, -49.75', function () {
    var _dIn = _crInArr([3.00003, 2.00002, 1.005]),
        _dOut = _crOutArr([-33.33, -49.75]),
        _dR = fn(_dIn);
    _dR.forEach(function (p, i) {
      expect(p).toEqual(_dOut[i]);
    });
  });
  test('should calc growthRate with presicion of 2 digits by 0.01, 0', function () {
    var _dIn = _crInArr([100, 100.01, 100.011]),
        _dOut = _crOutArr([0.01, 0]),
        _dR = fn(_dIn);
    _dR.forEach(function (p, i) {
      expect(p).toEqual(_dOut[i]);
    });
  });

  test('should fill to null for zero old values', function () {
    var _dIn = _crInArr([0, 0, 1, 1]),
        _dOut = _crOutArr([null, null, 0]),
        _dR = fn(_dIn);
    _dR.forEach(function (p, i) {
      expect(p).toEqual(_dOut[i]);
    });
  });
});
//# sourceMappingURL=seriaFn.test.js.map