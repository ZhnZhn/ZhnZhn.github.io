import fn from '../toLink'

describe('toLink', ()=>{
  test('should return echo for https protocol', ()=>{
    const href = 'https://example.com';
    expect(fn(href)).toBe(href)
  })
  test('should return empty string for not https protocol', ()=>{
    expect(fn('http://example.com')).toBe('')
    expect(fn('http:/example.com')).toBe('')
    expect(fn('some-protocol://example.com')).toBe('')
    expect(fn('')).toBe('')
    expect(fn(' ')).toBe('')
  })
})
