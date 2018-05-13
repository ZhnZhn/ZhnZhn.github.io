'use strict';

var _isEmpty = require('../isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('isEmpty', function () {
  test('for {} should return true', function () {
    expect((0, _isEmpty2.default)({})).toBe(true);
  });
  test('for obj with prop should return false', function () {
    expect((0, _isEmpty2.default)({ a: 'a' })).toBe(false);
  });

  test('for null should return true', function () {
    expect((0, _isEmpty2.default)(null)).toBe(true);
  });
  test('for undefined should return true', function () {
    expect((0, _isEmpty2.default)()).toBe(true);
  });
});
//# sourceMappingURL=isEmpty.test.js.map