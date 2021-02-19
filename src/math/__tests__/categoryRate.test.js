import categoryRate from '../categoryRate'
import categoryHelpers from './categoryHelpers'

const {
  _crParams,
  _crP1,
  _crExpectedPoint
} = categoryHelpers

//Rate S1/S2
describe('categoryRate', ()=>{
  const sc = '#111', rc = '#222';
  test('should return array with rate S1/S values', ()=>{
    const [d1, d2, expectedResult] = _crParams([
      ['P1', 10, 5, 2],
      ['P2', 10, 0, 0],
    ], {sc, rc})
    expect(categoryRate(d1, d2, {sc, rc}))
      .toEqual(expectedResult)
  })
  test('should return arr with 0 values for not match points',()=>{
    expect(categoryRate(
      [_crP1('A1', 10, sc)], [], {sc, rc}
    )).toEqual([_crExpectedPoint('A1',0, rc)])
  })
})
