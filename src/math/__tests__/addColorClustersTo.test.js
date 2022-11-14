import addColorClustersTo from '../addColorClustersTo';

const _getPointColor = (
  r,
  index
) => r[index].color;

describe('addColorClustersTo', () => {
  test('should add color clusters to data', () => {
    const data = [
      {y:1},
      {y:1.1},
      {y:2},
      {y:2.1},

      {y:3},{y:3.1},{y:4},{y:4.1},

      {y:5},{y:5.1},{y:6},{y:6.1}
    ]
    , colors = ['a1','b2','c3','d4','e5','f6']
    , _r = addColorClustersTo(data, colors);

    expect(_getPointColor(_r, 0)).toBe(colors[0])
    expect(_getPointColor(_r, 1)).toBe(colors[1])
    expect(_getPointColor(_r, 2)).toBe(colors[2])
    expect(_getPointColor(_r, 3)).toBe(colors[3])

    expect(_getPointColor(_r, 4)).toBe(colors[4])
    expect(_getPointColor(_r, 5)).toBe(colors[4])
    expect(_getPointColor(_r, 6)).toBe(colors[4])
    expect(_getPointColor(_r, 7)).toBe(colors[4])

    expect(_getPointColor(_r, 8)).toBe(colors[5])
    expect(_getPointColor(_r, 9)).toBe(colors[5])
    expect(_getPointColor(_r, 10)).toBe(colors[5])
    expect(_getPointColor(_r, 11)).toBe(colors[5])
  })
})
