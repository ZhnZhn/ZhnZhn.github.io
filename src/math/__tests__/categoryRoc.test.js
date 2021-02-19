import categoryRoc from '../categoryRoc'
import categoryHelpers from './categoryHelpers'

const {
  _crP1,
  _crExpectedPoint,
  _crParams
} = categoryHelpers;

// ROC S1 from S2
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

  test('should return arr with null values for not match points', ()=>{
    const sc = '#111', rc = '#222';
    expect(categoryRoc(
      [_crP1('A1', 3, sc)], [], {rc, sc}
    )).toEqual([_crExpectedPoint('A1', null, rc)])
  })
})
