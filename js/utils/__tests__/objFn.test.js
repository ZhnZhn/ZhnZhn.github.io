"use strict";

var _objFn = require("../objFn");
describe("getByPropsFrom", () => {
  const fn = _objFn.getByPropsFrom;
  test("should return value from object by list parameters of prop names", () => {
    const obj = {
      prop1: [{
        prop2: {
          value: 1
        }
      }]
    };
    expect(fn(obj, "prop1", 0, "prop2", "value")).toBe(1);
    expect(fn(null, "prop1", 0, "prop2", "value")).toBe(void 0);
    expect(fn(void 0, "prop1", 0, "prop2", "value")).toBe(void 0);
    expect(fn(obj, "prop1", 1, "prop2", "value")).toBe(void 0);
    expect(fn(obj, "prop4", 1, "prop5", "value")).toBe(void 0);
  });
});
//# sourceMappingURL=objFn.test.js.map