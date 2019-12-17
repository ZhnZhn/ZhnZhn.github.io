"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _safeFn = _interopRequireDefault(require("../safeFn"));

describe('safeFn', function () {
  var obj = {
    fn: function fn() {}
  };
  test('should return fn by propName', function () {
    expect((0, _safeFn["default"])(obj, 'fn')).toBe(obj.fn);
  });
  test('should return fn in edge case', function () {
    expect(typeof (0, _safeFn["default"])(null, 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])(undefined, 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])('', 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])(true, 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])(1, 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])(NaN, 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])([], 'fn')).toBe('function');
    expect(typeof (0, _safeFn["default"])(obj, 'fnNotExisted')).toBe('function');
    expect(typeof (0, _safeFn["default"])('fn')).toBe('function');
  });
  test('should return fn in edge case that return undefined', function () {
    expect(typeof (0, _safeFn["default"])(obj, 'notExisted')()).toBe('undefined');
  });
  test('should return, with dfValue, fn in edge case that return dfValue', function () {
    var dfValue = 'dfValue',
        fn = (0, _safeFn["default"])(obj, 'notExisted', dfValue);
    expect(fn()).toBe(dfValue);
  });
});
//# sourceMappingURL=safeFn.test.js.map