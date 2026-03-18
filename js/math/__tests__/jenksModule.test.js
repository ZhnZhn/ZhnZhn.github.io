"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _jenksModule = _interopRequireDefault(require("../jenksModule"));
const _getItemColor = (r, index) => r[index].color;
const _getItemPrevColor = (r, index) => r[index]._prevColor;
describe("addJenksColorTo", () => {
  const fn = _jenksModule.default.addJenksColorTo;
  test("should add jenks color and _prevColor to data items", () => {
    const data = [{
        y: 1,
        color: "aa"
      }, {
        y: 1.1,
        color: "aa"
      }, {
        y: 2
      }, {
        y: 2.2
      }, {
        y: 3
      }, {
        y: 3.3
      }, {
        y: 4
      }, {
        y: 4.4
      }, {
        y: 5,
        color: "ee"
      }, {
        y: 5.1,
        color: "ee"
      }, {
        y: 6
      }, {
        y: 6.1
      }],
      colors = ["a1", "b2", "c3", "d4", "e5", "f6"],
      _r = fn(data, colors, 6);
    expect(_getItemColor(_r, 0)).toBe(colors[0]);
    expect(_getItemPrevColor(_r, 0)).toBe("aa");
    expect(_getItemColor(_r, 1)).toBe(colors[0]);
    expect(_getItemPrevColor(_r, 1)).toBe("aa");
    expect(_getItemColor(_r, 2)).toBe(colors[1]);
    expect(_getItemPrevColor(_r, 2)).toBe(void 0);
    expect(_getItemColor(_r, 3)).toBe(colors[1]);
    expect(_getItemPrevColor(_r, 3)).toBe(void 0);
    expect(_getItemColor(_r, 4)).toBe(colors[2]);
    expect(_getItemColor(_r, 5)).toBe(colors[2]);
    expect(_getItemColor(_r, 6)).toBe(colors[3]);
    expect(_getItemColor(_r, 7)).toBe(colors[3]);
    expect(_getItemColor(_r, 8)).toBe(colors[4]);
    expect(_getItemPrevColor(_r, 8)).toBe("ee");
    expect(_getItemColor(_r, 9)).toBe(colors[4]);
    expect(_getItemPrevColor(_r, 9)).toBe("ee");
    expect(_getItemColor(_r, 10)).toBe(colors[5]);
    expect(_getItemPrevColor(_r, 10)).toBe(void 0);
    expect(_getItemColor(_r, 11)).toBe(colors[5]);
    expect(_getItemPrevColor(_r, 11)).toBe(void 0);
  });
  test("should correct handle case with not enough data", () => {
    const data = [{
        y: 1
      }, {
        y: 1.1
      }, {
        y: 2
      }, {
        y: 2.2
      }],
      colors = ["a1", "b2", "c3", "d4", "e5", "f6"],
      _r = fn(data, colors, 6);
    expect(_getItemColor(_r, 0)).toBe(colors[0]);
    expect(_getItemColor(_r, 1)).toBe(colors[1]);
    expect(_getItemColor(_r, 2)).toBe(colors[2]);
    expect(_getItemColor(_r, 3)).toBe(colors[3]);
  });
  test("should return empty array in edge case input", () => {
    expect(fn([])).toEqual([]);
    expect(fn()).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn("str")).toEqual([]);
    expect(fn(1)).toEqual([]);
    expect(fn(false)).toEqual([]);
  });
});
describe("removeJenksColorFrom", () => {
  const fn = _jenksModule.default.removeJenksColorFrom;
  test("should set _prevColor to data items", () => {
    const data = [{
        y: 1,
        color: "a",
        _prevColor: "aa"
      }, {
        y: 2,
        color: "b",
        _prevColor: "bb"
      }, {
        y: 3,
        color: "c"
      }, {
        y: 4
      }],
      r = fn(data);
    expect(r[0]).toEqual({
      y: 1,
      color: "aa",
      _prevColor: "aa"
    });
    expect(r[1]).toEqual({
      y: 2,
      color: "bb",
      _prevColor: "bb"
    });
    expect(r[2]).toEqual({
      y: 3,
      color: void 0
    });
    expect(r[3]).toEqual({
      y: 4,
      color: void 0
    });
  });
  test("should return empty array in edge case input", () => {
    expect(fn([])).toEqual([]);
    expect(fn()).toEqual([]);
    expect(fn(null)).toEqual([]);
    expect(fn("str")).toEqual([]);
    expect(fn(1)).toEqual([]);
    expect(fn(false)).toEqual([]);
  });
});
//# sourceMappingURL=jenksModule.test.js.map