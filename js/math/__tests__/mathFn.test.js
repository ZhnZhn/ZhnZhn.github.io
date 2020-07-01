"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("../mathFn"));

var _Type = require("../../constants/Type");

var roundBy = _mathFn["default"].roundBy,
    calcPercent = _mathFn["default"].calcPercent,
    crValueMoving = _mathFn["default"].crValueMoving,
    toFixed = _mathFn["default"].toFixed,
    toFixedNumber = _mathFn["default"].toFixedNumber;
var PERCENT_0 = '0.00%';
var PERCENT_100 = '100.00%';

var _crVmInputs = function _crVmInputs(nowValue, prevValue) {
  return {
    nowValue: nowValue,
    prevValue: prevValue,
    Direction: _Type.Direction
  };
};

describe('roundBy', function () {
  var fn = roundBy;
  test('should return rounded number from string or number by', function () {
    expect(fn(1.555, 2)).toBe(1.56);
    expect(fn('1.555', 2)).toBe(1.56);
    expect(fn(1.005, 2)).toBe(1.01);
    expect(fn('1.005', 2)).toBe(1.01);
    expect(fn(0)).toBe(0);
  });
  test('shoul return null for null or undefined', function () {
    expect(fn(null)).toBe(null);
    expect(fn()).toBe(null);
  });
});
describe('calcPercent', function () {
  var fn = calcPercent;
  test('should return str percent with Fixed 2 from Big values', function () {
    var r = fn({
      bValue: (0, _big["default"])(10),
      bTotal: (0, _big["default"])(100)
    });
    expect(r).toBe('10.00');
  });
  test('should return str percent with Fixed 2 from number values', function () {
    var r = fn({
      bValue: 10,
      bTotal: 100
    });
    expect(r).toBe('10.00');
  });
  test('should use bValue 0 in case undefined', function () {
    var r = fn({
      bTotal: (0, _big["default"])(100)
    });
    expect(r).toBe('0.00');
  });
  test('should use bTotal 0 in case undefined', function () {
    var r = fn({
      bValue: (0, _big["default"])(10)
    });
    expect(r).toBe('0.00');
  });
  test('should return str 0.00 in case bValue NaN', function () {
    var r = fn({
      bValue: NaN,
      bTotal: (0, _big["default"])(100)
    });
    expect(r).toBe('0.00');
  });
});
describe('crValueMoving', function () {
  var fn = crValueMoving;
  test('should return correct obj for Big values', function () {
    var r = fn(_crVmInputs((0, _big["default"])('200.02'), (0, _big["default"])('100.01')));
    expect(r.value).toBe('200.02');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should return correct obj for strings values with radix', function () {
    var r = fn(_crVmInputs('200.02', '100.01'));
    expect(r.value).toBe('200.02');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should use dfR for rounding', function () {
    var r = fn((0, _extends2["default"])({}, _crVmInputs('200.023333', '100.01333'), {
      dfR: 2
    }));
    expect(r.value).toBe('200.02');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should use fnFormat for output', function () {
    var r = fn((0, _extends2["default"])({}, _crVmInputs('200.02', '100.01'), {
      fnFormat: function fnFormat(value) {
        return value + ';';
      }
    }));
    expect(r.value).toBe('200.02;');
    expect(r.delta).toBe('100.01;');
  });
  test('should use Direction for output', function () {
    var _Direction = {
      UP: 'UPPP'
    };
    var r = fn((0, _extends2["default"])({}, _crVmInputs('200.02', '100.01'), {
      Direction: _Direction
    }));
    expect(r.direction).toBe(_Direction.UP);
  });
  test('should use df Direction as {} for output', function () {
    var r = fn((0, _extends2["default"])({}, _crVmInputs('200.02', '100.01'), {
      Direction: void 0
    }));
    expect(r.direction).toBe(undefined);
  });
  test('should return correct obj for strings values with nowValue="0"', function () {
    var r = fn(_crVmInputs('0', '100'));
    expect(r.value).toBe('0');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100');
    expect(r.direction).toBe(_Type.Direction.DOWN);
  });
  test('should return correct obj for equal strings values', function () {
    var r = fn(_crVmInputs('100', '100'));
    expect(r.value).toBe('100');
    expect(r.percent).toBe(PERCENT_0);
    expect(r.delta).toBe('0');
    expect(r.direction).toBe(_Type.Direction.EQUAL);
  });
  test('should replace blanks in string values', function () {
    var r = fn(_crVmInputs('200 000 000', '100 000 000'));
    expect(r.value).toBe('200000000');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100000000');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should replace several blanks in string values', function () {
    var r = fn(_crVmInputs('200  000  000', '100  000  000'));
    expect(r.value).toBe('200000000');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100000000');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should to fixed to radix 0 value and round delta in case value or delta bigger 1 000 000', function () {
    var r = fn(_crVmInputs('200 000 000.02', '100 000 000.01'));
    expect(r.value).toBe('200000000');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100000000');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should use 0 values in edge cases', function () {
    var r = fn({
      Direction: _Type.Direction
    });
    expect(r.value).toBe('0');
    expect(r.percent).toBe(PERCENT_0);
    expect(r.delta).toBe('0');
    expect(r.direction).toBe(_Type.Direction.EQUAL);
  });
});
describe('toFixed', function () {
  var fn = toFixed;
  test('should return fixed by 0 number for values > 10', function () {
    expect(fn(102.34)).toBe(102);
    expect(fn('102.34')).toBe(102);
    expect(fn(10.234)).toBe(10);
    expect(fn('10.234')).toBe(10);
  });
  test('should return fixed by 2 number for values =< 10', function () {
    expect(fn(1.234)).toBe(1.23);
    expect(fn('1.234')).toBe(1.23);
    expect(fn(0.1234)).toBe(0.12);
    expect(fn('0.1234')).toBe(0.12);
    expect(fn(0.01234)).toBe(0.01);
    expect(fn('0.01234')).toBe(0.01);
  });
});
describe('toFixedNumber', function () {
  var fn = toFixedNumber;
  test('should return number rounded depend of value', function () {
    expect(fn(9.00005)).toBe(9.0001);
    expect(fn(9000.005)).toBe(9000.01);
    expect(fn(10000.005)).toBe(10000);
  });
  test('should retun same value in case not number', function () {
    expect(fn(NaN)).toBe(NaN);
    expect(fn()).toBe(undefined);
    expect(fn(null)).toBe(null);
  });
});
//# sourceMappingURL=mathFn.test.js.map