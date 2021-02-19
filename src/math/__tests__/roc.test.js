import roc from '../roc'

// ROC (prev:number, next:number) : number
describe('ROC',()=>{
  test('should return rate of change from prev to next fixed by 2', ()=>{
    expect(roc(100, 200)).toBe(100)
    expect(roc(100, 50)).toBe(-50)
    expect(roc(100, 100.01)).toBe(0.01)
    expect(roc(100, 99.99)).toBe(-0.01)

    expect(roc(100, 100.005)).toBe(0.01)
    expect(roc(100, 100.004)).toBe(0)
    expect(roc(100, 100.003)).toBe(0)

    expect(roc(100, 99.997)).toBe(-0)
    expect(roc(100, 99.996)).toBe(-0)
    expect(roc(100, 99.995)).toBe(-0.01)
  })

  test('should return correct value for prev number and next 0', ()=>{
    expect(roc(0, 0)).toBe(0)
    expect(roc(1, 0)).toBe(-100)
    expect(roc(-1, 0)).toBe(100)
  })

  test('should return null for prev value 0 and next not 0 number', ()=>{
    expect(roc(0, 1)).toBe(null)
    expect(roc(0, 2)).toBe(null)
  })

  test('should return null for edge case',()=>{
    expect(roc(null, 10)).toBe(null)
    expect(roc(void 0, 10)).toBe(null)
    expect(roc(NaN, 10)).toBe(null)
    expect(roc('str', 10)).toBe(null)
    expect(roc(false, 10)).toBe(null)
    expect(roc(true, 10)).toBe(null)

    expect(roc(10, null)).toBe(null)
    expect(roc(10, void 0)).toBe(null)
    expect(roc(10, NaN)).toBe(null)
    expect(roc(10, 'str')).toBe(null)
    expect(roc(10, false)).toBe(null)
    expect(roc(10, true)).toBe(null)
  })
})
