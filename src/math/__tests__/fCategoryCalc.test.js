import fCategoryCalc from '../fCategoryCalc'

const _crP1 = (category, color) => ({
  color, y: 1, category
})
, _crP2 = (category) => ({
  y: 1, category
})
, _crExpectedPoint = (c, color) => ({
  color,
  y: 1, c, id: c,
  status: void 0
});

const _crParams = arr => {
  const d1 = [], d2 = [], expectedResult = [];
  arr.forEach(([category, sc, rc]) => {
    d1.push(_crP1(category, sc))
    d2.push(_crP2(category))
    expectedResult.push(_crExpectedPoint(category, rc))
  })
  return [d1, d2, expectedResult];
};

describe('fCategoryCalc', ()=>{
  const calc = (p1, p2) => p1.y
  , fn =  fCategoryCalc(calc)
  , sc = '#111', rc = '#222'
  , [d1, d2, expectedResult] = _crParams([
      ['P1', sc, rc],
      ['P2', '#aaa', '#aaa'],
      ['P3', rc, rc]
  ]);

  test('should return fn', ()=>{
    expect(typeof fn).toBe('function')
  })

  test('should only replace sc color by rc for points', ()=>{
    expect(fn(d1, d2, {sc, rc}))
      .toEqual(expectedResult)
  })

  test('should only replace sc color by rc for not match points',()=>{
    expect(fn(d1, [], {sc, rc}))
       .toEqual(expectedResult)
  })
})
