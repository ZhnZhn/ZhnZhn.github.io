import {
  isTypeNumber,
  isNumber,
  isPositiveNumber,
  isNaN,
  isInt,
  isBool,
  isStr,
  isStrNotBlank,
  isStrOrNumber,
  isUndef,
  isFn,
  isObj,
  isNotEmptyArr,
  isEmpty,
  getObjectKeys,
  parseIntBy10
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
    expect(fn(0)).toBe(true)
    expect(fn(-0)).toBe(true)
    expect(fn(+0)).toBe(true)

    expect(fn(NaN)).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(undefined)).toBe(false)
    expect(fn('')).toBe(false)
    expect(fn({})).toBe(false)
  })
})

describe('isPositiveNumber',()=>{
  const fn = isPositiveNumber;
  test('should return true for positive number otherwise false',()=>{
    expect(fn(0.000001)).toBe(true)
    expect(fn(-0.000001)).toBe(false)

    expect(fn(0)).toBe(false)
    expect(fn(-0)).toBe(false)
    expect(fn(+0)).toBe(false)

    expect(fn(NaN)).toBe(false)
    expect(fn()).toBe(false)
    expect(fn(void 0)).toBe(false)
    expect(fn("")).toBe(false)
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

describe('isBool',()=>{
  const fn = isBool;
  test('should return true for boolean values otherwise false',()=>{
    expect(fn(true)).toBe(true)
    expect(fn(false)).toBe(true)

    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(0)).toBe(false)
    expect(fn(1)).toBe(false)
    expect(fn('')).toBe(false)
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

describe('isStrNotBlank', ()=>{
  const fn = isStrNotBlank;
  test('should return true for not blank str', ()=>{
    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(true)).toBe(false)
    expect(fn(1)).toBe(false)
    expect(fn({})).toBe(false)
    expect(fn('')).toBe(false)
    expect(fn('  ')).toBe(false)
    expect(fn('          ')).toBe(false)

    expect(fn('str')).toBe(true)
    expect(fn('0')).toBe(true)
    expect(fn('1')).toBe(true)
  })
})

describe('isStrOrNumber', () => {
  const fn = isStrOrNumber;
  test('should return true for not empty string of number othewise false', ()=>{
    expect(fn('str')).toBe(true)
    expect(fn(0)).toBe(true)

    expect(fn('')).toBe(false)
    expect(fn(NaN)).toBe(false)
    expect(fn(new String())).toBe(false)
    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn(true)).toBe(false)
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

describe("isFn", ()=>{
  const fn = isFn;
  test('should return true for function value otherwise flase', ()=>{
    expect(fn(fn)).toBe(true)
    expect(fn(()=>{})).toBe(true)

    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn({})).toBe(false)
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

describe('isEmpty', ()=>{
  const fn = isEmpty;
  test('for {} should return true', ()=>{
    expect(fn({})).toBe(true)
  })
  test('for obj with prop should return false', ()=>{
    expect(fn({a: 'a'})).toBe(false)
  })

  test('for null should return true', ()=>{
    expect(fn(null)).toBe(true)
  })
  test('for undefined should return true', ()=>{
    expect(fn()).toBe(true)
  })
})

describe('getObjectKeys',()=>{
  const fn = getObjectKeys;
  test('should return array with argument object keys', ()=>{
    expect(fn({a: 1, b: 2})).toEqual(['a', 'b'])
    expect(fn({})).toEqual([])
  })
  test('should return empty array in edge cases', ()=>{
    expect(fn({})).toEqual([])
    expect(fn(null)).toEqual([])
    expect(fn([1,2,3])).toEqual([])
    expect(fn([])).toEqual([])
    expect(fn(void 0)).toEqual([])
    expect(fn('str')).toEqual([])
    expect(fn('')).toEqual([])
  })
})

describe('parseIntBy10', ()=>{
  const fn = parseIntBy10;
  test('should return number', ()=>{
    expect(fn("0")).toBe(0)
    expect(fn(0)).toBe(0)
    expect(fn("1")).toBe(1)
    expect(fn(1)).toBe(1)
    expect(fn("10")).toBe(10)
    expect(fn(10)).toBe(10)
    expect(fn("100")).toBe(100)
    expect(fn(100)).toBe(100)
})
})
