/**
 * @jest-environment jsdom
 */
"use strict";
import { domSanitize } from '../domSanitize';

describe("domSanitize", () => {
  const fn = domSanitize;
  test('should return empty string for void 0 && null inputs', () => {
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
  })

  test('should sanitize dom string', () => {
    // from dompurify test-cases
    expect(
        fn('<img src=x onerror=alert("test")//>')
    ).toBe('<img src="x">')

    expect(
        fn('<div><a href="javascript:alert(document.title)"><img src="cid:123"/></a></div>')
    ).toBe('<div><a><img src="cid:123"></a></div>')
  })
})
