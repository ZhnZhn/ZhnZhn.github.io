import getV from '../getV'

describe('getV', ()=>{
  const fn = getV;
  test('should return string item value', ()=>{
    expect(fn({ value: 'Abc'})).toBe('Abc')
    expect(fn({ value: '0'})).toBe('0')
    expect(fn({ value: 0})).toBe('0')

    expect(fn({})).toBe('')
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
  })
  test('should return string item value by item short prop name v', ()=>{
    expect(fn({ v: 'Abc'})).toBe('Abc')
    expect(fn({ v: '0'})).toBe('0')
    expect(fn({ v: 0})).toBe('0')
  })

  test('should return string upperCase in case isUpper option', ()=>{
    const option = { isUpper: true };
    expect(fn({ value: 'Abc'}, option)).toBe('ABC')
    expect(fn({ value: '0'}, option)).toBe('0')
    expect(fn({ value: 0}, option)).toBe('0')

    expect(fn({}, option)).toBe('')
    expect(fn(void 0, option)).toBe('')
    expect(fn(null, option)).toBe('')
  })

})
