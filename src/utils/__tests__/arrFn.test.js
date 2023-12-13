import {
  arrFactoryFindIndexByProp,
  arrFactoryIsSameByProp,
  isInArrStr,
  joinBy
} from '../arrFn';

const propName = 'caption'
, propValue1 = 'caption1'
, propValue2 = 'caption2'
, arr = [
  { [propName] : propValue1 },
  { [propName]:  propValue2 }
];

describe('arrFactoryFindIndexByProp', ( )=> {
   const fn = arrFactoryFindIndexByProp(propName)

   test('should return function', () => {
     expect(typeof fn).toBe('function')
   })

   test('should return index by prop', () => {
      expect(fn(arr, propValue1)).toBe(0)
      expect(fn(arr, propValue2)).toBe(1)
   })

   test('should return -1 in edge cases', () => {
      const fnEdgeCase = arrFactoryFindIndexByProp('notexist')
      expect(fn(arr, 'notexist')).toBe(-1)
      expect(fnEdgeCase(arr, propValue1)).toBe(-1)
      expect(fnEdgeCase({}, propValue1)).toBe(-1)
   })
})

describe('arrFactoryIsSameByProp', () => {
   const fn = arrFactoryIsSameByProp(propName)

   test('should return function', () => {
     expect(typeof fn).toBe('function')
   })

   test('should return is same by prop', ()=> {
     expect(fn(arr, propValue1)).toBe(true)
     expect(fn(arr, propValue2)).toBe(true)
     expect(fn(arr, 'notexist')).toBe(false)
   })

   test('should return false in edge cases', () => {
      const fnEdgeCase = arrFactoryIsSameByProp('notexist')
      expect(fn(arr, 'notexist')).toBe(false)
      expect(fnEdgeCase(arr, propValue1)).toBe(false)
      expect(fnEdgeCase({}, propValue1)).toBe(false)
   })
})

describe('isInArrStr', () => {
  const arr = ['test1', 'test2', 'test3']
      , isTest = isInArrStr(arr);

   test('should return function', () => {
      expect(typeof isTest).toBe('function')
   })
   test('should return true if str in array', ()=> {
     expect(isTest('test1')).toBe(true)
     expect(isTest('test3')).toBe(true)
   })
   test('should return false if str not in array', ()=> {
     expect(isTest('test5')).toBe(false)
     expect(isTest('7')).toBe(false)
   })
   test('should return false in edge case', () => {
      const _isTest1 = isInArrStr()
          , _isTest2 = isInArrStr({})
      expect(_isTest1('test1')).toBe(false)
      expect(_isTest2('test1')).toBe(false)
   })
})

describe('joinBy', () => {
  test('should join by delimeter', () => {
    expect(joinBy('.')).toBe('')
    expect(joinBy('.', 'a')).toBe('a')
    expect(joinBy('.', 'a', 'b')).toBe('a.b')
  })
  test('should filter falsy values', () => {
    expect(joinBy('.', '', 'b', 'c')).toBe('b.c')
    expect(joinBy('.', null, 'b', 'c')).toBe('b.c')
    expect(joinBy('.', void 0, 'b', 'c')).toBe('b.c')
  })
})
