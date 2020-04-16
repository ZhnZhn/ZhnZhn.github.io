import fns from '../seriaHelperFn'

describe("isNumber", ()=>{
  const { isNumber } = fns
  test("should check is value number type", ()=>{
    expect(isNumber(0.1)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-0)).toBe(true)
    expect(isNumber(+0)).toBe(true)

    expect(isNumber(NaN)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber({})).toBe(false)
  })
})

describe("crPointGetter", ()=>{
  const { crPointGetter } = fns;
  test("should create getter for array points", ()=> {
    const _data = [[0, 0], [1, 1]]
    const { getX, getY } = crPointGetter(_data)
    expect(getX(_data[0])).toBe(0)
    expect(getY(_data[0])).toBe(0)
    expect(getX(_data[1])).toBe(1)
    expect(getY(_data[1])).toBe(1)
  })
  test("should create getter for object points", ()=> {
    const _data = [{x: 0, y: 0}, {x: 1, y: 1}]
    const { getX, getY } = crPointGetter(_data)
    expect(getX(_data[0])).toBe(0)
    expect(getY(_data[0])).toBe(0)
    expect(getX(_data[1])).toBe(1)
    expect(getY(_data[1])).toBe(1)
  })
})
