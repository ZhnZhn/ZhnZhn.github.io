import {
  isTypeNumber,
  isNumber,
  isNaN,
  isInt,
  isStr,
  isUndef,
  isObj,
  isNotEmptyArr
} from '../isTypeFn';

describe('isTypeNumber',()=>{
  const fn = isTypeNumber;
  test('should retun true for type number otherwise false',()=>{
    expect(fn(0)).toBe(true)
    expect(fn(0.1)).toBe(true)
    expect(fn(NaN)).toBe(true)

    expect(fn('str')).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(void 0)).toBe(false)
    expect(fn(true)).toBe(false)
  })
})

describe('isNumber',()=>{
  const fn = isNumber;
  test('should return true for number otherwise false',()=>{
    expect(fn(-0.2)).toBe(true)
    expect(fn(2)).toBe(true)

    expect(fn(NaN)).toBe(false)
  })
})

describe('isNaN',()=>{
  const fn = isNaN;
  test('should return true for NaN value otherwise false',()=>{
    expect(fn(NaN)).toBe(true)

    expect(fn(2)).toBe(false)
    expect(fn(0.2)).toBe(false)
  })
})

describe('isInt',()=>{
  const fn = isInt;
  test('should return true for integer value otherwise false',()=>{
    expect(fn(-2)).toBe(true)
    expect(fn(0)).toBe(true)
    expect(fn(1)).toBe(true)

    expect(fn(-0.2)).toBe(false)
    expect(fn(0.1)).toBe(false)
    expect(fn(NaN)).toBe(false)
  })
})

describe('isStr',()=>{
  const fn = isStr;
  test('should return true for string value otherwise false',()=>{
    expect(fn('')).toBe(true)
    expect(fn('str')).toBe(true)

    expect(fn(new String())).toBe(false)
    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(true)).toBe(false)
    expect(fn(2)).toBe(false)
  })
})

describe('isUndef',()=>{
  const fn = isUndef;
  test('should return true for undefined value otherwise false',()=>{
    expect(fn()).toBe(true)
    expect(fn(void 0)).toBe(true)

    expect(fn(null)).toBe(false)
    expect(fn('')).toBe(false)
  })
})

describe('isObj',()=>{
  const fn = isObj;
  test('should return true for object except null othewise false',()=>{
    expect(fn({})).toBe(true)

    expect(fn(null)).toBe(false)
  })
})

describe('isNotEmptyArr',()=>{
  const fn = isNotEmptyArr;
  test('should return true for array with not zero length othewise false', ()=>{
    expect(fn([''])).toBe(true)

    expect(fn([])).toBe(false)
    expect(fn({})).toBe(false)
    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
  })
})
