'use strict';

var _DateUtils = require('../DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isYmd = _DateUtils2.default.isYmd,
    isYmdOrEmpty = _DateUtils2.default.isYmdOrEmpty,
    dmyToUTC = _DateUtils2.default.dmyToUTC,
    formatTo = _DateUtils2.default.formatTo,
    isDmy = _DateUtils2.default.isDmy,
    getUTCTime = _DateUtils2.default.getUTCTime;


describe('isYmd YYYY-MM-DD', function () {
  var fn = isYmd;

  test('should return true for valid YYYY-MM-DD', function () {
    expect(fn("2010-01-10")).toBe(true);
    expect(fn("2010-10-01")).toBe(true);
  });
  test('should return false for not valid YYYY-MM-DD', function () {
    expect(fn("2010-14-01")).toBe(false);
    expect(fn("2010-02-32")).toBe(false);
  });
  test('min valid value is 1999-01-01', function () {
    expect(fn('1999-01-01')).toBe(true);
    expect(fn('1998-12-30')).toBe(false);
  });
  test('should year be not future', function () {
    expect(fn('2030-01-01')).toBe(false);

    expect(fn('2030-01-01', 1)).toBe(false);
    expect(fn('2030-01-01', 2)).toBe(false);
    expect(fn('2030-01-01', 3)).toBe(false);
    expect(fn('2030-01-01', 20)).toBe(true);
  });
  test('should return false in edge case', function () {
    expect(fn('')).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(undefined)).toBe(false);
  });
});

describe('isYmdOrEmty YYYY-MM-DD', function () {
  var fn = isYmdOrEmpty;
  test('should return is valid date or empty', function () {
    expect(fn('')).toBe(true);
    expect(fn("2010-01-10")).toBe(true);
    expect(fn("2010-10-01")).toBe(true);

    expect(fn(null)).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn(function () {})).toBe(false);
    expect(fn("2010-20-20")).toBe(false);
    expect(fn("2010-40-40")).toBe(false);
  });
});

describe('dmyToUTC', function () {
  var fn = dmyToUTC;
  test('should return UTC from DD-MM-YYYY', function () {
    expect(fn("10-10-2010")).toBe(Date.UTC(2010, 9, 10));
    expect(fn("01-01-2010")).toBe(Date.UTC(2010, 0, 1));
  });
  test('should return 0 in edge case', function () {
    expect(fn("20-20-2010")).toBe(0);
    expect(fn("")).toBe(0);
    expect(fn(null)).toBe(0);
    expect(fn(undefined)).toBe(0);
  });
});

describe('formatTo', function () {
  var fn = formatTo;
  var EMPTY = '';
  test('should format to DD-MM-YYYY from ms', function () {
    expect(fn(1514764800000)).toBe('01-01-2018');
    expect(fn(1515542400000)).toBe('10-01-2018');
    expect(fn(1538352000000)).toBe('01-10-2018');
  });
  test('should format to empty string in edge case', function () {
    expect(fn(null)).toBe(EMPTY);
    expect(fn(undefined)).toBe(EMPTY);
    expect(fn({})).toBe(EMPTY);
    expect(fn(NaN)).toBe(EMPTY);
    expect(fn('')).toBe(EMPTY);
    expect(fn('abc')).toBe(EMPTY);
    expect(fn(function () {})).toBe(EMPTY);
  });
});

describe('isDmy', function () {
  var fn = isDmy;
  test('should return true for str in format DD-MM-YYY', function () {
    expect(fn('10-10-2000')).toBe(true);
    expect(fn('20-01-2000')).toBe(true);
    expect(fn('01-12-2000')).toBe(true);
  });
  test('should return false for str not in format DD-MM-YYYY', function () {
    expect(fn('10-14-2000')).toBe(false);
    expect(fn('20-1-2000')).toBe(false);
    expect(fn('2000-12-01')).toBe(false);
  });
  test('should return false in edge cases', function () {
    expect(fn(null)).toBe(false);
    expect(fn()).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn(function () {})).toBe(false);
    expect(fn(fn)).toBe(false);
  });
});

describe('getUTCTime', function () {
  var fn = getUTCTime;
  test('should return correct str from ms', function () {
    expect(fn(1547205009808)).toBe('11:10');
    expect(fn(1547204900008)).toBe('11:08');
  });
  test('should return empty string in edge case', function () {
    expect(fn(undefined)).toBe('');
    expect(fn(null)).toBe('');
    expect(fn('str')).toBe('');
    expect(fn(NaN)).toBe('');
    expect(fn({})).toBe('');
  });
});
//# sourceMappingURL=DateUtils.test.js.map