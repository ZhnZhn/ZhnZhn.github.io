"use strict";

var _regExpFn = require("../regExpFn");
describe("REG_ONE_OR_MORE_BLANKS", () => {
  test("should replace all more then one blanks with one blank", () => {
    expect("a  b   c    d e".replace(_regExpFn.REG_ONE_OR_MORE_BLANKS, " ")).toBe("a b c d e");
  });
});
describe("crRegExpReplacements", () => {
  const fn = _regExpFn.crRegExpReplacements;
  test("should create RegExp replacements", () => {
    const replacements = {
      "aaa": "1",
      "bbb": "2"
    };
    expect("aaa bbb aaaa".replace(fn(replacements), matcher => replacements[matcher])).toBe("1 2 1a");
  });
});
//# sourceMappingURL=regExpFn.test.js.map