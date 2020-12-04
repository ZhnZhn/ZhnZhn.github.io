"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toLink = _interopRequireDefault(require("../toLink"));

describe('toLink', function () {
  test('should return echo for https protocol', function () {
    var href = 'https://example.com';
    expect((0, _toLink["default"])(href)).toBe(href);
  });
  test('should return empty string for not https protocol', function () {
    expect((0, _toLink["default"])('http://example.com')).toBe('');
    expect((0, _toLink["default"])('http:/example.com')).toBe('');
    expect((0, _toLink["default"])('some-protocol://example.com')).toBe('');
    expect((0, _toLink["default"])('')).toBe('');
    expect((0, _toLink["default"])(' ')).toBe('');
  });
});
//# sourceMappingURL=toLink.test.js.map