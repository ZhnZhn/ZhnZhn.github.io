'use strict';

var _DateUtils = require('../DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const d1 = "2010-01-10"
    , d2 = "2010-10-01"
    , d_1 = "2010-14-01"
    , d_2 = "2010-02-32"
*/

describe('isValidDate YYYY-MM-DD', function () {
  var fn = _DateUtils2.default.isValidDate;

  test('should return is valid data', function () {
    expect(fn("2010-01-10")).toBe(true);
    expect(fn("2010-10-01")).toBe(true);
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

describe('isValidDateOrEmpty YYYY-MM-DD', function () {
  var fn = _DateUtils2.default.isValidDateOrEmpty;
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
  var fn = _DateUtils2.default.dmyToUTC;
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

describe('isFormatDmy', function () {
  var fn = _DateUtils2.default.isFormatDmy;
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\__tests__\DateUtils.test.js.map