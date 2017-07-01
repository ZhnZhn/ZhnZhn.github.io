'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnFetchToChart = exports.fnFetchToChartComp = exports.loadBarchart = undefined;

var _fnJsonp = require('../../utils/fnJsonp');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _BarchartApi = require('../../api/BarchartApi');

var _BarchartApi2 = _interopRequireDefault(_BarchartApi);

var _BarchartAdapter = require('../../adapters/barchart/BarchartAdapter');

var _BarchartAdapter2 = _interopRequireDefault(_BarchartAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  (0, _fnJsonp.fnFetch)({
    uri: _BarchartApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _BarchartApi2.default.checkResponse,
    onFetch: fnFetchToChartComp,
    onCompleted: onCompleted,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var fnFetchToChartComp = function fnFetchToChartComp(_ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;

  var _BarchartAdapter$toCo = _BarchartAdapter2.default.toConfig(json, option),
      config = _BarchartAdapter$toCo.config;

  onCompleted(option, config);
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  (0, _fnJsonp.fnFetch)({
    uri: _BarchartApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _BarchartApi2.default.checkResponse,
    onFetch: fnFetchToChart,
    onCompleted: onAdded,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var fnFetchToChart = function fnFetchToChart(_ref2) {
  var json = _ref2.json,
      option = _ref2.option,
      onCompleted = _ref2.onCompleted;

  var series = _BarchartAdapter2.default.toSeries(json, option),
      chart = _ChartStore2.default.getActiveChart();

  _ChartFn2.default.addSeriaWithRenderLabel({
    chart: chart, series: series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  });
  onCompleted(option);
};

var loadBarchart = function loadBarchart(option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();
  if (!parentId) {
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
};

exports.loadBarchart = loadBarchart;
exports.fnFetchToChartComp = fnFetchToChartComp;
exports.fnFetchToChart = fnFetchToChart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadBarchart.js.map