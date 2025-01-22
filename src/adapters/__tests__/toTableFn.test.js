import {
  crStyleBold,
  crStyleCenter,
  crNameProps,
  crNumberProps,
  crRankProps,
  crCaptionItemsProps,
  crTableFlatHeaders
} from "../toTableFn";

describe("crStyleBold", ()=>{
  const fn = crStyleBold;
  test("should return style bold", () => {
    expect(fn()).toStrictEqual({
      style: {
        fontWeight: "bold"
      }
    })
  })

  test("should use style props", () => {
    expect(fn({ transform: "uppercase" })).toStrictEqual({
      style: {
        fontWeight: "bold",
        transform: "uppercase"
      }
    })
  })

  test("should override style bold by style props", () => {
    expect(fn({
      fontWeight: "normal",
      transform: "uppercase"
    })).toStrictEqual({
      style: {
        fontWeight: "normal",
        transform: "uppercase"
      }
    })
  })
})

describe("crStyleCenter", ()=>{
  const fn = crStyleCenter;
  test("should return style center", () => {
    expect(fn()).toStrictEqual({
      style: {
        textAlign: "center"
      }
    })
  })

  test("should use style props", () => {
    expect(fn({ transform: "uppercase" })).toStrictEqual({
      style: {
        textAlign: "center",
        transform: "uppercase"
      }
    })
  })

  test("should override style center by style props", () => {
    expect(fn({
      textAlign: "left",
      transform: "uppercase"
    })).toStrictEqual({
      style: {
        textAlign: "left",
        transform: "uppercase"
      }
    })
  })
})

describe("crNameProps", () => {
  const fn = crNameProps;
  test("should return table name props", () => {
    expect(fn("Link", "url", true)).toStrictEqual({
      name: "Link",
      pn: "url",
      isHide: true
    })
    expect(fn("Link", "url")).toStrictEqual({
      name: "Link",
      pn: "url",
      isHide: void 0
    })
    expect(fn("Url", true)).toStrictEqual({
      name: "Url",
      pn: "url",
      isHide: true
    })
    expect(fn("Url")).toStrictEqual({
      name: "Url",
      pn: "url",
      isHide: void 0
    })
  })
})

describe("crNumberProps", () => {
  const fn = crNumberProps;
  test("should return table number props", () => {
    expect(fn()).toStrictEqual({
      toN: [void 0],
      isF: true,
      style: {
        fontWeight: "bold"
      }
    })
    expect(fn(2)).toStrictEqual({
      toN: [2],
      isF: true,
      style: {
        fontWeight: "bold"
      }
    })
  })
})

describe("crRankProps",()=>{
  const fn = crRankProps;
  test("should return table rank props", ()=>{
    expect(fn()).toStrictEqual({
      name: "Rank",
      pn: "rank",
      isHide: void 0,
      toN: [],
      style: {
        textAlign: "center"
      }
    })

    expect(fn("Rank Title", "somePropName")).toStrictEqual({
      name: "Rank Title",
      pn: "somePropName",
      isHide: void 0,
      toN: [],
      style: {
        textAlign: "center"
      }
    })
  })
})

describe("crCaptionItemsProps", ()=>{
  const fn = crCaptionItemsProps;
  test("should return caption items props", ()=>{
    expect(
      fn("Items", [{name: "Item1"}, {name: "Item2"}])
    ).toStrictEqual({
      caption: "Items",
      items: [{name: "Item1"}, {name: "Item2"}]
    })
  })
})

describe("crTableFlatHeaders", ()=>{
  const fn = crTableFlatHeaders;
  test("should create flat table headers with index ids from table heades", () => {
    expect(fn([
      { name: "Item 0" },
      { name: "Item 1" },
      { items: [
        { name: "Item 2" },
        { name: "Item 3" }
      ]},
      { name: "Item 4" }
    ])).toStrictEqual([
      { name: "Item 0" },
      { name: "Item 1", id: 1 },
      { name: "Item 2", id: 2 },
      { name: "Item 3", id: 3 },
      { name: "Item 4", id: 4 }
    ])
  })
})
