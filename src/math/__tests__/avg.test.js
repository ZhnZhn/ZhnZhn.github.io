import { avg } from '../avg';

describe('avg',()=>{
  const fn = avg;
  test('should return calculated average number from array of numbers', ()=>{
    expect(fn([
      1.111111,
      1.111111,
      1.711111
    ])).toBe(1.311111)
  })

  test('should return NaN for empty input array', ()=>{
    expect(fn([])).toBe(NaN)
  })
})
