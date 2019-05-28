import seriaFn from '../seriaFn'

const { growthRate } = seriaFn;

const _crInArr = (arr) => arr
  .map((v, i) => ({ x: i+1, y: v }));
const _crOutArr = (arr) => arr
  .map((v, i) => ([ i+2, v]));

describe('calc seria growRate', ()=>{
  const fn = growthRate;
  test('should return empty arr on empty args', ()=>{
    expect(fn()).toEqual([])
  })
  test('should return empty arr on empty arr', ()=>{
    expect(fn([])).toEqual([])
  })
  test('should return empty arr on only one point', ()=>{
    expect(fn([{ x: 1, y: 1 }])).toEqual([])
  })
  test('should return empty arr on not arr args', ()=>{
    expect(fn('')).toEqual([])
    expect(fn(null)).toEqual([])
    expect(fn(4.5)).toEqual([])
    expect(fn(()=>{})).toEqual([])
  })

  test('should calc growthRate by 0, 0', ()=>{
    const _dIn = _crInArr([1.0001, 1.0001, 1.0001])
        , _dOut = _crOutArr([0, 0])
        , _dR = fn(_dIn);
    _dR.forEach((p, i) => {
      expect(p).toEqual(_dOut[i])
    })
  })

  test('should calc growthRate by 100, 50', ()=>{
    const _dIn = _crInArr([1.00001, 2.00002, 3.00003])
        , _dOut = _crOutArr([100, 50])
        , _dR = fn(_dIn);
    _dR.forEach((p, i) => {
      expect(p).toEqual(_dOut[i])
    })
  })

  test('should calc growthRate with presicion of 2 digits by -33.33, -49.75', ()=>{
    const _dIn = _crInArr([3.00003, 2.00002, 1.005])
       , _dOut = _crOutArr([-33.33, -49.75])
       , _dR = fn(_dIn);
    _dR.forEach((p, i) => {
      expect(p).toEqual(_dOut[i])
    })
  })
  test('should calc growthRate with presicion of 2 digits by 0.01, 0', ()=>{
    const _dIn = _crInArr([100, 100.01, 100.011])
        , _dOut = _crOutArr([0.01, 0])
        , _dR = fn(_dIn);
    _dR.forEach((p, i) => {
      expect(p).toEqual(_dOut[i])
    })
  })

  test('should fill to null for zero old values', ()=>{
    const _dIn = _crInArr([0, 0, 1, 1])
        , _dOut = _crOutArr([null, null, 0])
        , _dR = fn(_dIn)
    _dR.forEach((p, i) => {
      expect(p).toEqual(_dOut[i])
    })
  })

})
