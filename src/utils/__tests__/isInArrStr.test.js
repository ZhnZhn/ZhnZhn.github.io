import isInArrStr from '../isInArrStr';

describe('isInArrStr', () => {
  const arr = [ 'test1', 'test2', 'test3' ]
      , isTest = isInArrStr(arr)

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
