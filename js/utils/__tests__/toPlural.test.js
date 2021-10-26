"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toPlural = _interopRequireDefault(require("../toPlural"));

describe("toPlural", () => {
  const fn = _toPlural.default;
  test("should convert to plural str", () => {
    // y case
    expect(fn("country")).toBe("countries");
    expect(fn("geo entity")).toBe("geo entities"); // all other cases

    expect(fn("word")).toBe("words");
  });
  test("should return echo for edge cases", () => {
    expect(fn("")).toBe("");
    expect(fn(void 0)).toBe(void 0);
    expect(fn(null)).toBe(null);
  });
});
//# sourceMappingURL=toPlural.test.js.map