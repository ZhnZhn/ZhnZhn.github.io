import ObjUtil from '../ObjUtil';

describe('findInPropArrayByProp', () => {
  test('should return obj', () => {
     const obj = {
             lists: [ {a:1}, {a:2}, {a:3} ]
           }
         , fn = ObjUtil.findInPropArrayByProp('lists', 'a')

     expect(typeof fn).toBe('function')
     expect(fn(obj, 1)).toEqual({a:1})
     expect(fn(obj, 2)).toEqual({a:2})
     expect(fn(obj, 3)).toEqual({a:3})
  })
})
