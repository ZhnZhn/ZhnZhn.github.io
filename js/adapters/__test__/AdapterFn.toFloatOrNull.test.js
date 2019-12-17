"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var toFloatOrNull = _AdapterFn["default"].toFloatOrNull;
describe('toFloatOrNull', function () {
  var fn = toFloatOrNull;
  test('should return float from str', function () {
    expect(fn('0')).toBe(0);
    expect(fn('2')).toBe(2);
    expect(fn('0.2')).toBe(0.2);
    expect(fn('0.22')).toBe(0.22);
    expect(fn('0.222')).toBe(0.222);
  });
  test('should return null for not float case (NaN)', function () {
    expect(fn()).toBe(null);
    expect(fn(null)).toBe(null);
    expect(fn('')).toBe(null);
    expect(fn('a')).toBe(null);
  });
});
//# sourceMappingURL=AdapterFn.toFloatOrNull.test.js.map