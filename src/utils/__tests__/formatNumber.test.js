
import fn from '../formatNumber'

describe('formatNumber', ()=>{
  test('for value<0.01 should return same as str', ()=>{
    const str = fn(0.009)
    expect(str).toBe('0.009')
    expect(typeof str).toBe('string')
  })

  test('for value>0.01 should return round by 2 decimals as str', ()=>{
    const str = fn(1.009)
    expect(str).toBe('1.01')
    expect(typeof str).toBe('string')
  })
})
