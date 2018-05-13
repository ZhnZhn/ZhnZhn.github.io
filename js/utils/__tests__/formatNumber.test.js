'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _formatNumber = require('../formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('formatNumber', function () {
  test('for value<0.01 should return same as str', function () {
    var str = (0, _formatNumber2.default)(0.009);
    expect(str).toBe('0.009');
    expect(typeof str === 'undefined' ? 'undefined' : (0, _typeof3.default)(str)).toBe('string');
  });

  test('for value>0.01 should return round by 2 decimals as str', function () {
    var str = (0, _formatNumber2.default)(1.009);
    expect(str).toBe('1.01');
    expect(typeof str === 'undefined' ? 'undefined' : (0, _typeof3.default)(str)).toBe('string');
  });
});
//# sourceMappingURL=formatNumber.test.js.map