'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _r2;

var _Scatter = require('./Scatter');

var _Scatter2 = _interopRequireDefault(_Scatter);

var _toEarningsImpl = require('./toEarningsImpl');

var _toEarningsImpl2 = _interopRequireDefault(_toEarningsImpl);

var _toDividendsImpl = require('./toDividendsImpl');

var _toDividendsImpl2 = _interopRequireDefault(_toDividendsImpl);

var _toChart = require('./toChart');

var _toChart2 = _interopRequireDefault(_toChart);

var _ChartType = require('./ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _r = (_r2 = {
  DF: _toChart2.default
}, (0, _defineProperty3.default)(_r2, _ChartType2.default.ERN, (0, _Scatter2.default)(_toEarningsImpl2.default)), (0, _defineProperty3.default)(_r2, _ChartType2.default.DIV, (0, _Scatter2.default)(_toDividendsImpl2.default)), (0, _defineProperty3.default)(_r2, _ChartType2.default.CHART, _toChart2.default), _r2);

var RouterAdapter = {
  getAdapter: function getAdapter(option) {
    var dfType = option.dfType;

    return _r[dfType] || _r.DF;
  }
};

exports.default = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map