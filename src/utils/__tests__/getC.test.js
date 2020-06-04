import getC from '../getC'

describe('getC', ()=> {
  const fn = getC;
  test('should return string item caption', ()=>{
    expect(fn({ caption: 'Abc' })).toBe('Abc')
    expect(fn({ caption: '0' })).toBe('0')
    expect(fn({ caption: 0 })).toBe('0')
    expect(fn({})).toBe('')
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
  })
  test('should return string item caption by item short prop name c', () => {
    expect(fn({ c: 'Abc' })).toBe('Abc')
    expect(fn({ c: '0' })).toBe('0')
    expect(fn({ c: 0 })).toBe('0')
  })
})
