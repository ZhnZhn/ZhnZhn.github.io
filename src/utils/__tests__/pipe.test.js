import pipe from '../pipe';

describe('pipe',()=>{
  const fn = pipe;
  test('should return result from calls input functions from left to right from initialValue',()=>{
    const addTwo = v => v+2
    , double = v => 2*v;

    expect(fn(1, addTwo, double)).toBe(6)
    expect(fn(2, addTwo, double)).toBe(8)
  })
})
