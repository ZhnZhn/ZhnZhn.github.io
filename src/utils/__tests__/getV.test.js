import getV from '../getV'

describe('getV', ()=>{
  const fn = getV;
  test('should return string item value', ()=>{
    expect(fn({ value: 'Abc'})).toBe('Abc')
    expect(fn({ value: '0'})).toBe('0')
    expect(fn({ value: 0})).toBe('0')
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
  })
  test('should return option dfValue or empty str in case value null or undefined', ()=>{
    const option = { dfValue: 'dfValue' };
    expect(fn({ value: void 0 }, option)).toBe('dfValue')
    expect(fn({ v: void 0 }, option)).toBe('dfValue')
    expect(fn({ value: null }, option)).toBe('dfValue')
    expect(fn({ v: null }, option)).toBe('dfValue')

    expect(fn({ value: void 0 })).toBe('')
    expect(fn({ v: void 0 })).toBe('')
    expect(fn({ value: null })).toBe('')
    expect(fn({ v: null })).toBe('')
  })

  test('should retun empty string for edge case', () => {
    const option = { isUpper: true };
    expect(fn({})).toBe('')
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')

    expect(fn({}, option)).toBe('')
    expect(fn(void 0, option)).toBe('')
    expect(fn(null, option)).toBe('')
  })

})
