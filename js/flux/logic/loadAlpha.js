'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnFetchToChart = exports.fnFetchToChartComp = exports.loadAlpha = undefined;

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _AlphaApi = require('../../api/AlphaApi');

var _AlphaApi2 = _interopRequireDefault(_AlphaApi);

var _AlphaAdapter = require('../../adapters/alpha/AlphaAdapter');

var _AlphaAdapter2 = _interopRequireDefault(_AlphaAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  (0, _fn.fnFetch)({
    uri: _AlphaApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _AlphaApi2.default.checkResponse,
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

  var _AlphaAdapter$toConfi = _AlphaAdapter2.default.toConfig(json, option),
      config = _AlphaAdapter$toConfi.config;

  onCompleted(option, config);
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  (0, _fn.fnFetch)({
    uri: _AlphaApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _AlphaApi2.default.checkResponse,
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

  var series = _AlphaAdapter2.default.toSeries(json, option),
      chart = _ChartStore2.default.getActiveChart();

  _ChartFn2.default.addSeriaWithRenderLabel({
    chart: chart, series: series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  });
  onCompleted(option);
};

var loadAlpha = function loadAlpha(option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();
  if (!parentId) {
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
};

exports.loadAlpha = loadAlpha;
exports.fnFetchToChartComp = fnFetchToChartComp;
exports.fnFetchToChart = fnFetchToChart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadAlpha.js.map