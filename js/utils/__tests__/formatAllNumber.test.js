/**
 * @jest-environment jsdom
 */
"use strict";

var _numberFormatFn = require("../numberFormatFn");
describe('formatAllNumber', () => {
  const fn = _numberFormatFn.formatAllNumber;
  test('should format value without decimals to str with blanks', () => {
    expect(fn(1)).toBe('1');
    expect(fn(10)).toBe('10');
    expect(fn(100)).toBe('100');
    expect(fn(1_000)).toBe('1 000');
    expect(fn(100_000)).toBe('100 000');
    expect(fn(100_000_000)).toBe('100 000 000');
    expect(fn(-1)).toBe('-1');
    expect(fn(-10)).toBe('-10');
    expect(fn(-100)).toBe('-100');
    expect(fn(-1_000)).toBe('-1 000');
    expect(fn(-100_000)).toBe('-100 000');
    expect(fn(-100_000_000)).toBe('-100 000 000');
  });
  test('should format value with decimals for str with blanks', () => {
    expect(fn(100.001)).toBe('100.001');
    expect(fn(100_000.001)).toBe('100 000.001');
    expect(fn(-100.001)).toBe('-100.001');
    expect(fn(-100_000.001)).toBe('-100 000.001');
  });
  test('should format small values [0, 1e-7)', () => {
    expect(fn(0.000001099)).toBe('0.000001099');
    expect(fn(1.099e-6)).toBe('0.000001099');
    expect(fn(-0.000001099)).toBe('-0.000001099');
    expect(fn(-1.099e-6)).toBe('-0.000001099');
  });
  test('should format small values (1e-7, +) to exponential format', () => {
    expect(fn(0.0000001099)).toBe('1.099e-7');
    expect(fn(1.099e-7)).toBe('1.099e-7');
    expect(fn(-0.0000001099)).toBe('-1.099e-7');
    expect(fn(-1.099e-7)).toBe('-1.099e-7');
  });
  test('should return same value for already formated str', () => {
    expect(fn('100 000')).toBe('100 000');
    expect(fn('100.001')).toBe('100.001');
    expect(fn('100 000.001')).toBe('100 000.001');
    expect(fn('100 000 000')).toBe('100 000 000');
  });
  test('should return str 0 for number 0 or str 0', () => {
    expect(fn(0)).toBe('0');
    expect(fn('0')).toBe('0');
  });
  test('should use dfValue for false values', () => {
    expect(fn(NaN, "")).toBe("");
    expect(fn(void 0, "")).toBe("");
    expect(fn(null, "")).toBe("");
    expect(fn("", "")).toBe("");
    expect(fn(false, "")).toBe("");
  });
  test('should return for falsy values DF_VALUE  str 0', () => {
    expect(fn(null)).toBe('0');
    expect(fn()).toBe('0');
    expect(fn(NaN)).toBe('0');
    expect(fn(false)).toBe('0');
    expect(fn('')).toBe('0');
  });
});
//# sourceMappingURL=formatAllNumber.test.js.map