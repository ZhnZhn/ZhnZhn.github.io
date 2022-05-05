import { crHm, crError } from '../crFn';

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
