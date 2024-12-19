import {
  CHT_SPLINE,
  CHT_LINE,
  CHT_AREA,
  CHT_COLUMN,

  CHT_BAR_SET,
  CHT_BAR_CLUSTER,
  CHT_COLUMN_SET,
  CHT_COLUMN_CLUSTER,
  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER
} from "../../constants/ChartType";
import {
  isCategory,
  arrangeSeriaByCategories
} from "../CategoryFn";

describe("isCategory", () => {
  const fn = isCategory;
  test("should return boolean from string", () => {
    expect(fn(CHT_BAR_SET)).toBe(true)
    expect(fn(CHT_BAR_CLUSTER)).toBe(true)
    expect(fn(CHT_COLUMN_SET)).toBe(true)
    expect(fn(CHT_COLUMN_CLUSTER)).toBe(true)
    expect(fn(CHT_TREE_MAP)).toBe(true)
    expect(fn(CHT_TREE_MAP_CLUSTER)).toBe(true)

    expect(fn(CHT_SPLINE)).toBe(false)
    expect(fn(CHT_LINE)).toBe(false)
    expect(fn(CHT_AREA)).toBe(false)
    expect(fn(CHT_COLUMN)).toBe(false)
  })

  test("should return boolean from object with property seriaType", () => {
    expect(fn({seriaType: CHT_COLUMN_SET})).toBe(true)
    expect(fn({seriaType: CHT_COLUMN_CLUSTER})).toBe(true)

    expect(fn({seriaType: CHT_SPLINE})).toBe(false)
    expect(fn({seriaType: CHT_LINE})).toBe(false)
  })

  test("should return false for edge cases", () => {
    expect(fn()).toBe(false)

    expect(fn({})).toBe(false)
    expect(fn([])).toBe(false)

    expect(fn(null)).toBe(false)
    expect(fn(0)).toBe(false)
    expect(fn(NaN)).toBe(false)
    expect(fn(true)).toBe(false)
  })
})

describe("arrangeSeriaByCategories", () => {
  const fn = arrangeSeriaByCategories;
  test("should arrange seria data by categories", () => {
    const categories = ["a1","a2","a3"]
    , seria = { data: [
      {"c": "a3"}, {c: "a4"}, {c: "a1"}
    ]}
    expect(fn(seria, categories)).toEqual({
      data: [
        {c: "a1"}, null, {c: "a3"}
      ]
    })
  })
})
