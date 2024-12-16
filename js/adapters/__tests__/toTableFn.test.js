"use strict";

var _toTableFn = require("../toTableFn");
describe("crStyleBold", () => {
  const fn = _toTableFn.crStyleBold;
  test("should return style bold", () => {
    expect(fn()).toStrictEqual({
      style: {
        fontWeight: "bold"
      }
    });
  });
  test("should use style props", () => {
    expect(fn({
      transform: "uppercase"
    })).toStrictEqual({
      style: {
        fontWeight: "bold",
        transform: "uppercase"
      }
    });
  });
  test("should override style bold by style props", () => {
    expect(fn({
      fontWeight: "normal",
      transform: "uppercase"
    })).toStrictEqual({
      style: {
        fontWeight: "normal",
        transform: "uppercase"
      }
    });
  });
});
describe("crStyleCenter", () => {
  const fn = _toTableFn.crStyleCenter;
  test("should return style center", () => {
    expect(fn()).toStrictEqual({
      style: {
        textAlign: "center"
      }
    });
  });
  test("should use style props", () => {
    expect(fn({
      transform: "uppercase"
    })).toStrictEqual({
      style: {
        textAlign: "center",
        transform: "uppercase"
      }
    });
  });
  test("should override style center by style props", () => {
    expect(fn({
      textAlign: "left",
      transform: "uppercase"
    })).toStrictEqual({
      style: {
        textAlign: "left",
        transform: "uppercase"
      }
    });
  });
});
describe("crNameProps", () => {
  const fn = _toTableFn.crNameProps;
  test("should return table name props", () => {
    expect(fn("Link", "url", true)).toStrictEqual({
      name: "Link",
      pn: "url",
      isHide: true
    });
    expect(fn("Link", "url")).toStrictEqual({
      name: "Link",
      pn: "url",
      isHide: void 0
    });
    expect(fn("Url", true)).toStrictEqual({
      name: "Url",
      pn: "url",
      isHide: true
    });
    expect(fn("Url")).toStrictEqual({
      name: "Url",
      pn: "url",
      isHide: void 0
    });
  });
});
describe("crNumberProps", () => {
  const fn = _toTableFn.crNumberProps;
  test("should return table number props", () => {
    expect(fn()).toStrictEqual({
      toN: [void 0],
      isF: true,
      style: {
        fontWeight: "bold"
      }
    });
    expect(fn(2)).toStrictEqual({
      toN: [2],
      isF: true,
      style: {
        fontWeight: "bold"
      }
    });
  });
});
describe("crTableFlatHeaders", () => {
  const fn = _toTableFn.crTableFlatHeaders;
  test("should create flat table headers with index ids from table heades", () => {
    expect(fn([{
      name: "Item 0"
    }, {
      name: "Item 1"
    }, {
      items: [{
        name: "Item 2"
      }, {
        name: "Item 3"
      }]
    }, {
      name: "Item 4"
    }])).toStrictEqual([{
      name: "Item 0"
    }, {
      name: "Item 1",
      id: 1
    }, {
      name: "Item 2",
      id: 2
    }, {
      name: "Item 3",
      id: 3
    }, {
      name: "Item 4",
      id: 4
    }]);
  });
});
//# sourceMappingURL=toTableFn.test.js.map