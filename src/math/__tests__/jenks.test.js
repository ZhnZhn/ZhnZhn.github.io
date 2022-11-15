import jenks from '../jenks';

describe('jenks', () => {
  const fn = jenks;
  test('should return array with natural breaks intervals', ()=>{
    const data1 = [
      1,2,4,5,
      7,9,10,
      20
    ];
    expect(fn(data1, 3)).toEqual([
      1, 7, 20, 20
    ])

    const data2 = [
      1,1.1,
      2,2.2,
      3,3.3,
      4,4.4,
      5,5.1,
      6,6.1
    ];
    expect(fn(data2, 6)).toEqual([
      1, 2, 3, 4, 5, 6, 6.1
    ])
  })
  test('should return null in case not enough data', ()=>{
    expect(fn([], 1)).toBe(null)
    expect(fn([1], 2)).toBe(null)
  })

})
