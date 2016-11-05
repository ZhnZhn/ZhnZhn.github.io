'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnFetchToChart = exports.fnFetchToChartComp = exports.loadQuandl = undefined;

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  (0, _fn.fnFetch)({
    uri: _QuandlApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _QuandlApi2.default.checkResponse,
    onFetch: fnFetchToChartComp,
    onCompleted: onCompleted,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var fnFetchToChartComp = function fnFetchToChartComp(_ref) {
  var json = _ref.json;
  var option = _ref.option;
  var onCompleted = _ref.onCompleted;

  var _QuandlAdapter$toConf = _QuandlAdapter2.default.toConfig(json, option);

  var config = _QuandlAdapter$toConf.config;

  onCompleted(option, config);
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  (0, _fn.fnFetch)({
    uri: _QuandlApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _QuandlApi2.default.checkResponse,
    onFetch: fnFetchToChart,
    onCompleted: onAdded,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var fnFetchToChart = function fnFetchToChart(_ref2) {
  var json = _ref2.json;
  var option = _ref2.option;
  var onCompleted = _ref2.onCompleted;

  var series = _QuandlAdapter2.default.toSeries(json, option),
      chart = _ChartStore2.default.getActiveChart();

  _ChartFn2.default.addSeriaWithRenderLabel(chart, series, option.value);
  onCompleted(option);
};

var loadQuandl = function loadQuandl(option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();
  if (!parentId) {
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
};

exports.loadQuandl = loadQuandl;
exports.fnFetchToChartComp = fnFetchToChartComp;
exports.fnFetchToChart = fnFetchToChart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadQuandl.js.map