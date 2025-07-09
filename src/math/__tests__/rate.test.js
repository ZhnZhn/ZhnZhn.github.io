import rate from '../rate';

describe("rate", () => {
  const calc = rate;
  test("should calc rate", () => {
    expect(calc(100, 10)).toBe(10)
    expect(() => calc(100, 0)).toThrow('[big.js] Division by zero')
  })
  test("should fixed calc rate by 2", () => {
    //3.3333...
    expect(calc(100, 30)).toBe(3.33)
    //3.44827...
    expect(calc(100, 29)).toBe(3.45)
    //4.5454...
    expect(calc(100, 22)).toBe(4.55)
  })
})
