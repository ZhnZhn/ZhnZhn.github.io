
import fn from '../formatNumber'

describe('formatNumber', ()=>{
  test('for -0.01<value<0.01 should return same as str', ()=>{
    const str1 = fn(0.009)
    expect(str1).toBe('0.009')
    expect(typeof str1).toBe('string')
    const str2 = fn(-0.009)
    expect(str2).toBe('-0.009')
    expect(typeof str2).toBe('string')    
  })

  test('for value>0.01 should return round by 2 decimals as str', ()=>{
    const str = fn(1.009)
    expect(str).toBe('1.01')
    expect(typeof str).toBe('string')
  })
})
