"use strict";

var _getterPointFn = require("../getterPointFn");
const UTC_MLS_2010_12_31 = 1293753600000;
describe('getPointDate', () => {
  const fn = _getterPointFn.getPointDate;
  test('should return date from arr or obj chart point', () => {
    const _arrPoint = [UTC_MLS_2010_12_31, 10],
      _objPoint = {
        x: UTC_MLS_2010_12_31,
        y: 10
      };
    expect(fn(_arrPoint)).toBe(UTC_MLS_2010_12_31);
    expect(fn(_objPoint)).toBe(UTC_MLS_2010_12_31);
  });
  test('should return undefined in edge cases', () => {
    expect(fn([])).toBe(undefined);
    expect(fn({})).toBe(undefined);
    expect(fn()).toBe(undefined);
  });
});
describe('getPointValue', () => {
  const fn = _getterPointFn.getPointValue;
  test('should return value from arr or obj chart point', () => {
    const _arrPoint = [UTC_MLS_2010_12_31, 10],
      _objPoint = {
        x: UTC_MLS_2010_12_31,
        y: 10
      };
    expect(fn(_arrPoint)).toBe(10);
    expect(fn(_objPoint)).toBe(10);
  });
  test('should return string 0.0 in edge cases', () => {
    expect(fn([])).toBe('0.0');
    expect(fn({})).toBe('0.0');
    expect(fn()).toBe('0.0');
    expect(fn([UTC_MLS_2010_12_31, 'str'])).toBe('0.0');
    expect(fn([{
      y: 'str'
    }])).toBe('0.0');
  });
});
//# sourceMappingURL=getterPointFn.test.js.map