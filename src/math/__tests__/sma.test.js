import sma from '../sma'

describe("math sma", ()=>{
  test("should return empty array for not array or empty array input", ()=>{
    expect(sma()).toEqual([])
    expect(sma(null)).toEqual([])
    expect(sma(1)).toEqual([])
    expect(sma('str')).toEqual([])
    expect(sma(true)).toEqual([])
    expect(sma({})).toEqual([])
    expect(sma([])).toEqual([])
  })
  test('should return [] in case not enough data', ()=>{
    expect(sma([[1,2],[2,4]], 2)).toEqual([[2, 3]])
    expect(sma([[1,2],[2,4]], 3)).toEqual([])
  })

  test('should return sma arr', ()=>{
    const data = [[1, 2],[2, 4],[3, 2],[4 ,6],[5, 4]];

    expect(sma(data, 0)).toEqual(data)
    expect(sma(data)).toEqual(data)
    expect(sma(data, 1)).toEqual(data)

    expect(sma(data, 2)).toEqual([[2, 3],[3, 3],[4, 4],[5, 5]])
  })

  test("should return correct sma toFixed 2 array for array points", ()=>{
    expect(sma([[1, 0.7745],[2, 0.7844],[3, 0.78],[4 ,0.78]], 2))
      .toEqual([[2, 0.78],[3, 0.78],[4, 0.78]])
    // JS 3*0.7 = 2.0999999999999996 < 2.1
    expect(sma([[1, 0.7],[2, 0.7],[3, 0.7]],3))
      .toEqual([[3, 0.7]])
    // JS 3*0.2 = 0.6000000000000001 > 0.6
    expect(sma([[1, 0.2],[2, 0.2],[3, 0.2]],3))
      .toEqual([[3, 0.2]])
  })
  test("should return correct sma array toFixed 2 for x, y points", ()=>{
    expect(sma([{x:1,y:0.7777},{x:2,y:0.7777},{x:3,y:0.7777},{x:4,y:0.7777}], 2))
      .toEqual([[2, 0.78],[3, 0.78],[4, 0.78]])
    expect(sma([{x:1,y:0.7},{x:2,y:0.7},{x:3,y:0.7}],3))
      .toEqual([[3, 0.7]])
    expect(sma([{x:1,y:0.2},{x:2,y:0.2},{x:3,y:0.2}],3))
      .toEqual([[3, 0.2]])
  })
  test("should filter not number values", () => {
    expect(sma([[1, 0.7],[2, void 0],[3, 'str'],[4, NaN],[5, null],[6, 0.7]], 2))
      .toEqual([[6, 0.7]])
  })
})
