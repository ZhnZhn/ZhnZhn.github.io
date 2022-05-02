import diff from '../diff';

describe('diff', () => {
  const calc = diff;
  test('should calc diff', () => {
    expect(calc(100, 50)).toBe(50)
    expect(calc(50, 100)).toBe(-50)
    expect(calc(0.000004, 0.000003)).toBe(0.000001)
  })
})
