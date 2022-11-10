import {
  arrangeSeriaByCategories
} from '../CategoryFn';

describe('arrangeSeriaByCategories', () =>{
  const fn = arrangeSeriaByCategories;
  test('should arrange seria data by categories', ()=>{
    const categories = ['a1','a2','a3']
    , seria = { data: [
      {'c': 'a3'}, {c: 'a4'}, {c: 'a1'}
    ]}
    expect(fn(seria, categories)).toEqual({
      data: [
        {c: 'a1'}, null, {c: 'a3'}
      ]
    })
  })
})
