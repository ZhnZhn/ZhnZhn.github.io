'use strict';

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    toUpperCaseFirst = _AdapterFn2.default.toUpperCaseFirst;


var Y = [{ in: '2017', r: 1514678400000, d: '31-12-2017' }, { in: '2016', r: 1483142400000, d: '31-12-2016' }, { in: '2015', r: 1451520000000, d: '31-12-2015' }, { in: '2000', r: 978220800000, d: '31-12-2000' }];

//Date.UTC(y, m-1, d)
var YM = [{ in: '2017-12', r: 1514678400000, d: '31-12-2017' }, { in: '2017-11', r: 1512000000000, d: '30-11-2017' }, { in: '2017-10', r: 1509408000000, d: '31-10-2017' }, { in: '2017-9', r: 1506729600000, d: '30-09-2017' }, { in: '2017-09', r: 1506729600000, d: '30-09-2017' }, { in: '2017-8', r: 1504137600000, d: '31-08-2017' }, { in: '2017-08', r: 1504137600000, d: '31-08-2017' }, { in: '2017-1', r: 1485820800000, d: '31-01-2017' }, { in: '2017-01', r: 1485820800000, d: '31-01-2017' }];

var YMD = [{ in: '2018-01-01', r: 1514764800000, d: '01-01-2018' }, { in: '2018-1-01', r: 1514764800000, d: '01-01-2018' }, { in: '2018-1-1', r: 1514764800000, d: '01-01-2018' }, { in: '2018-01-01', r: 1514764800000, d: '01-01-2018' }];

describe('ymdToUTC', function () {
  var fn = ymdToUTC;
  test('should return UTC msc of 31, December of year from YYYY', function () {
    Y.forEach(function (d) {
      expect(fn(d.in)).toBe(d.r);
    });
  });

  test('should return UTC msc of last day of month from YYYY-MM', function () {
    YM.forEach(function (d) {
      expect(fn(d.in)).toBe(d.r);
    });
  });

  test('should return UTC msc of day (00:00:00 UTC) from YYYY-MM-DD', function () {
    YMD.forEach(function (d) {
      expect(fn(d.in)).toBe(d.r);
    });
  });
});

describe('toUpperCaseFirst', function () {
  var fn = toUpperCaseFirst;
  var EMPTY = '';
  test('should return string with first upper case letter for string or String input', function () {
    expect(fn('abc')).toBe('Abc');
    expect(fn('aBc')).toBe('ABc');
    expect(fn('aBC')).toBe('ABC');

    expect(fn(new String('abc'))).toBe('Abc');
    expect(fn(new String('aBc'))).toBe('ABc');
    expect(fn(new String('aBC'))).toBe('ABC');
  });
  test('should return empty string in edge case', function () {
    expect(fn('')).toBe(EMPTY);
    expect(fn(undefined)).toBe(EMPTY);
    expect(fn(null)).toBe(EMPTY);
    expect(fn({})).toBe(EMPTY);
    expect(fn([])).toBe(EMPTY);

    expect(fn({ str: 'abc' })).toBe(EMPTY);
    expect(fn(function () {})).toBe(EMPTY);
    expect(fn(/\s/)).toBe(EMPTY);
    expect(fn(Date.now())).toBe(EMPTY);
  });
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\__test__\AdapterFn.test.js.map