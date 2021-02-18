import categoryRoc from '../categoryRoc'

const _crP1 = (category, y, color) => ({
  y, category, color
})
, _crP2 = (category, y) => ({
  y, category
}),
_crExpectedPoint = (c, y, color) => ({
  y, c, color,
  id: c,
  status: void 0
});

//'P1', 10, 5, 100
const _crParams = (arr, {sc, rc}) => {
  const d1 = [], d2 = [], expectedResult = [];
  arr.forEach(p => {
    d1.push(_crP1(p[0], p[1], sc))
    d2.push(_crP2(p[0], p[2]))
    expectedResult.push(_crExpectedPoint(p[0], p[3], rc))
  })
  return [d1, d2, expectedResult];
}

describe('categoryRoc',()=>{
  test('should return arr with correct roc values',()=>{
    const sc = '#111', rc = '#222'
    , [d1, d2, expectedResult] = _crParams([
      ['P1', 10, 5, 100],
      ['P2', 9, 6, 50],
      ['P3', 5, 10, -50],
      ['P4', 0, 9, -100],
      ['P5', 100.01, 100, 0.01],
      ['P6', 99.99, 100, -0.01],
      ['P7', 0, 1, -100],
      ['P8', 0, -1, 100],
    ], {sc, rc});
    expect(
      categoryRoc(d1, d2, {sc, rc})
    ).toEqual(expectedResult)
  })


  test('should return arr with correct roc values for edge case', ()=>{
    const sc = '#111', rc = '#222';
    expect(categoryRoc([
      _crP1('P1', 3, sc)
    ], [], {rc, sc}
    )).toEqual([
      _crExpectedPoint('P1', null, rc)
    ])
  })
})
