"use strict";

var _pointwise = require("../pointwise");
describe('pointwise', () => {
  const fn = _pointwise.pointwise;
  test('should return array with result of math operation on series of numbers', () => {
    //_multiply2
    expect(fn((a, b) => a * b, [1, 1, 1], [1, 2, 3])).toEqual([1, 2, 3]);
    //_sum3
    expect(fn((a, b, c) => a + b + c, [1, 2, 3], [1, 2, 3], [1, 2, 3])).toEqual([3, 6, 9]);
  });
});
//# sourceMappingURL=pointwise.test.js.map