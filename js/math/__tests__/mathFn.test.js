'use strict';

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _mathFn = require('../mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcPercent = _mathFn2.default.calcPercent,
    crValueMoving = _mathFn2.default.crValueMoving,
    toFixed = _mathFn2.default.toFixed;


var PERCENT_0 = '0.00%';
var PERCENT_100 = '100.00%';

var _fValueMoving = function _fValueMoving(nowValue, prevValue) {
  return {
    nowValue: nowValue, prevValue: prevValue, Direction: _Type.Direction
  };
};

describe('calcPercent', function () {
  var fn = calcPercent;
  test('should return str percent with Fixed 2 from Big values', function () {
    var r = fn({ bValue: (0, _big2.default)(10), bTotal: (0, _big2.default)(100) });
    expect(r).toBe('10.00');
  });
});

describe('crValueMoving', function () {
  var fn = crValueMoving;
  test('should return correct obj for Big values', function () {
    var r = fn(_fValueMoving((0, _big2.default)('200.02'), (0, _big2.default)('100.01')));

    expect(r.value).toBe('200.02');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should return correct obj for strings values with radix', function () {
    var r = fn(_fValueMoving('200.02', '100.01'));

    expect(r.value).toBe('200.02');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should return correct obj for strings values with nowValue="0"', function () {
    var r = fn(_fValueMoving('0', '100'));

    expect(r.value).toBe('0');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100');
    expect(r.direction).toBe(_Type.Direction.DOWN);
  });
  test('should return correct obj for equal strings values', function () {
    var r = fn(_fValueMoving('100', '100'));

    expect(r.value).toBe('100');
    expect(r.percent).toBe(PERCENT_0);
    expect(r.delta).toBe('0');
    expect(r.direction).toBe(_Type.Direction.EQUAL);
  });

  test('should replace blanks in string values', function () {
    var r = fn(_fValueMoving('200 000 000', '100 000 000'));

    expect(r.value).toBe('200000000');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100000000');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should replace several blanks in string values', function () {
    var r = fn(_fValueMoving('200  000  000', '100  000  000'));

    expect(r.value).toBe('200000000');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100000000');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should to fixed to radix 0 value in case value bigger 1 000 000', function () {
    var r = fn(_fValueMoving('200 000 000.02', '100 000 000.01'));

    expect(r.value).toBe('200000000');
    expect(r.percent).toBe(PERCENT_100);
    expect(r.delta).toBe('100000000');
    expect(r.direction).toBe(_Type.Direction.UP);
  });

  test('should use 0 values in edge cases', function () {
    var r = fn({ Direction: _Type.Direction });

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
//# sourceMappingURL=mathFn.test.js.map