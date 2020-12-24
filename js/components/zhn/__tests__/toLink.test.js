"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toLink = _interopRequireDefault(require("../toLink"));

describe('toLink', function () {
  test('should return echo for https protocol', function () {
    var href = 'https://example.com';
    expect((0, _toLink["default"])(href)).toBe(href);
  });
  test('should return echo for http protocol with isHttp', function () {
    var href = 'http://example.com';
    expect((0, _toLink["default"])(href, true)).toBe(href);
  });
  test('should return undefined for not https protocol', function () {
    expect((0, _toLink["default"])('http://example.com')).toBeUndefined();
    expect((0, _toLink["default"])('http:/example.com')).toBeUndefined();
    expect((0, _toLink["default"])('some-protocol://example.com')).toBeUndefined();
    expect((0, _toLink["default"])('')).toBeUndefined();
    expect((0, _toLink["default"])(' ')).toBeUndefined();
  });
});
//# sourceMappingURL=toLink.test.js.map