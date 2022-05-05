import {
  crHm,
  crError,
  crItemConf,
  crValueConf
} from '../crFn';

describe('crError', ()=>{
  const fn = crError
  it('should create err obj', ()=>{
    expect(fn('caption', 'msg')).toEqual({
      errCaption: 'caption',
      message: 'msg'
    })
  })
  it('should replace void 0 values by default values', ()=>{
    expect(fn()).toEqual({
      errCaption: '',
      message: 'No data available for request.'
    })
  })
})

describe('crHm', ()=>{
  it('should create object with null prototype', ()=>{
    const hm = crHm();
    expect(Object.getPrototypeOf(hm)).toBe(null)
    expect(hm.toString).toBe(void 0)
    expect(hm.valueOf).toBe(void 0)
  })
  it('should add props from arg', ()=>{
    const props = { a: 'a', b: 'b'};
    expect(crHm(props)).toEqual(props)
  })
})

describe('crItemConf', ()=>{
  const fn = crItemConf
  it('should create obj with item conf', ()=>{
    expect(fn({
      title: 'title',
      subtitle: null,
      itemCaption: void 0
    })).toEqual({
      title: 'title'
    })
  })
})

describe('crValueConf', ()=>{
  const fn = crValueConf
  it('should return {x, y} recent point from data', ()=>{
    expect(fn([[3, 3], [1, 2]])).toEqual({ x: 1, y: 2 })
    expect(fn([{x:3, y:3}, {x:1, y:2}])).toEqual({ x: 1, y: 2 })
  })
  it('should use str 0.0 for y not number', ()=>{
    expect(fn([[3, 3], [1, null]])).toEqual({ x: 1, y: '0.0' })
    expect(fn([{x:3, y:3}, {x:1, y:NaN}])).toEqual({ x: 1, y: '0.0' })
  })
})
