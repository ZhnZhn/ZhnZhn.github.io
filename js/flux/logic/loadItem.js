'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(objImpl, option, onCompleted, onFailed) {
  var fnFetch = objImpl.fnFetch,
      api = objImpl.api;

  fnFetch({
    uri: api.getRequestUrl(option),
    option: option,
    onCheckResponse: api.checkResponse,
    onFetch: _fnFetchToChartComp,
    onCompleted: onCompleted,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _fnFetchToChartComp = function _fnFetchToChartComp(_ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;
  var adapter = option.adapter,
      _adapter$toConfig = adapter.toConfig(json, option),
      config = _adapter$toConfig.config;

  onCompleted(option, config);
};

var _loadToChart = function _loadToChart(objImpl, option, onAdded, onFailed) {
  var fnFetch = objImpl.fnFetch,
      api = objImpl.api;

  fnFetch({
    uri: api.getRequestUrl(option),
    option: option,
    onCheckResponse: api.checkResponse,
    onFetch: _fnFetchToChart,
    onCompleted: onAdded,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _fnFetchToChart = function _fnFetchToChart(_ref2) {
  var json = _ref2.json,
      option = _ref2.option,
      onCompleted = _ref2.onCompleted;
  var adapter = option.adapter,
      series = adapter.toSeries(json, option),
      chart = _ChartStore2.default.getActiveChart();


  _ChartFn2.default.addSeriaWithRenderLabel({
    chart: chart, series: series,
    label: option.value,
    hasSecondYAxis: option.hasSecondYAxis
  });
  onCompleted(option);
};

var loadItem = function loadItem(objImpl) {
  return function (option, onCompleted, onAdded, onFailed) {
    var parentId = _ChartStore2.default.isLoadToChart();
    option.adapter = objImpl.adapter;
    if (!parentId) {
      _loadToChartComp(objImpl, option, onCompleted, onFailed);
    } else {
      option.parentId = parentId;
      _loadToChart(objImpl, option, onAdded, onFailed);
    }
  };
};

exports.default = loadItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadItem.js.map