import categoryRate from '../categoryRate'

describe('categoryRate', ()=>{
  test('should return array with calculated values', ()=>{
    const sc = 'blue', rc = 'green';
    expect(categoryRate([
      {y: 10, category: 'A', color: sc },
      {y: 10, category: 'B', color: 'cayn' }
    ],[
      {y: 5, category: 'A'},
      {y: 0, category: 'B'}
    ],
      { rc, sc }
    )).toEqual([
      {y: 2, id: 'A', c: 'A', color: rc, status: void 0 },
      {y: 0, id: 'B', c: 'B', color: 'cayn', status: void 0 }
    ])
  })
})
