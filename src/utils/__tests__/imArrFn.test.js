import {
  imArrPush,
  imArrFactoryFilterByProp,
  imArrFactoryEditByProp,
  imArrInsertItem
} from '../imArrFn';

describe('imArrPush', () => {
  const fn = imArrPush
  , obj = {b:2};
  test('should push obj', () => {
    const arr = [ {a:1} ]
    , result = fn(arr, obj)
    , maxIndex = result.length-1;

    expect(result).not.toBe(arr)
    expect(result[maxIndex]).not.toBe(obj)
    expect(result[maxIndex]).toEqual(obj)
  })
  test('should use empty arr in case arr not Array', ()=>{
    const result = imArrPush(void 0, obj);

    expect(result[0]).not.toBe(obj)
    expect(result[0]).toEqual(obj)
    expect(result.length).toEqual(1)
  })
})

describe('imArrFactoryFilterByProp', ()=> {
  test('should filter by propName arr and propValue', () => {
    const arr = [ {a:1}, {a:2}, {a:3}, {a:1} ]
    , fn = imArrFactoryFilterByProp('a')
    , result = fn(arr, 1);

    expect(typeof fn).toBe('function')
    expect(result).not.toBe(arr)
    expect(result.length).toBe(2)
  })
})

describe('imArrInsertItem', () => {
  const fn = imArrInsertItem
  , arr = [ {a:1}, {b:2}, {c:3} ]
  , obj = {d:4};
  test('should insert obj to arr, index=0', () => {
    const result = fn(obj, 0, arr);

    expect(result).not.toBe(arr)
    expect(result[0]).not.toBe(obj)
    expect(result[0]).toEqual(obj)
    expect(result.length).toBe(arr.length+1)
  })
  test('should insert obj to arr, index=length', () => {
    const index = arr.length
    , result = fn(obj, index, arr);

    expect(result).not.toBe(arr)
    expect(result[index]).not.toBe(obj)
    expect(result[index]).toEqual(obj)
    expect(result.length).toBe(arr.length+1)
  })
  test('should use empty arr in case arr not Array', () => {
    const result = fn(obj, 2);

    expect(result[0]).not.toBe(obj)
    expect(result[0]).toEqual(obj)
    expect(result.length).toBe(1)
  })
})

describe('imArrFactoryEditByProp', () => {
  test('should edit obj in arr by propName and index', () => {
    const arr = [ {a:1}, {a:2}, {a:3}]
    , fn = imArrFactoryEditByProp('a')
    , result = fn(arr, 0, 4);

    expect(typeof fn).toBe('function')
    expect(result).not.toBe(arr)
    expect(result[0]).toEqual({a:4})
  })
})
