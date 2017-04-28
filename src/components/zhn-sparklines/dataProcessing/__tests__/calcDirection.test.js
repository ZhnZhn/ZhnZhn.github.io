import calcDirection from '../calcDirection'

describe('calcDirection', ()=>{
  const points = [
          { x: 1, y:1 },
          { x: 2, y:2 },
          { x: 3, y:0 },
          { x: 4, y:0 }
        ]
  test('should return y direction', ()=>{
    expect(calcDirection(points, 1)).toBe(-1)
    expect(calcDirection(points, 2)).toBe(1)
    expect(calcDirection(points, 3)).toBe(0)
  })

  test('should return 0 for index 0', ()=>{
    expect(calcDirection(points, 0)).toBe(0)
  })

  test('should return 0 for array with one point', ()=>{
    expect(calcDirection([{ x: 1, y:1}], 2)).toBe(0)
  })
})
