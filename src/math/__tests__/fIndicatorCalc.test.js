import fIndicatorCalc from '../fIndicatorCalc'

describe('fIndicatorCalc', ()=>{
  const calc = (prevY, nextY) => prevY+nextY
  , fn = fIndicatorCalc(calc);

  test('should retun function', ()=>{
    expect(typeof fn).toBe('function')
  })

  test('should use by default rt=1 and return arr with arr values', ()=>{
    expect(fn([[100, 1], [200, 2]]))
      .toEqual([[200, 3]])
    expect(fn([{x:100, y:1}, {x:200, y:2}]))
      .toEqual([[200, 3]])
  })
  test('should use rt and return arr with arr values', ()=>{
    expect(fn([[100, 1], [200, 2], [300, 3]], 2))
      .toEqual([[300, 4]])
    expect(fn([{x:100, y:1}, {x:200, y:2}, {x:300, y:3}], 2))
      .toEqual([[300, 4]])
  })

  test('should return empty arr in edge case for data', ()=>{
    expect(fn()).toEqual([])
    expect(fn(null)).toEqual([])
    expect(fn([])).toEqual([])
    expect(fn([null, void 0, 'str', 1, false])).toEqual([])
  })
  test('should return empty arr in edge case for rt', () => {
    expect(fn([[100, 1], [200, 2]], 'str')).toEqual([])
    expect(fn([[100, 1], [200, 2]], true)).toEqual([])
    expect(fn([[100, 1], [200, 2]], null)).toEqual([])

    expect(fn([[100, 1], [200, 2]], 2)).toEqual([])
    expect(fn([[100, 1], [200, 2]], '2')).toEqual([])

    expect(fn([[100, 1], [200, 2]], -1)).toEqual([])
    expect(fn([[100, 1], [200, 2]], '-1')).toEqual([])
  })
})
