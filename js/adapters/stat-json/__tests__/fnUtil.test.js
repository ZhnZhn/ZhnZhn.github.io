"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fnUtil = _interopRequireDefault(require("../fnUtil"));

const {
  toUTC,
  toYMD
} = _fnUtil.default;
describe('toUTC', () => {
  const fn = toUTC;
  test('should conver str in format 2010M01D01 to mls UTC-0', () => {
    expect(fn('2010M01D01')).toBe(Date.UTC(2010, 0, 1)); //2010-01-01

    expect(fn('2010M01D02')).toBe(Date.UTC(2010, 0, 2)); //2010-01-02

    expect(fn('2010M02D01')).toBe(Date.UTC(2010, 1, 1)); //2010-02-01
  });
  test('should convert str in format 2010M01 to mls UTC-0', () => {
    expect(fn('2010M01')).toBe(Date.UTC(2010, 0, 30)); //2010-01-30

    expect(fn('2010M02')).toBe(Date.UTC(2010, 1, 28)); //2010-02-28

    expect(fn('2010M03')).toBe(Date.UTC(2010, 2, 30)); //2010-03-30
  });
  test('should convert str in format 2010Q1, 2010K1 to mls UTC-0', () => {
    const mls_2010_03_30 = Date.UTC(2010, 2, 30); //2010-03-30

    expect(fn('2010Q1')).toBe(mls_2010_03_30);
    expect(fn('2010K1')).toBe(mls_2010_03_30);
    const mls_2010_06_30 = Date.UTC(2010, 5, 30); //2010-06-30

    expect(fn('2010Q2')).toBe(mls_2010_06_30);
    expect(fn('2010K2')).toBe(mls_2010_06_30);
    const mls_2010_09_30 = Date.UTC(2010, 8, 30); //2010-09-30

    expect(fn('2010Q3')).toBe(mls_2010_09_30);
    expect(fn('2010K3')).toBe(mls_2010_09_30);
    const mls_2010_12_30 = Date.UTC(2010, 11, 30); //2010-12-30

    expect(fn('2010Q4')).toBe(mls_2010_12_30);
    expect(fn('2010K4')).toBe(mls_2010_12_30);
  });
  test('should convert str in format 2010H1 to mls UTC-0', () => {
    expect(fn('2010H1')).toBe(Date.UTC(2010, 5, 30)); //2010-06-30

    expect(fn('2010H2')).toBe(Date.UTC(2010, 11, 30)); //2010-12-30
  });
  test('should conver str in format YYYY to mls UTC-0', () => {
    expect(fn('2010')).toBe(Date.UTC(2010, 11, 31)); //2010-12-31

    expect(fn('2011')).toBe(Date.UTC(2011, 11, 31)); //2011-12-31

    expect(fn('2012')).toBe(Date.UTC(2012, 11, 31)); //2012-12-31
  });
});
describe('toYMD', () => {
  const fn = toYMD;
  test('should convert str in toUTC formats to str YYYY-MM-DD', () => {
    expect(fn('2010M01D01')).toBe('2010-01-01');
    expect(fn('2010M02')).toBe('2010-02-28');
    expect(fn('2010M03')).toBe('2010-03-30');
  });
});
//# sourceMappingURL=fnUtil.test.js.map