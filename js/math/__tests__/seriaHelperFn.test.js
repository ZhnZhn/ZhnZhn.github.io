"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _seriaHelperFn = _interopRequireDefault(require("../seriaHelperFn"));

describe("isNumber", function () {
  var isNumber = _seriaHelperFn["default"].isNumber;
  test("should check is value number type", function () {
    expect(isNumber(0.1)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(+0)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber({})).toBe(false);
  });
});
describe("crPointGetter", function () {
  var crPointGetter = _seriaHelperFn["default"].crPointGetter;
  test("should create getter for array points", function () {
    var _data = [[0, 0], [1, 1]];

    var _crPointGetter = crPointGetter(_data),
        getX = _crPointGetter.getX,
        getY = _crPointGetter.getY;

    expect(getX(_data[0])).toBe(0);
    expect(getY(_data[0])).toBe(0);
    expect(getX(_data[1])).toBe(1);
    expect(getY(_data[1])).toBe(1);
  });
  test("should create getter for object points", function () {
    var _data = [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 1
    }];

    var _crPointGetter2 = crPointGetter(_data),
        getX = _crPointGetter2.getX,
        getY = _crPointGetter2.getY;

    expect(getX(_data[0])).toBe(0);
    expect(getY(_data[0])).toBe(0);
    expect(getX(_data[1])).toBe(1);
    expect(getY(_data[1])).toBe(1);
  });
});
//# sourceMappingURL=seriaHelperFn.test.js.map