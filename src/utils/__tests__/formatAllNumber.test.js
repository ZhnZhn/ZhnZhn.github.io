import fn from '../formatAllNumber'

describe('formatAllNumber', ()=>{
  test('for value without decimal should return same as formated str', ()=>{
    const str1 = fn(100)
    expect(str1).toBe('100')
    expect(typeof str1).toBe('string')

    const str2 = fn(100000)
    expect(str2).toBe('100 000')
    expect(typeof str2).toBe('string')
  })

  test('for value with decimal should return same as formated str', ()=>{
    const str1 = fn(100.001)
    expect(str1).toBe('100.001')
    expect(typeof str1).toBe('string')

    const str2 = fn(100000.001)
    expect(str2).toBe('100 000.001')
    expect(typeof str2).toBe('string')
  })
})
