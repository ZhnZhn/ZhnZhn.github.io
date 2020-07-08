"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _DateUtils = _interopRequireDefault(require("../DateUtils"));

var _DateUtilsWithMock = _interopRequireDefault(require("./DateUtilsWithMock"));

var isYmd = _DateUtils["default"].isYmd,
    isYmdOrEmpty = _DateUtils["default"].isYmdOrEmpty,
    isDmyPeriod = _DateUtils["default"].isDmyPeriod,
    dmyToUTC = _DateUtils["default"].dmyToUTC,
    ymdToUTC = _DateUtils["default"].ymdToUTC,
    ymdhmsToUTC = _DateUtils["default"].ymdhmsToUTC,
    mlsToDmy = _DateUtils["default"].mlsToDmy,
    isDmy = _DateUtils["default"].isDmy,
    getUTCTime = _DateUtils["default"].getUTCTime,
    addToDmy = _DateUtils["default"].addToDmy,
    getYTDfromDmy = _DateUtils["default"].getYTDfromDmy,
    monthIndex = _DateUtils["default"].monthIndex; // DateUtils configuration consts

var MIN_YEAR = 1990;

var _compose = function _compose(fns) {
  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
};

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
  test("min default valid value is " + MIN_YEAR + "-01-01", function () {
    expect(fn(MIN_YEAR + "-01-01")).toBe(true);
    expect(fn('1989-12-30')).toBe(false);
  });
  test('min default valid can be configured', function () {
    expect(fn('1989-12-30', 0, 1989)).toBe(true);
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
describe('isDmyPeriod', function () {
  var fn = isDmyPeriod;
  test('should return correct boolean', function () {
    expect(fn('01-01-2010', '02-01-2010')).toBe(true);
    expect(fn('01-01-2010', '01-01-2010')).toBe(true);
    expect(fn('02-01-2010', '01-01-2010')).toBe(false);
  });
});
describe('dmyToUTC', function () {
  var fn = dmyToUTC;
  test('should return UTC from DD-MM-YYYY', function () {
    expect(fn("10-10-2010")).toBe(Date.UTC(2010, 9, 10));
    expect(fn("01-01-2010")).toBe(Date.UTC(2010, 0, 1));
  });
  test('should return NaN in edge case', function () {
    expect(fn("20-20-2010")).toBe(NaN);
    expect(fn("")).toBe(NaN);
    expect(fn(null)).toBe(NaN);
    expect(fn(undefined)).toBe(NaN);
  });
});
describe('ymdToUTC', function () {
  var fn = ymdToUTC;
  test('should return mls UTC-0 for str YYYY-MM-DD', function () {
    expect(fn('2010-01-01')).toBe(Date.UTC(2010, 0, 1));
  });
  test('should return mls UTC-0 for str YYYY-MM', function () {
    expect(fn('2010-01')).toBe(Date.UTC(2010, 0, 31));
  });
  test('should return NaN for YYYY-MM edge case', function () {
    expect(fn('2010-MM')).toBe(NaN);
  });
  test('should return mls UTC-0 for str YYYY-QN', function () {
    expect(fn('2010-Q1')).toBe(Date.UTC(2010, 2, 31));
    expect(fn('2010-Q2')).toBe(Date.UTC(2010, 5, 30));
  });
  test('should return NaN for YYYY-QS edge case', function () {
    expect(fn('2010-QS')).toBe(NaN);
  });
  test('should return mls UTC-0 for str YYYY', function () {
    expect(fn('2010')).toBe(Date.UTC(2010, 11, 31));
  });
  test('should return NaN for YYYY edge case', function () {
    expect(fn('YYYY')).toBe(NaN);
  });
  test('should return mls UTC-0 for YYYY-MM-DD or NaN for more than 3 tokens', function () {
    expect(fn('2010-01-01-12:00')).toBe(Date.UTC(2010, 0, 1));
    expect(fn('2010-01-AA-12:00')).toBe(NaN);
  });
  test('should use option y for YYYY case', function () {
    expect(fn("2010")).toBe(Date.UTC(2010, 11, 31));
    expect(fn("2010", {
      y: 1
    })).toBe(Date.UTC(2010 - 1, 11, 31));
  });
});
describe('ymdhmsToUTC', function () {
  var fn = ymdhmsToUTC;
  test('should retun mls UTC-0 for str date', function () {
    expect(fn('2010-01-01 12:00:00')).toBe(Date.UTC(2010, 0, 1, 12, 0, 0));
  });
});
describe('formatTo', function () {
  var fn = mlsToDmy;
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
    expect(fn(Number.MAX_SAFE_INTEGER)).toBe(EMPTY);
  });
});
describe('isDmy', function () {
  var fn = isDmy;
  test('should return true for str in format DD-MM-YYY', function () {
    expect(fn('10-10-2000')).toBe(true);
    expect(fn('20-01-2000')).toBe(true);
    expect(fn('01-12-2000')).toBe(true);
  });
  test("should use defult min year value " + MIN_YEAR, function () {
    expect(fn('31-12-1989')).toBe(false);
  });
  test('should use minYear param', function () {
    expect(fn('10-10-2000', 2010)).toBe(false);
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
describe('addToDmy', function () {
  var fn = addToDmy,
      _fn = _compose([mlsToDmy, function (date) {
    return date.getTime();
  }, addToDmy]);

  test('should return Date instance', function () {
    expect(fn('01-02-2019', -1)).toBeInstanceOf(Date);
    expect(fn('01-02-2019', 1)).toBeInstanceOf(Date);
    expect(fn('01-02-2019')).toBeInstanceOf(Date);
    expect(fn('01-02-2019', 'str')).toBeInstanceOf(Date);
    expect(fn('01-02-2019', null)).toBeInstanceOf(Date);
    expect(fn('str', null)).toBeInstanceOf(Date);
  });
  test('should return dmy with added month to dmy format', function () {
    expect(_fn('01-02-2019', -1)).toBe('01-01-2019');
    expect(_fn('01-02-2019', -2)).toBe('01-12-2018');
    expect(_fn('01-02-2019', -3)).toBe('01-11-2018');
    expect(_fn('01-02-2019', -6)).toBe('01-08-2018');
    expect(_fn('01-02-2019', -12)).toBe('01-02-2018');
  });
});
describe('getYTDfromDmy', function () {
  var fn = getYTDfromDmy;
  test('should return mls to start of year', function () {
    expect(fn('01-01-2010')).toBe(Date.UTC(2010, 0, 1));
    expect(fn('02-01-2010')).toBe(Date.UTC(2010, 0, 1));
  });
});
describe('monthIndex', function () {
  var fn = monthIndex;
  it('should return month index from 0 from str', function () {
    expect(fn('january')).toBe(0);
    expect(fn('January')).toBe(0);
    expect(fn('december')).toBe(11);
    expect(fn('December')).toBe(11);
  });
  it('should return -1 for edge cases', function () {
    expect(fn('str')).toBe(-1);
    expect(fn('Jan')).toBe(-1);
    expect(fn('decembe')).toBe(-1);
    expect(fn('')).toBe(-1);
    expect(fn()).toBe(-1);
    expect(fn(null)).toBe(-1);
    expect(fn(1)).toBe(-1);
    expect(fn({})).toBe(-1);
  });
});
(0, _DateUtilsWithMock["default"])();
//# sourceMappingURL=DateUtils.test.js.map