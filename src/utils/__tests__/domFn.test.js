import {
  escapeStrHtml,
  escapeNumberOr
} from '../domFn';

describe('escapeStrHtml', ()=>{
  const fn = escapeStrHtml;
  test('should escape html string <>&"', ()=>{
    expect(fn('<')).toBe('&lt;')
    expect(fn('>')).toBe('&gt;')
    expect(fn('&')).toBe('&amp;')
    expect(fn('"')).toBe('&quot;')

    expect(fn('<&">')).toBe('&lt;&amp;&quot;&gt;')
  })
  test('should return empty string in edge cases', ()=>{
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
    expect(fn(true)).toBe('')
    expect(fn(false)).toBe('')
    expect(fn(0)).toBe('')
    expect(fn(1)).toBe('')
  })
})

describe('escapeNumberOr', ()=>{
  const fn = escapeNumberOr;
  test('should escape number', ()=>{
    expect(fn(0)).toBe('0')
    expect(fn(1)).toBe('1')
  })

  test('should escape html string <>&"', ()=>{
    expect(fn('<')).toBe('&lt;')
    expect(fn('>')).toBe('&gt;')
    expect(fn('&')).toBe('&amp;')
    expect(fn('"')).toBe('&quot;')

    expect(fn('<&">')).toBe('&lt;&amp;&quot;&gt;')
  })

  test('should return empty string in edge cases', ()=>{
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
    expect(fn(true)).toBe('')
    expect(fn(false)).toBe('')
  })
})
