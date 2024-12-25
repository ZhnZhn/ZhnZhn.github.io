"use strict";

var _ChartOptionsFn = require("../ChartOptionsFn");
describe("crChartOptions", () => {
  const fn = _ChartOptionsFn.crChartOptions;
  test("should return array with chart options t1", () => {
    const chartOptionsT1 = [{
      caption: "Default: Spline",
      value: "SPLINE"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Area",
      value: "AREA"
    }];
    expect(fn([], "t1")).toEqual(chartOptionsT1);
  });
  test("should return array with chart options t1a", () => {
    const chartOptionsT1a = [{
      caption: "Default: Area",
      value: "AREA"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Spline",
      value: "SPLINE"
    }];
    expect(fn([], "t1a")).toEqual(chartOptionsT1a);
  });
  test("should return array with chart options t2", () => {
    const chartOptionsT2 = [{
      caption: "Default: Spline",
      value: "SPLINE"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Area",
      value: "AREA"
    }, {
      caption: "Column",
      value: "COLUMN"
    }];
    expect(fn([], "t2")).toEqual(chartOptionsT2);
  });
  test("should return array with chart options t2a", () => {
    const monthlyChartOptionsT2a = [{
        caption: "Default: Spline",
        value: "SPLINE"
      }, {
        caption: "Line",
        value: "LINE"
      }, {
        caption: "Area",
        value: "AREA"
      }, {
        caption: "Column",
        value: "COLUMN"
      }, {
        caption: "Yearly by Months",
        value: "AREA_YEARLY"
      }],
      notMonthlyChartOptionsT2a = [{
        caption: "Default: Spline",
        value: "SPLINE"
      }, {
        caption: "Line",
        value: "LINE"
      }, {
        caption: "Area",
        value: "AREA"
      }, {
        caption: "Column",
        value: "COLUMN"
      }];
    expect(fn([], "t2a")).toEqual(monthlyChartOptionsT2a);
    expect(fn([], "t2a", "M")).toEqual(monthlyChartOptionsT2a);
    expect(fn([], "t2a", "Q")).toEqual(notMonthlyChartOptionsT2a);
    expect(fn([], "t2a", "Y")).toEqual(notMonthlyChartOptionsT2a);
  });
  test("should return array with chart options t2ae", () => {
    const monthlyChartOptionsT2ae = [{
        caption: "Default: Spline",
        value: "SPLINE"
      }, {
        caption: "Line",
        value: "LINE"
      }, {
        caption: "Area",
        value: "AREA"
      }, {
        caption: "Column",
        value: "COLUMN"
      }, {
        caption: "Yearly by Months",
        value: "AREA_YEARLY"
      }, {
        caption: "Column: By Dim",
        value: "COLUMN_SET",
        dim: "Dim"
      }, {
        caption: "Column: By Dim: Cluster",
        value: "COLUMN_CLUSTER",
        dim: "Dim"
      }, {
        caption: "Bar: By Dim",
        value: "BAR_SET",
        dim: "Dim"
      }, {
        caption: "Bar: By Dim: Cluster",
        value: "BAR_CLUSTER",
        dim: "Dim"
      }],
      notMonthlyChartOptionsT2ae = [{
        caption: "Default: Spline",
        value: "SPLINE"
      }, {
        caption: "Line",
        value: "LINE"
      }, {
        caption: "Area",
        value: "AREA"
      }, {
        caption: "Column",
        value: "COLUMN"
      }, {
        caption: "Column: By Dim",
        value: "COLUMN_SET",
        dim: "Dim"
      }, {
        caption: "Column: By Dim: Cluster",
        value: "COLUMN_CLUSTER",
        dim: "Dim"
      }, {
        caption: "Bar: By Dim",
        value: "BAR_SET",
        dim: "Dim"
      }, {
        caption: "Bar: By Dim: Cluster",
        value: "BAR_CLUSTER",
        dim: "Dim"
      }];
    expect(fn([], "t2ae")).toEqual(monthlyChartOptionsT2ae);
    expect(fn([], "t2ae", "M")).toEqual(monthlyChartOptionsT2ae);
    expect(fn([], "t2ae", "Q")).toEqual(notMonthlyChartOptionsT2ae);
    expect(fn([], "t2ae", "Y")).toEqual(notMonthlyChartOptionsT2ae);
  });
  test("should return array with chart options t3", () => {
    const chartOptionsT3 = [{
      caption: "Default: Spline",
      value: "SPLINE"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Area",
      value: "AREA"
    }, {
      caption: "Column",
      value: "COLUMN"
    }, {
      caption: "Column: By Item",
      value: "COLUMN_SET",
      dim: "Item"
    }, {
      caption: "Column: By Item: Cluster",
      value: "COLUMN_CLUSTER",
      dim: "Item"
    }, {
      caption: "Bar: By Item",
      value: "BAR_SET",
      dim: "Item"
    }, {
      caption: "Bar: By Item: Cluster",
      value: "BAR_CLUSTER",
      dim: "Item"
    }];
    expect(fn([{
      caption: "Item"
    }], "t3")).toEqual(chartOptionsT3);
  });
  test("should return array with chart options t3c", () => {
    const chartOptionsT3c = [{
      caption: "Default: Spline",
      value: "SPLINE"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Area",
      value: "AREA"
    }, {
      caption: "Column",
      value: "COLUMN"
    }, {
      caption: "Column: By Item",
      value: "COLUMN_SET",
      dim: "Item"
    }, {
      caption: "Bar: By Item",
      value: "BAR_SET",
      dim: "Item"
    }];
    expect(fn([{
      caption: "Item"
    }], "t3c")).toEqual(chartOptionsT3c);
  });
  test("should return array with chart options t3c2", () => {
    const chartOptionsT3c2 = [{
      caption: "Default: Spline",
      value: "SPLINE"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Area",
      value: "AREA"
    }, {
      caption: "Column",
      value: "COLUMN"
    }, {
      caption: "Column: By Item",
      value: "COLUMN_SET",
      dim: "Item"
    }, {
      caption: "Bar: By Item",
      value: "BAR_SET",
      dim: "Item"
    }, {
      caption: "Column: By Metric",
      value: "COLUMN_SET",
      dim: "Metric"
    }, {
      caption: "Bar: By Metric",
      value: "BAR_SET",
      dim: "Metric"
    }];
    expect(fn([{
      caption: "Item"
    }, {
      caption: "Metric"
    }], "t3c2")).toEqual(chartOptionsT3c2);
  });
  test("should return array with chart options t3ca", () => {
    const chartOptionsT3ca = [{
      caption: "Default: Spline",
      value: "SPLINE"
    }, {
      caption: "Line",
      value: "LINE"
    }, {
      caption: "Area",
      value: "AREA"
    }, {
      caption: "Column",
      value: "COLUMN"
    }, {
      caption: "Column: By Dim",
      value: "COLUMN_SET",
      dim: "Dim"
    }, {
      caption: "Bar: By Dim",
      value: "BAR_SET",
      dim: "Dim"
    }];
    expect(fn([], "t3ca")).toEqual(chartOptionsT3ca);
  });
});
describe("isCategoryItem", () => {
  const fn = _ChartOptionsFn.isCategoryItem;
  test("should return boolean isCategoryItem", () => {
    expect(fn({
      value: "MAP"
    })).toBe(true);
    expect(fn({
      value: "COLUMN_SET"
    })).toBe(true);
    expect(fn({
      value: "COLUMN_CLUSTER"
    })).toBe(true);
    expect(fn({
      value: "BAR_SET"
    })).toBe(true);
    expect(fn({
      value: "BAR_CLUSTER"
    })).toBe(true);
    expect(fn({
      value: "BAR_WITH_LABELS"
    })).toBe(true);
    expect(fn({
      value: "DOT_SET"
    })).toBe(true);
    expect(fn({
      value: "TREE_MAP"
    })).toBe(true);
    expect(fn({
      value: "TREE_MAP_CLUSTER"
    })).toBe(true);
    expect(fn({
      value: "BAR_TREE_MAP"
    })).toBe(true);
    expect(fn({
      value: "SPLINE"
    })).toBe(false);
    expect(fn({
      value: "LINE"
    })).toBe(false);
    expect(fn({
      value: "AREA"
    })).toBe(false);
    expect(fn({
      value: "COLUMN"
    })).toBe(false);
  });
  test("should return false in edge cases", () => {
    expect(fn()).toBe(false);
    expect(fn(null)).toBe(false);
    expect(fn("str")).toBe(false);
    expect(fn(1)).toBe(false);
    expect(fn(true)).toBe(false);
    expect(fn(() => {})).toBe(false);
    expect(fn([])).toBe(false);
    expect(fn({
      a: "TREE_MAP"
    })).toBe(false);
  });
});
//# sourceMappingURL=ChartOptionsFn.test.js.map