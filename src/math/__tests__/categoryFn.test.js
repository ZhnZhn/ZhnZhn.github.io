import categoryHelpers from './categoryHelpers';
import {
  categoryDiff,
  categoryRate,
  categoryRoc
}
from '../categoryFn';

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

//Rate S1/S2
describe('categoryRate', ()=>{
  const sc = '#111', rc = '#222';
  test('should return array with rate S1/S2 values', ()=>{
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
