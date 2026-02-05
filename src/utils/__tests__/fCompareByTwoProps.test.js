import { fCompareByTwoProps } from '../compareBy';

describe('fCompareByTwoProps', ()=>{
  const fn = fCompareByTwoProps;
  test('should create fn for comparing by two props', ()=>{
    const _compare = fn('v', 'id')
    , arr = [
      {v:3, id: 'a'},
      {v:4, id: 'a'},
      {v:1, id: 'a'},
      {v:2, id: 'a2'},
      {v:2, id: 'a1'},
      {v:2, id: 'a1'},
      {v:2, id: 'a3'}
    ]

    expect(typeof _compare).toBe('function')
    expect(arr.sort(_compare)).toEqual([
      {v:1, id: 'a'},
      {v:2, id: 'a1'},
      {v:2, id: 'a1'},
      {v:2, id: 'a2'},
      {v:2, id: 'a3'},
      {v:3, id: 'a'},
      {v:4, id: 'a'}
    ])
  })
})
