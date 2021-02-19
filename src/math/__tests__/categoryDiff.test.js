import categoryDiff from '../categoryDiff'
import categoryHelpers from './categoryHelpers'

const {
  _crParams,
  _crP1,
  _crExpectedPoint
} = categoryHelpers;

//Diff S1-S2
describe('categoryDiff', ()=>{
  const sc = '#111', rc = '#222';
  test('should return array with correct diff values', ()=>{
    const [d1, d2, expectedResult] = _crParams([
       ['P1', 10, 5, 5],
       ['P2', 10, 0, 10],
       ['P3', 10, null, 0]
    ], {sc, rc});
    expect(categoryDiff(d1, d2, {sc, rc}))
      .toEqual(expectedResult)
  })

  test('should return arr with 0 y values for not match points', ()=>{
    expect(categoryDiff(
      [_crP1('A1', 10, sc)], [], {sc, rc}))
    .toEqual([_crExpectedPoint('A1', 0, rc)])
  })
})
