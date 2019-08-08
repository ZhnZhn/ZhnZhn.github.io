import fn from '../formatAllNumber'

describe('formatAllNumber', ()=>{
  test('should format value without decimals to str with blanks', ()=>{
    const str1 = fn(100)
    expect(str1).toBe('100')
    expect(typeof str1).toBe('string')

    const str2 = fn(100000)
    expect(str2).toBe('100 000')
    expect(typeof str2).toBe('string')

    const str3 = fn(100000000)
    expect(str3).toBe('100 000 000')
    expect(typeof str3).toBe('string')
  })

  test('should format value with decimals for str with blanks', ()=>{
    const str1 = fn(100.001)
    expect(str1).toBe('100.001')
    expect(typeof str1).toBe('string')

    const str2 = fn(100000.001)
    expect(str2).toBe('100 000.001')
    expect(typeof str2).toBe('string')
  })

  test('should return same value for already formated str',  () => {
    const str1 = '100 000'
    , str2 = '100.001'
    , str3 = '100 000.001'
    , str4 = '100 000 000';

    expect(fn(str1)).toBe(str1)
    expect(fn(str2)).toBe(str2)
    expect(fn(str3)).toBe(str3)
    expect(fn(str4)).toBe(str4)

  })

  test('should return for falsy values str 0', () => {
    expect(fn(null)).toBe('0')
    expect(fn()).toBe('0')
    expect(fn(0)).toBe('0')
    expect(fn(NaN)).toBe('0')
    expect(fn(false)).toBe('0')
    expect(fn('')).toBe('0')
  })
})
