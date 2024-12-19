"use strict";

var _ChartType = require("../../constants/ChartType");
var _CategoryFn = require("../CategoryFn");
describe("isCategory", () => {
  const fn = _CategoryFn.isCategory;
  test("should return boolean from string", () => {
    expect(fn(_ChartType.CHT_BAR_SET)).toBe(true);
    expect(fn(_ChartType.CHT_BAR_CLUSTER)).toBe(true);
    expect(fn(_ChartType.CHT_COLUMN_SET)).toBe(true);
    expect(fn(_ChartType.CHT_COLUMN_CLUSTER)).toBe(true);
    expect(fn(_ChartType.CHT_TREE_MAP)).toBe(true);
    expect(fn(_ChartType.CHT_TREE_MAP_CLUSTER)).toBe(true);
    expect(fn(_ChartType.CHT_SPLINE)).toBe(false);
    expect(fn(_ChartType.CHT_LINE)).toBe(false);
    expect(fn(_ChartType.CHT_AREA)).toBe(false);
    expect(fn(_ChartType.CHT_COLUMN)).toBe(false);
  });
  test("should return boolean from object with property seriaType", () => {
    expect(fn({
      seriaType: _ChartType.CHT_COLUMN_SET
    })).toBe(true);
    expect(fn({
      seriaType: _ChartType.CHT_COLUMN_CLUSTER
    })).toBe(true);
    expect(fn({
      seriaType: _ChartType.CHT_SPLINE
    })).toBe(false);
    expect(fn({
      seriaType: _ChartType.CHT_LINE
    })).toBe(false);
  });
  test("should return false for edge cases", () => {
    expect(fn()).toBe(false);
    expect(fn({})).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn(0)).toBe(false);
    expect(fn(NaN)).toBe(false);
    expect(fn(true)).toBe(false);
  });
});
describe("arrangeSeriaByCategories", () => {
  const fn = _CategoryFn.arrangeSeriaByCategories;
  test("should arrange seria data by categories", () => {
    const categories = ["a1", "a2", "a3"],
      seria = {
        data: [{
          "c": "a3"
        }, {
          c: "a4"
        }, {
          c: "a1"
        }]
      };
    expect(fn(seria, categories)).toEqual({
      data: [{
        c: "a1"
      }, null, {
        c: "a3"
      }]
    });
  });
});
//# sourceMappingURL=CategoryFn.test.js.map