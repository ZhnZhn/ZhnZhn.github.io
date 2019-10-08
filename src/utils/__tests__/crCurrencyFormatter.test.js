import crCurrencyFormatter from '../crCurrencyFormatter'

describe('crCurrencyFormatter', () => {
  const f = crCurrencyFormatter();
  test('should correct format with default settings', ()=>{
    expect(f.format(1)).toBe('$1.00')
    expect(f.format(1000)).toBe('$1,000.00')
    expect(f.format(0)).toBe('$0.00')
  })
  test('should format as 0 for undefined, null', () => {
    expect(f.format(0)).toBe('$0.00')
    expect(f.format()).toBe('$0.00')
    expect(f.format(null)).toBe('$0.00')
  })
  test('should pass options properties to formatter', () => {
     const _f = crCurrencyFormatter({
       minimumFractionDigits: 0,
       maximumFractionDigits: 0
     });
     expect(_f.format(0.00)).toBe('$0')
     expect(_f.format(1.00)).toBe('$1')
     expect(_f.format()).toBe('$0')
     expect(_f.format(null)).toBe('$0')
  })
})
