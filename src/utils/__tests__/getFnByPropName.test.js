import fn from '../getFnByPropName';

describe('getFnByPropName', () => {
  const obj = {
    fn: () => {}
  }
  test('should return fn by propName', () => {
    expect(fn(obj, 'fn')).toBe(obj.fn)
  })

  test('should return fn in edge case', () => {
    expect(typeof fn(null, 'fn')).toBe('function')
    expect(typeof fn(undefined, 'fn')).toBe('function')
    expect(typeof fn('', 'fn')).toBe('function')
    expect(typeof fn(true, 'fn')).toBe('function')
    expect(typeof fn(1, 'fn')).toBe('function')
    expect(typeof fn(NaN, 'fn')).toBe('function')
    expect(typeof fn([], 'fn')).toBe('function')
    expect(typeof fn(obj, 'fnNotExisted')).toBe('function')
    expect(typeof fn('fn')).toBe('function')
  })
  test('should return fn that return dfValue in edge case', ()=>{
    const dfValue = 'dfValue'
    expect(fn(null, 'fn', dfValue)()).toBe(dfValue)
    expect(fn(null, 'fn')()).toBe(undefined)
  })

  test('should return fn in edge case that return undefined', ()=> {
    expect(typeof fn(obj, 'notExisted')()).toBe('undefined')
  })

  test('should return, with dfValue, fn in edge case that return dfValue', () => {
    const dfValue = 'dfValue'
    expect(fn(obj, 'notExisted', dfValue)()).toBe(dfValue)
  })
})
