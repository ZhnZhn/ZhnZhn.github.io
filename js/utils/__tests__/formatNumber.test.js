'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _formatNumber = require('../formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('formatNumber', function () {
  test('for -0.01<value<0.01 should return same as str', function () {
    var str1 = (0, _formatNumber2.default)(0.009);
    expect(str1).toBe('0.009');
    expect(typeof str1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(str1)).toBe('string');
    var str2 = (0, _formatNumber2.default)(-0.009);
    expect(str2).toBe('-0.009');
    expect(typeof str2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(str2)).toBe('string');
  });

  test('for value>0.01 should return round by 2 decimals as str', function () {
    var str = (0, _formatNumber2.default)(1.009);
    expect(str).toBe('1.01');
    expect(typeof str === 'undefined' ? 'undefined' : (0, _typeof3.default)(str)).toBe('string');
  });
});
//# sourceMappingURL=formatNumber.test.js.map