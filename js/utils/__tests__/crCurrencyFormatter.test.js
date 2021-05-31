/**
 * @jest-environment jsdom
 */
//Highcharts numberFormat from util formatNumber require jsdom 
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crCurrencyFormatter = _interopRequireDefault(require("../crCurrencyFormatter"));

describe('crCurrencyFormatter', function () {
  var f = (0, _crCurrencyFormatter["default"])();
  test('should correct format with default settings', function () {
    expect(f.format(1)).toBe('$1.00');
    expect(f.format(1000)).toBe('$1,000.00');
    expect(f.format(0)).toBe('$0.00');
  });
  test('should format as 0 for undefined, null', function () {
    expect(f.format(0)).toBe('$0.00');
    expect(f.format()).toBe('$0.00');
    expect(f.format(null)).toBe('$0.00');
  });
  test('should pass options properties to formatter', function () {
    var _f = (0, _crCurrencyFormatter["default"])({
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    expect(_f.format(0.00)).toBe('$0');
    expect(_f.format(1.00)).toBe('$1');
    expect(_f.format()).toBe('$0');
    expect(_f.format(null)).toBe('$0');
  });
});
//# sourceMappingURL=crCurrencyFormatter.test.js.map