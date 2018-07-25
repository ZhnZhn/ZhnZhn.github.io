'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Scatter = require('./Scatter');

var _Scatter2 = _interopRequireDefault(_Scatter);

var _toEarningsImpl = require('./toEarningsImpl');

var _toEarningsImpl2 = _interopRequireDefault(_toEarningsImpl);

var _toDividendsImpl = require('./toDividendsImpl');

var _toDividendsImpl2 = _interopRequireDefault(_toDividendsImpl);

var _toChart = require('./toChart');

var _toChart2 = _interopRequireDefault(_toChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _r = {
  DF: _toChart2.default,
  earnings: (0, _Scatter2.default)(_toEarningsImpl2.default),
  dividends: (0, _Scatter2.default)(_toDividendsImpl2.default),
  chart: _toChart2.default
};

var RouterAdapter = {
  getAdapter: function getAdapter(option) {
    var dfType = option.dfType;

    return _r[dfType] || _r.DF;
  }
};

exports.default = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map