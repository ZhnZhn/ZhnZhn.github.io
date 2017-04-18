'use strict';

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _mathFn = require('../mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('calcPercent', function () {
  var fn = _mathFn2.default.calcPercent;
  test('should return str percent with Fixed 2 from Big values', function () {
    var r = fn({ bValue: (0, _big2.default)(10), bTotal: (0, _big2.default)(100) });
    expect(r).toBe('10.00');
  });
});

describe('crValueMoving', function () {
  var fn = _mathFn2.default.crValueMoving;
  test('should return correct obj for strings values', function () {
    var r = fn({ nowValue: '200.02', prevValue: '100.01', Direction: _Type.Direction });

    expect(r.value).toBe('200.02');
    expect(r.percent).toBe('100.00%');
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });
  test('should return correct obj for Big values', function () {
    var r = fn({ nowValue: (0, _big2.default)('200.02'), prevValue: (0, _big2.default)('100.01'), Direction: _Type.Direction });

    expect(r.value).toBe('200.02');
    expect(r.percent).toBe('100.00%');
    expect(r.delta).toBe('100.01');
    expect(r.direction).toBe(_Type.Direction.UP);
  });

  test('should return correct obj for strings values', function () {
    var r = fn({ nowValue: '0', prevValue: '100', Direction: _Type.Direction });

    expect(r.value).toBe('0');
    expect(r.percent).toBe('100.00%');
    expect(r.delta).toBe('100');
    expect(r.direction).toBe(_Type.Direction.DOWN);
  });
  test('should return correct obj for strings values', function () {
    var r = fn({ nowValue: '100', prevValue: '100', Direction: _Type.Direction });

    expect(r.value).toBe('100');
    expect(r.percent).toBe('0.00%');
    expect(r.delta).toBe('0');
    expect(r.direction).toBe(_Type.Direction.EQUAL);
  });

  test('should use 0 values in edge cases', function () {
    var r = fn({ Direction: _Type.Direction });

    expect(r.value).toBe('0');
    expect(r.percent).toBe('0.00%');
    expect(r.delta).toBe('0');
    expect(r.direction).toBe(_Type.Direction.EQUAL);
  });
});

describe('toFixed', function () {
  var fn = _mathFn2.default.toFixed;
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\math\__tests__\mathFn.test.js.map