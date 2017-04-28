'use strict';

var _mean = require('../mean');

var _mean2 = _interopRequireDefault(_mean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//fork https://github.com/borisyankov/react-sparklines/blob/master/__tests__/mean.js

describe('mean', function () {
  test('should return average of values', function () {
    expect((0, _mean2.default)([0])).toBe(0);
    expect((0, _mean2.default)([0, 1])).toBe(0.5);
    expect((0, _mean2.default)([1, 2])).toBe(3 / 2);
    expect((0, _mean2.default)([0, 1, 2])).toBe(1);
  });
});
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\dataProcessing\__tests__\mean.test.js.map