"use strict";

var _ChartConfigFn = require("../ChartConfigFn");

describe('isLineType', () => {
  const fn = _ChartConfigFn.isLineType;
  test('should return boolean isLineType from chart config', () => {
    expect(fn({})).toBe(false);
    expect(fn({
      series: []
    })).toBe(false);
    expect(fn({
      series: [{
        type: 'spline'
      }]
    })).toBe(true);
    expect(fn({
      series: [{
        type: 'line'
      }]
    })).toBe(true);
    expect(fn({
      series: [{
        type: 'area'
      }]
    })).toBe(true);
    expect(fn({
      series: [{
        type: 'all-other-types'
      }]
    })).toBe(false);
    expect(fn({
      series: [{
        type: 'bar'
      }]
    })).toBe(false);
    expect(fn({
      series: [{
        type: 'column'
      }]
    })).toBe(false);
  });
});
//# sourceMappingURL=ChartConfigFn.test.js.map