import { toHref } from '../uiApi';

describe('toHref', () => {
  const fn = toHref;
  test('should return echo for https protocol', () => {
    const href = 'https://example.com';
    expect(fn(href)).toBe(href)
  })
  test('should return echo for http protocol with isHttp', () => {
    const href = 'http://example.com';
    expect(fn(href, true)).toBe(href)
  })
  test('should return undefined for not https protocol', () => {
    expect(fn('http://example.com')).toBeUndefined()
    expect(fn('http:/example.com')).toBeUndefined()
    expect(fn('some-protocol://example.com')).toBeUndefined()
    expect(fn('')).toBeUndefined()
    expect(fn(' ')).toBeUndefined()
  })
})
