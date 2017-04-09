import safeFn from '../safeFn'

describe('safeFn', () => {
  const obj = {
    fn: () => {}
  }
  test('should return fn by propName', () => {
    expect(safeFn(obj, 'fn')).toBe(obj.fn)
  })

  test('should return fn in edge case', () => {
    expect(typeof safeFn(null, 'fn')).toBe('function')
    expect(typeof safeFn(undefined, 'fn')).toBe('function')
    expect(typeof safeFn('', 'fn')).toBe('function')
    expect(typeof safeFn(true, 'fn')).toBe('function')
    expect(typeof safeFn(1, 'fn')).toBe('function')
    expect(typeof safeFn(NaN, 'fn')).toBe('function')
    expect(typeof safeFn([], 'fn')).toBe('function')
    expect(typeof safeFn(obj, 'fnNotExisted')).toBe('function')
    expect(typeof safeFn('fn')).toBe('function')
  })

  test('should return fn in edge case that return undefined', ()=> {
    expect(typeof safeFn(obj, 'notExisted')()).toBe('undefined')
  })

  test('should return, with dfValue, fn in edge case that return dfValue', () => {
    const dfValue = 'dfValue'
       , fn = safeFn(obj, 'notExisted', dfValue);
    expect(fn()).toBe(dfValue)
  })
})
