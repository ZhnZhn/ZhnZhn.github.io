import crStyle from '../crStyle'

describe('crStyle', ()=>{
  const fn = crStyle
  it('should create style from arr', ()=>{
    const _s1 = { width: 10 }
    , _s2 = { width: 20, height: 20 };

    expect(fn()).toEqual({})
    expect(fn([])).toEqual({})
    expect(fn([_s1, _s2]))
      .toEqual({..._s1, ..._s2})
    expect(fn([_s1, false, null, void 0, NaN, '', _s2]))
      .toEqual({..._s1, ..._s2})
  })
})
