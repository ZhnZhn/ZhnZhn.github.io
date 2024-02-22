"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dateFn = require("../dateFn");
var _dateFnWithMock = _interopRequireDefault(require("./dateFnWithMock"));
// DateUtils configuration consts
const MIN_YEAR = 1990,
  UTC_MLS_2010_12_31 = 1293753600000,
  UTC_MLS_2018_01_01 = 1514764800000,
  UTC_MLS_2018_01_10 = 1515542400000,
  UTC_MLS_2018_10_01 = 1538352000000;
const _compose = fns => fns.reduce((f, g) => function () {
  return f(g(...arguments));
});
describe('isYmd YYYY-MM-DD', () => {
  const fn = _dateFn.isYmd;
  test('should return true for valid YYYY-MM-DD', () => {
    expect(fn("2010-01-10")).toBe(true);
    expect(fn("2010-10-01")).toBe(true);
  });
  test('should return false for not valid YYYY-MM-DD', () => {
    expect(fn("2010-14-01")).toBe(false);
    expect(fn("2010-02-32")).toBe(false);
  });
  test(`min default valid value is ${MIN_YEAR}-01-01`, () => {
    expect(fn(`${MIN_YEAR}-01-01`)).toBe(true);
    expect(fn('1989-12-30')).toBe(false);
  });
  test('min default valid can be configured', () => {
    expect(fn('1989-12-30', 0, 1989)).toBe(true);
  });
  test('should year be not future', () => {
    expect(fn('2030-01-01')).toBe(false);
    expect(fn('2030-01-01', 1)).toBe(false);
    expect(fn('2030-01-01', 2)).toBe(false);
    expect(fn('2030-01-01', 3)).toBe(false);
    expect(fn('2030-01-01', 20)).toBe(true);
  });
  test('should return false in edge case', () => {
    expect(fn('')).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(undefined)).toBe(false);
  });
});
describe('isYmdOrEmty YYYY-MM-DD', () => {
  const fn = _dateFn.isYmdOrEmpty;
  test('should return is valid date or empty', () => {
    expect(fn('')).toBe(true);
    expect(fn("2010-01-10")).toBe(true);
    expect(fn("2010-10-01")).toBe(true);
    expect(fn(null)).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn(() => {})).toBe(false);
    expect(fn("2010-20-20")).toBe(false);
    expect(fn("2010-40-40")).toBe(false);
  });
});
describe('isDmyPeriod', () => {
  const fn = _dateFn.isDmyPeriod;
  test('should return correct boolean', () => {
    expect(fn('01-01-2010', '02-01-2010')).toBe(true);
    expect(fn('01-01-2010', '01-01-2010')).toBe(true);
    expect(fn('02-01-2010', '01-01-2010')).toBe(false);
  });
});
describe('dmyToUTC', () => {
  const fn = _dateFn.dmyToUTC;
  test('should return UTC from DD-MM-YYYY', () => {
    expect(fn("10-10-2010")).toBe(Date.UTC(2010, 9, 10));
    expect(fn("01-01-2010")).toBe(Date.UTC(2010, 0, 1));
  });
  test('should return NaN in edge case', () => {
    expect(fn("20-20-2010")).toBe(NaN);
    expect(fn("")).toBe(NaN);
    expect(fn(null)).toBe(NaN);
    expect(fn(undefined)).toBe(NaN);
  });
});
describe('ymdToUTC', () => {
  const fn = _dateFn.ymdToUTC;
  test('should return mls UTC-0 for str YYYY-MM-DD', () => {
    expect(fn('2010-01-01')).toBe(Date.UTC(2010, 0, 1));
  });
  test('should return mls UTC-0 for str YYYY-MM', () => {
    expect(fn('2010-01')).toBe(Date.UTC(2010, 0, 31));
  });
  test('should return NaN for YYYY-MM edge case', () => {
    expect(fn('2010-MM')).toBe(NaN);
  });
  test('should return mls UTC-0 for str YYYY-QN', () => {
    expect(fn('2010-Q1')).toBe(Date.UTC(2010, 2, 31));
    expect(fn('2010-Q2')).toBe(Date.UTC(2010, 5, 30));
  });
  test('should return NaN for YYYY-QS edge case', () => {
    expect(fn('2010-QS')).toBe(NaN);
  });
  test('should return mls UTC-0 for str YYYY', () => {
    expect(fn('2010')).toBe(UTC_MLS_2010_12_31);
  });
  test('should return mls UTC-0 for number YYYY', () => {
    expect(fn(2010)).toBe(UTC_MLS_2010_12_31);
  });
  test('should return NaN for YYYY edge case', () => {
    expect(fn('YYYY')).toBe(NaN);
    expect(fn(10 ** 6)).toBe(NaN);
    expect(fn(-(10 ** 6))).toBe(NaN);
  });
  test('should return mls UTC-0 for YYYY-MM-DD or NaN for more than 3 tokens', () => {
    expect(fn('2010-01-01-12:00')).toBe(Date.UTC(2010, 0, 1));
    expect(fn('2010-01-AA-12:00')).toBe(NaN);
  });
  test('should use option y for YYYY case', () => {
    expect(fn("2010")).toBe(UTC_MLS_2010_12_31);
    expect(fn("2011", {
      y: 1
    })).toBe(UTC_MLS_2010_12_31);
  });
});
describe('ymdhmsToUTC', () => {
  const fn = _dateFn.ymdhmsToUTC
    //'2010-01-01 12:00:00'
    ,
    UTC_MLS = 1262347200000;
  test('should retun mls UTC for str date', () => {
    expect(fn('2010-01-01 12:00:00')).toBe(UTC_MLS);
  });
  test('should retun mls UTC for str date with dtDelimeter', () => {
    expect(fn('2010-01-01T12:00:00', 'T')).toBe(UTC_MLS);
  });
  test('should retun mls UTC for str yyyy-mm-dd', () => {
    expect(fn('2010-01-01')).toBe(1262304000000);
  });
  test('should return NaN for edge case', () => {
    expect(fn()).toBeNaN();
    expect(fn(null)).toBeNaN();
    expect(fn('abcd')).toBeNaN();
    expect(fn('2010')).toBeNaN();
    expect(fn('2010-ab')).toBeNaN();
    expect(fn('2010-01-01T12:00:00', 'A')).toBeNaN();
  });
});
describe('mlsToDmy', () => {
  const fn = _dateFn.mlsToDmy;
  const EMPTY = '';
  test('should format to DD-MM-YYYY from UTC mls', () => {
    expect(fn(UTC_MLS_2018_01_01)).toBe('01-01-2018');
    expect(fn(UTC_MLS_2018_01_10)).toBe('10-01-2018');
    expect(fn(UTC_MLS_2018_10_01)).toBe('01-10-2018');
  });
  test('should format to empty string in edge case', () => {
    expect(fn(null)).toBe(EMPTY);
    expect(fn()).toBe(EMPTY);
    expect(fn({})).toBe(EMPTY);
    expect(fn(NaN)).toBe(EMPTY);
    expect(fn('')).toBe(EMPTY);
    expect(fn('abc')).toBe(EMPTY);
    expect(fn(() => {})).toBe(EMPTY);
    expect(fn(Number.MAX_SAFE_INTEGER)).toBe(EMPTY);
  });
});
describe('mlsToYmd', () => {
  const fn = _dateFn.mlsToYmd;
  const EMPTY = '';
  test('should format to YYYY-MM-DD from mls', () => {
    expect(fn(UTC_MLS_2018_01_01)).toBe('2018-01-01');
    expect(fn(UTC_MLS_2018_01_10)).toBe('2018-01-10');
    expect(fn(UTC_MLS_2018_10_01)).toBe('2018-10-01');
  });
  test('should format to empty string in edge case', () => {
    expect(fn(null)).toBe(EMPTY);
    expect(fn()).toBe(EMPTY);
    expect(fn({})).toBe(EMPTY);
    expect(fn(NaN)).toBe(EMPTY);
    expect(fn('')).toBe(EMPTY);
    expect(fn('abc')).toBe(EMPTY);
    expect(fn(() => {})).toBe(EMPTY);
    expect(fn(Number.MAX_SAFE_INTEGER)).toBe(EMPTY);
  });
});
describe('isDmy', () => {
  const fn = _dateFn.isDmy;
  test('should return true for str in format DD-MM-YYY', () => {
    expect(fn('10-10-2000')).toBe(true);
    expect(fn('20-01-2000')).toBe(true);
    expect(fn('01-12-2000')).toBe(true);
  });
  test(`should use defult min year value ${MIN_YEAR}`, () => {
    expect(fn('31-12-1989')).toBe(false);
  });
  test('should use minYear param', () => {
    expect(fn('10-10-2000', 2010)).toBe(false);
  });
  test('should return false for str not in format DD-MM-YYYY', () => {
    expect(fn('10-14-2000')).toBe(false);
    expect(fn('20-1-2000')).toBe(false);
    expect(fn('2000-12-01')).toBe(false);
  });
  test('should return false in edge cases', () => {
    expect(fn(null)).toBe(false);
    expect(fn()).toBe(false);
    expect(fn('')).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn(() => {})).toBe(false);
    expect(fn(fn)).toBe(false);
  });
});
describe('getUTCTime', () => {
  const fn = _dateFn.getUTCTime;
  test('should return correct str from ms', () => {
    expect(fn(1547205009808)).toBe('11:10');
    expect(fn(1547204900008)).toBe('11:08');
  });
  test('should return empty string in edge case', () => {
    expect(fn(undefined)).toBe('');
    expect(fn(null)).toBe('');
    expect(fn('str')).toBe('');
    expect(fn(NaN)).toBe('');
    expect(fn({})).toBe('');
  });
});
describe('addToDmy', () => {
  const fn = _dateFn.addToDmy,
    _fn = _compose([_dateFn.mlsToDmy, date => date.getTime(), _dateFn.addToDmy]);
  test('should return Date instance', () => {
    expect(fn('01-02-2019', -1)).toBeInstanceOf(Date);
    expect(fn('01-02-2019', 1)).toBeInstanceOf(Date);
    expect(fn('01-02-2019')).toBeInstanceOf(Date);
    expect(fn('01-02-2019', 'str')).toBeInstanceOf(Date);
    expect(fn('01-02-2019', null)).toBeInstanceOf(Date);
    expect(fn('str', null)).toBeInstanceOf(Date);
  });
  test('should return dmy with added month to dmy format', () => {
    expect(_fn('01-02-2019', -1)).toBe('01-01-2019');
    expect(_fn('01-02-2019', -2)).toBe('01-12-2018');
    expect(_fn('01-02-2019', -3)).toBe('01-11-2018');
    expect(_fn('01-02-2019', -6)).toBe('01-08-2018');
    expect(_fn('01-02-2019', -12)).toBe('01-02-2018');
  });
});
describe('addDaysToYmd', () => {
  const fn = _dateFn.addDaysToYmd;
  test('should return string in format YYYY-MM-DD with added number of days', () => {
    expect(fn('2018-12-31', 1)).toBe('2019-01-01');
    expect(fn('2019-01-01', 30)).toBe('2019-01-31');
    expect(fn('2019-01-31', 1)).toBe('2019-02-01');
  });
});
describe('getYTDfromDmy', () => {
  const fn = _dateFn.getYTDfromDmy;
  test('should return mls to start of year', () => {
    expect(fn('01-01-2010')).toBe(Date.UTC(2010, 0, 1));
    expect(fn('02-01-2010')).toBe(Date.UTC(2010, 0, 1));
  });
});
describe('getYear', () => {
  const fn = _dateFn.getYear;
  test('should return YYYY from YYYY-MM-DD', () => {
    expect(fn('2010-01-01')).toBe('2010');
  });
  test('should return empty string for falsy input', () => {
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
    expect(fn('')).toBe('');
  });
});
describe('getNumberOfDays', () => {
  const fn = _dateFn.getNumberOfDays;
  test('should return number of days by year, month', () => {
    expect(fn(2011, 2)).toBe(28);
    expect(fn(2012, 2)).toBe(29);
    expect(fn('2011', 1)).toBe(31);
    expect(fn(2011, '3')).toBe(31);
    expect(fn('2011', '4')).toBe(30);
    expect(fn(2011, 5)).toBe(31);
    expect(fn(2011, 6)).toBe(30);
    expect(fn(2011, 7)).toBe(31);
    expect(fn(2012, 8)).toBe(31);
    expect(fn(2012, 9)).toBe(30);
    expect(fn(2012, 10)).toBe(31);
    expect(fn(2012, 11)).toBe(30);
    expect(fn(2012, 12)).toBe(31);
  });
});
describe('monthIndex', () => {
  const fn = _dateFn.monthIndex;
  it('should return month index from 0 from str', () => {
    expect(fn('january')).toBe(0);
    expect(fn('January')).toBe(0);
    expect(fn('december')).toBe(11);
    expect(fn('December')).toBe(11);
  });
  it('should return -1 for edge cases', () => {
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
describe("getYmdhms", () => {
  const fn = _dateFn.getYmdhmUTC;
  it("should return str in format YYYY-MM-DD HH:MM UTC", () => {
    expect(fn(new Date(Date.UTC(2010, 0, 1)))).toBe('2010-01-01 00:00 UTC');
    expect(fn(new Date(Date.UTC(2010, 0, 1, 1)))).toBe('2010-01-01 01:00 UTC');
  });
});
describe("getDateFromVm", () => {
  const fn = _dateFn.getDateFromVm;
  it("should return str year from annual valueMoving", () => {
    expect(fn({
      date: '31-12-2010',
      dateTo: '31-12-2009'
    })).toBe('2010');
  });
  it('should return str quarter date from quarterly valueMoving', () => {
    expect(fn({
      date: '31-03-2010',
      dateTo: '31-12-2009'
    })).toBe('Q1 2010');
    expect(fn({
      date: '31-12-2010',
      dateTo: '31-09-2010'
    })).toBe('Q4 2010');
    expect(fn({
      date: '31-12-2010',
      dateTo: '30-09-2010'
    })).toBe('Q4 2010');
    expect(fn({
      date: '31-12-2010',
      dateTo: '19-09-2010'
    })).toBe('31-12-2010');
    expect(fn({
      date: '31-11-2010',
      dateTo: '30-08-2010'
    })).toBe('31-11-2010');
  });
  it('should return otherwise property date of valueMoving', () => {
    expect(fn({
      date: '31-12-2010',
      dateTo: '30-11-2010'
    })).toBe('31-12-2010');
    expect(fn({
      date: '31-12-2010',
      dateTo: '30-12-2010'
    })).toBe('31-12-2010');
  });
  it('should return property date of valueMoving in edge cases', () => {
    expect(fn({
      date: '31-12-2010'
    })).toBe('31-12-2010');
    expect(fn({
      date: '31-12-2010',
      dateTo: null
    })).toBe('31-12-2010');
    expect(fn({})).toBe(void 0);
  });
});
describe('formatStrDate', () => {
  const fn = _dateFn.formatStrDate;
  it('should format str date to quarterly format', () => {
    expect(fn('2010-Q1')).toBe('Q1 2010');
    expect(fn('2010-Q2')).toBe('Q2 2010');
  });
  it('should format str date to MM-YYYY format', () => {
    expect(fn('2010-10')).toBe('10-2010');
    expect(fn('10-2010')).toBe('10-2010');
    expect(fn('2010-09')).toBe('09-2010');
    expect(fn('09-2010')).toBe('09-2010');
  });
  it('should return same str date in other cases', () => {
    expect(fn('2010')).toBe('2010');
    expect(fn('2010-10-01')).toBe('2010-10-01');
  });
});
(0, _dateFnWithMock.default)();
//# sourceMappingURL=dateFn.test.js.map