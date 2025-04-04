import compose from '../compose';

const _isFn = v => typeof v === 'function';

describe('compose',()=>{
  const fn = compose;
  test('should return function by composing the input functions from right to left',()=>{
    const add = (a, b) => a+b
    , double = a => 2*a
    , resultFn = fn(double, add);

    expect(_isFn(resultFn)).toBe(true)
    expect(resultFn(1,2)).toBe(6)
    expect(resultFn(2,3)).toBe(10)
  })
  test('should return argument function in case one input',()=>{
    const add = (a, b) => a+b
    , resultFn = fn(add);

    expect(_isFn(resultFn)).toBe(true)
    expect(resultFn === add).toBe(true)
    expect(resultFn(1,2)).toBe(3)
    expect(resultFn(2,3)).toBe(5)
  })
  test('should return second argument function in case one input void 0 and second function',()=>{
    const add = (a, b) => a+b
    , resultFn = fn(void 0, add);

    expect(_isFn(resultFn)).toBe(true)
    expect(resultFn === add).toBe(true)
    expect(resultFn(1,2)).toBe(3)
    expect(resultFn(2,3)).toBe(5)
  })
  test('should return first argument function in case one input function and second void 0',()=>{
    const add = (a, b) => a+b
    , resultFn = fn(add, void 0);

    expect(_isFn(resultFn)).toBe(true)
    expect(resultFn === add).toBe(true)
    expect(resultFn(1,2)).toBe(3)
    expect(resultFn(2,3)).toBe(5)
  })
  test('should return new identity function in case empty input', ()=>{
    const resultFn = fn();

    expect(_isFn(resultFn)).toBe(true)
    expect(resultFn(1,2)).toBe(1)
    expect(resultFn(2,3)).toBe(2)
    expect(fn() === resultFn).toBe(false)
  })
})
