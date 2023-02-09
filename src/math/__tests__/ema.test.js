import { ema } from '../ema';

describe('EMA',()=>{
  const fn = ema;
  test('should return calculated EMA array', ()=>{
    expect(fn([2,4,8,16,32], 1))
     .toEqual([2,4,8,16,32])
    expect(fn([0,4,8,16,32], 3))
      .toEqual([4,4,6,11,21.5]) 
  })
})
