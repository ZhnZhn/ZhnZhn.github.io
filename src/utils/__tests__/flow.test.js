import flow from '../flow';

const _isFn = v => typeof v === 'function';

describe('flow',()=>{
  const fn = flow;
  test('should return function by composing the input functions from left to right', ()=>{
     const add = (a, b) => a+b
     , double = a => 2*a
     , resultFn = fn(add, double);

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
  test('should return new identity function in case empty input', ()=>{
    const resultFn = fn();

    expect(_isFn(resultFn)).toBe(true)
    expect(resultFn(1,2)).toBe(1)
    expect(resultFn(2,3)).toBe(2)
    expect(fn() === resultFn).toBe(false)
  })
})
