"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _pipe = _interopRequireDefault(require("../pipe"));
describe('pipe', () => {
  const fn = _pipe.default;
  test('should return result from calls input functions from left to right from initialValue', () => {
    const addTwo = v => v + 2,
      double = v => 2 * v;
    expect(fn(1, addTwo, double)).toBe(6);
    expect(fn(2, addTwo, double)).toBe(8);
  });
});
//# sourceMappingURL=pipe.test.js.map