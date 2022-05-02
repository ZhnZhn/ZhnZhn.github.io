"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _diff = _interopRequireDefault(require("../diff"));

describe('diff', () => {
  const calc = _diff.default;
  test('should calc diff', () => {
    expect(calc(100, 50)).toBe(50);
    expect(calc(50, 100)).toBe(-50);
    expect(calc(0.000004, 0.000003)).toBe(0.000001);
  });
});
//# sourceMappingURL=diff.test.js.map