'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadEuroStat = undefined;

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _EuroStatApi = require('../../api/EuroStatApi');

var _EuroStatApi2 = _interopRequireDefault(_EuroStatApi);

var _EuroStatAdapter = require('../../adapters/eurostat/EuroStatAdapter');

var _EuroStatAdapter2 = _interopRequireDefault(_EuroStatAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  (0, _fn.fnFetch)({
    uri: _EuroStatApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _EuroStatApi2.default.checkResponse,
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

  var config = _EuroStatAdapter2.default.toConfig(json, option);
  if (typeof config.then !== 'function') {
    onCompleted(option, config);
  } else {
    config.then(function (config) {
      onCompleted(option, config);
      return undefined;
    });
  }
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  (0, _fn.fnFetch)({
    uri: _EuroStatApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _EuroStatApi2.default.checkResponse,
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

  var chart = _ChartStore2.default.getActiveChart(),
      series = _EuroStatAdapter2.default.toSeries(json, option, chart);

  _ChartFn2.default.addSeriaWithRenderLabel(chart, series, option.itemCaption);
  onCompleted(option);
};

var loadEuroStat = function loadEuroStat(option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();

  if (!parentId) {
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
};

exports.loadEuroStat = loadEuroStat;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadEuroStat.js.map