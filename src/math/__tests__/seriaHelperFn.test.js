import {
  crPointGetter,
  fGetY,
  getZeroCountFromStart,
  getZeroIndexFromEnd,

  crDataArrays,
  mergeToChartPoints
} from '../seriaHelperFn';

describe("crPointGetter", ()=>{
  const fn = crPointGetter;
  test("should return array with two functions",()=>{
    const [getX1, getY1] = fn([{}]);
    expect(typeof getX1).toBe('function')
    expect(typeof getY1).toBe('function')

    const [getX2, getY2] = fn([[]]);
    expect(typeof getX2).toBe('function')
    expect(typeof getY2).toBe('function')
  })
  test("should return array with getter for array points", ()=> {
    const _data = [[0, 0], [1, 1]];
    const [getX, getY] = fn(_data);

    expect(getX(_data[0])).toBe(0)
    expect(getY(_data[0])).toBe(0)
    expect(getX(_data[1])).toBe(1)
    expect(getY(_data[1])).toBe(1)
  })
  test("should return array with getter for object points", ()=> {
    const _data = [{x: 0, y: 0}, {x: 1, y: 1}];
    const [getX, getY] = fn(_data);

    expect(getX(_data[0])).toBe(0)
    expect(getY(_data[0])).toBe(0)
    expect(getX(_data[1])).toBe(1)
    expect(getY(_data[1])).toBe(1)
  })
  test('should return empty array in edge cases',()=>{
    expect(fn()).toEqual([])
    expect(fn(null)).toEqual([])
    expect(fn('str')).toEqual([])
    expect(fn(1)).toEqual([])
    expect(fn(true)).toEqual([])

    expect(fn(()=>{})).toEqual([])

    expect(fn([])).toEqual([])
    expect(fn([null, void 0, 'str', 1, true])).toEqual([])
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

describe('crDataArrays', ()=>{
  const fn = crDataArrays;
  test('should return array with data numbers and dataX values by chart data',()=>{
    expect(
      fn([
        [1,10],
        [2,20],
        [3,30],
        [4,null],
        [5, void 0]
      ])
    ).toEqual([
        [10,20,30],
        [1,2,3]
    ])
  })

  expect(
    fn([
      {x: 1, y: 10},
      {x: 2, y: 20},
      {x: 3, y: 30},
      {x: 4, y: null},
      {x: 5, y: void 0},
    ])
  ).toEqual([
    [10,20,30],
    [1,2,3]
  ])
  test('should return array with empty arrays for edge case',()=>{
    expect(fn()).toEqual([[],[]])
    expect(fn(null)).toEqual([[],[]])
    expect(fn('str')).toEqual([[],[]])
    expect(fn(2)).toEqual([[],[]])
    expect(fn(true)).toEqual([[],[]])
    expect(fn([null, 'str', 2, false, void 0])).toEqual([[],[]])
  })
})

describe('mergeToChartPoints', ()=>{
  const fn = mergeToChartPoints;
  test('should return array with chart points by dataX and values', ()=>{
    expect(fn(
      [1,2,3],
      [10,20,30]
    )).toEqual([
      [1,10],
      [2,20],
      [3,30]
    ])
  })
})
