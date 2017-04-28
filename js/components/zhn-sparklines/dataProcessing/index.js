'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hm = undefined;

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _min = require('./min');

var _min2 = _interopRequireDefault(_min);

var _mean = require('./mean');

var _mean2 = _interopRequireDefault(_mean);

var _median = require('./median');

var _median2 = _interopRequireDefault(_median);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hm = exports.hm = {
  max: _max2.default,
  min: _min2.default,
  mean: _mean2.default,
  avg: _mean2.default,
  median: _median2.default
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\dataProcessing\index.js.map