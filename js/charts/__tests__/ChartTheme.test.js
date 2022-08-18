/**
 * @jest-environment jsdom
 */
"use strict";

var _ChartTheme = require("../ChartTheme");

describe('getSeriaColorByIndex', () => {
  const fn = _ChartTheme.getSeriaColorByIndex;
  test('should return seria string color by index', () => {
    const _firstColor = '#7cb5ec',
          _secondColor = '#8abb5d';
    expect(fn(0)).toBe(_firstColor);
    expect(fn(1)).toBe(_secondColor);
    expect(fn(9)).toBe(_firstColor);
    expect(fn(10)).toBe(_secondColor);
  });
});
//# sourceMappingURL=ChartTheme.test.js.map