import fnArr from '../fnArr';

const {
  findIndexByProp,
  isSameByProp
} = fnArr;

const propName = 'caption'
    , propValue1 = 'caption1'
    , propValue2 = 'caption2'
    , arr = [
      { [propName] : propValue1 },
      { [propName]:  propValue2 }
    ];

describe('findIndexByProp', ( )=> {
   const fn = findIndexByProp(propName)

   test('should return function', () => {
     expect(typeof fn).toBe('function')
   })

   test('should return index by prop', () => {
      expect(fn(arr, propValue1)).toBe(0)
      expect(fn(arr, propValue2)).toBe(1)
   })

   test('should return -1 in edge cases', () => {
      const fnEdgeCase = findIndexByProp('notexist')
      expect(fn(arr, 'notexist')).toBe(-1)
      expect(fnEdgeCase(arr, propValue1)).toBe(-1)
      expect(fnEdgeCase({}, propValue1)).toBe(-1)
   })

})

describe('isSameByProp', () => {
   const fn = isSameByProp(propName)

   test('should return function', () => {
     expect(typeof fn).toBe('function')
   })

   test('should return is same by prop', ()=> {
     expect(fn(arr, propValue1)).toBe(true)
     expect(fn(arr, propValue2)).toBe(true)
     expect(fn(arr, 'notexist')).toBe(false)
   })

   test('should return false in edge cases', () => {
      const fnEdgeCase = isSameByProp('notexist')
      expect(fn(arr, 'notexist')).toBe(false)
      expect(fnEdgeCase(arr, propValue1)).toBe(false)
      expect(fnEdgeCase({}, propValue1)).toBe(false)
   })
})
