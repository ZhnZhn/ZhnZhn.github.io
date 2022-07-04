"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _domSanitize = _interopRequireDefault(require("../domSanitize"));

describe("domSanitize", () => {
  const fn = _domSanitize.default;
  test('should return empty string for void 0 && null inputs', () => {
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
  });
  test('should sanitize dom string', () => {
    // from dompurify test-cases
    expect(fn('<img src=x onerror=alert("test")//>')).toBe('<img src="x">');
    expect(fn('<div><a href="javascript:alert(document.title)"><img src="cid:123"/></a></div>')).toBe('<div><a><img src="cid:123"></a></div>');
  });
});
//# sourceMappingURL=domSanitize.test.js.map