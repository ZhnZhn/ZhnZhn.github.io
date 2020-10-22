import fns from '../seriaHelperFn'

const {
  isNumber,
  crPointGetter,
  fGetY,
  getZeroCountFromStart,
  getZeroIndexFromEnd
} = fns

describe("isNumber", ()=>{
  const fn = isNumber
  test("should check is value number type", ()=>{
    expect(fn(0.1)).toBe(true)
    expect(fn(0)).toBe(true)
    expect(fn(-0)).toBe(true)
    expect(fn(+0)).toBe(true)

    expect(fn(NaN)).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(undefined)).toBe(false)
    expect(fn('')).toBe(false)
    expect(fn({})).toBe(false)
  })
})

describe("crPointGetter", ()=>{
  const fn = crPointGetter;
  test("should create getter for array points", ()=> {
    const _data = [[0, 0], [1, 1]]
    const { getX, getY } = fn(_data)

    expect(getX(_data[0])).toBe(0)
    expect(getY(_data[0])).toBe(0)
    expect(getX(_data[1])).toBe(1)
    expect(getY(_data[1])).toBe(1)
  })
  test("should create getter for object points", ()=> {
    const _data = [{x: 0, y: 0}, {x: 1, y: 1}]
    const { getX, getY } = fn(_data)

    expect(getX(_data[0])).toBe(0)
    expect(getY(_data[0])).toBe(0)
    expect(getX(_data[1])).toBe(1)
    expect(getY(_data[1])).toBe(1)
  })
})


describe("fGetY", ()=>{
  const fn = fGetY
  test("should return function for getting y for arr point", () => {
    const point = [1, 2]
    , getY = fn(point)

    expect(typeof getY).toBe('function')
    expect(getY(point)).toBe(point[1])
  })
  test("should return function for getting y for obj point", () => {
    const point = {y:2}
    , getY = fn(point)

    expect(typeof getY).toBe('function')
    expect(getY(point)).toBe(point.y)
  })
  test('should return undefined for edge case', ()=>{
    expect(fn(null)).toBe(undefined)
    expect(fn({})).toBe(undefined)
  })
})


describe('getZeroCountFromStart', ()=>{
  const fn = getZeroCountFromStart
  test('should return number of points with y 0 or null from data start', ()=>{
    const dataArr = [[1,0],[2,null]]
    expect(fn(dataArr, fGetY(dataArr[0]))).toBe(2)

    const dataArr2 = [[1,0],[2,null],[-1, 1]]
    expect(fn(dataArr2, fGetY(dataArr2[0]))).toBe(2)

    const dataObj = [{x:1,y:0},{x:2,y:null}]
    expect(fn(dataObj, fGetY(dataObj[0]))).toBe(2)
  })
})

describe('getZeroIndexFromEnd', ()=>{
  const fn = getZeroIndexFromEnd
  test('should return index of last y 0 or null from data end', ()=>{
    const dataArr = [[-1, -1], [1,0],[2,null]]
    expect(fn(dataArr, fGetY(dataArr[0]))).toBe(1)

    const dataObj = [{x:-1, y:-1}, {x:1,y:0},{x:2,y:null}]
    expect(fn(dataObj, fGetY(dataObj[0]))).toBe(1)
  })
})
