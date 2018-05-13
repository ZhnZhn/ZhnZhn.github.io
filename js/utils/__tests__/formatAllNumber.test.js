'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _formatAllNumber = require('../formatAllNumber');

var _formatAllNumber2 = _interopRequireDefault(_formatAllNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('formatAllNumber', function () {
  test('for value without decimal should return same as formated str', function () {
    var str1 = (0, _formatAllNumber2.default)(100);
    expect(str1).toBe('100');
    expect(typeof str1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(str1)).toBe('string');

    var str2 = (0, _formatAllNumber2.default)(100000);
    expect(str2).toBe('100 000');
    expect(typeof str2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(str2)).toBe('string');
  });

  test('for value with decimal should return same as formated str', function () {
    var str1 = (0, _formatAllNumber2.default)(100.001);
    expect(str1).toBe('100.001');
    expect(typeof str1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(str1)).toBe('string');

    var str2 = (0, _formatAllNumber2.default)(100000.001);
    expect(str2).toBe('100 000.001');
    expect(typeof str2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(str2)).toBe('string');
  });
});
//# sourceMappingURL=formatAllNumber.test.js.map