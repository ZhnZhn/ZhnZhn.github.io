"use strict";

var _getByPropsFrom = require("../getByPropsFrom");
describe("getByPropsFrom", () => {
  const fn = _getByPropsFrom.getByPropsFrom;
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
//# sourceMappingURL=getByPropsFrom.test.js.map