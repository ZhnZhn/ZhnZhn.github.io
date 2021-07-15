import crFn from '../crFn'

const { crError } = crFn

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
