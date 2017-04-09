'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _safeFn = require('../safeFn');

var _safeFn2 = _interopRequireDefault(_safeFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('safeFn', function () {
  var obj = {
    fn: function fn() {}
  };
  test('should return fn by propName', function () {
    expect((0, _safeFn2.default)(obj, 'fn')).toBe(obj.fn);
  });

  test('should return fn in edge case', function () {
    expect((0, _typeof3.default)((0, _safeFn2.default)(null, 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)(undefined, 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)('', 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)(true, 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)(1, 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)(NaN, 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)([], 'fn'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)(obj, 'fnNotExisted'))).toBe('function');
    expect((0, _typeof3.default)((0, _safeFn2.default)('fn'))).toBe('function');
  });

  test('should return fn in edge case that return undefined', function () {
    expect((0, _typeof3.default)((0, _safeFn2.default)(obj, 'notExisted')())).toBe('undefined');
  });

  test('should return, with dfValue, fn in edge case that return dfValue', function () {
    var dfValue = 'dfValue',
        fn = (0, _safeFn2.default)(obj, 'notExisted', dfValue);
    expect(fn()).toBe(dfValue);
  });
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\__tests__\safeFn.test.js.map