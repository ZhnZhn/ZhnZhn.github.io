import ArrayUtil from '../ArrayUtil';

const propName = 'caption'
    , propValue1 = 'caption1'
    , propValue2 = 'caption2'
    , arr = [
      { [propName] : propValue1 },
      { [propName]:  propValue2 }
    ]

describe('findIndexByProp', ( )=> {
   const fn = ArrayUtil.findIndexByProp(propName)

   test('should return function', () => {
     expect(typeof fn).toBe('function')
   })

   test('should return index by prop', () => {
      expect(fn(arr, propValue1)).toBe(0)
      expect(fn(arr, propValue2)).toBe(1)
   })

   test('should return -1 in edge cases', () => {
      const fnEdgeCase = ArrayUtil.findIndexByProp('notexist')
      expect(fn(arr, 'notexist')).toBe(-1)
      expect(fnEdgeCase(arr, propValue1)).toBe(-1)
      expect(fnEdgeCase({}, propValue1)).toBe(-1)
   })

})

describe('isSameByProp', () => {
   const fn = ArrayUtil.isSameByProp(propName)

   test('should return function', () => {
     expect(typeof fn).toBe('function')
   })

   test('should return is same by prop', ()=> {
     expect(fn(arr, propValue1)).toBe(true)
     expect(fn(arr, propValue2)).toBe(true)
     expect(fn(arr, 'notexist')).toBe(false)
   })

   test('should return false in edge cases', () => {
      const fnEdgeCase = ArrayUtil.isSameByProp('notexist')
      expect(fn(arr, 'notexist')).toBe(false)
      expect(fnEdgeCase(arr, propValue1)).toBe(false)
      expect(fnEdgeCase({}, propValue1)).toBe(false)
   })
})

describe('isStrInArr', () => {
  const arr = [ 'test1', 'test2', 'test3' ]
      , fnTrue = ArrayUtil.isStrInArr('test1')
      , fnFalse = ArrayUtil.isStrInArr('test4')

   test('should return function', () => {
      expect(typeof fnTrue).toBe('function')
      expect(typeof fnFalse).toBe('function')
   })
   test('should return bool is str in array', ()=> {
     expect(fnTrue(arr)).toBe(true)
     expect(fnFalse(arr)).toBe(false)
   })
   test('should return false in edge case', () => {
      expect(fnTrue({})).toBe(false)
      expect(fnFalse('')).toBe(false)
   })
})
