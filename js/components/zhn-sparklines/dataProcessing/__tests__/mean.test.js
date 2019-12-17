"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mean = _interopRequireDefault(require("../mean"));

//fork https://github.com/borisyankov/react-sparklines/blob/master/__tests__/mean.js
describe('mean', function () {
  test('should return average of values', function () {
    expect((0, _mean["default"])([0])).toBe(0);
    expect((0, _mean["default"])([0, 1])).toBe(0.5);
    expect((0, _mean["default"])([1, 2])).toBe(3 / 2);
    expect((0, _mean["default"])([0, 1, 2])).toBe(1);
  });
});
//# sourceMappingURL=mean.test.js.map