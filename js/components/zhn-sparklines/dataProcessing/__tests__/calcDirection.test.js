'use strict';

var _calcDirection = require('../calcDirection');

var _calcDirection2 = _interopRequireDefault(_calcDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('calcDirection', function () {
  var points = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 0 }, { x: 4, y: 0 }];
  test('should return y direction', function () {
    expect((0, _calcDirection2.default)(points, 1)).toBe(-1);
    expect((0, _calcDirection2.default)(points, 2)).toBe(1);
    expect((0, _calcDirection2.default)(points, 3)).toBe(0);
  });

  test('should return 0 for index 0', function () {
    expect((0, _calcDirection2.default)(points, 0)).toBe(0);
  });

  test('should return 0 for array with one point', function () {
    expect((0, _calcDirection2.default)([{ x: 1, y: 1 }], 2)).toBe(0);
  });
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\dataProcessing\__tests__\calcDirection.test.js.map