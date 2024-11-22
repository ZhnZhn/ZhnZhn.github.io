"use strict";

var _crRouter = require("../crRouter");
describe("crRouters", () => {
  const fn = _crRouter.crRouter;
  it("should create object with null prototype", () => {
    const routers = fn();
    expect(Object.getPrototypeOf(routers)).toBe(null);
    expect(routers.toString).toBe(void 0);
    expect(routers.valueOf).toBe(void 0);
  });
  it("should add props from arg", () => {
    const config = {
      a: "a",
      b: "b"
    };
    expect(fn(config)).toEqual(config);
  });
});
describe("crGetRoute", () => {
  const fn = _crRouter.crGetRoute;
  it("should return function getRoute", () => {
    const getRoute = fn({
      a: "a",
      b: "b"
    });
    expect(typeof getRoute).toBe("function");
    expect(getRoute("a")).toBe("a");
    expect(getRoute("b")).toBe("b");
    expect(getRoute("c")).toBe(void 0);
    expect(getRoute("d")).toBe(void 0);
  });
  it("should return dfRoute", () => {
    const getRoute = fn({
      a: "a",
      b: "b"
    }, "c");
    expect(typeof getRoute).toBe("function");
    expect(getRoute("a")).toBe("a");
    expect(getRoute("b")).toBe("b");
    expect(getRoute("c")).toBe("c");
    expect(getRoute("d")).toBe("c");
  });
});
//# sourceMappingURL=crRouter.test.js.map