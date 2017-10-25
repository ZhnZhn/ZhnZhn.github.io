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
      optionFetch = objImpl.optionFetch,
      api = objImpl.api;

  fnFetch({
    uri: api.getRequestUrl(option),
    option: option,
    optionFetch: optionFetch,
    onCheckResponse: api.checkResponse,
    onFetch: _fnFetchToChartComp.bind(null, objImpl),
    onCompleted: onCompleted,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _fnFetchToChartComp = function _fnFetchToChartComp(objImpl, _ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;
  var adapter = objImpl.adapter,
      _adapter$toConfig = adapter.toConfig(json, option),
      config = _adapter$toConfig.config;


  if (typeof config.then !== 'function') {
    onCompleted(option, config);
  } else {
    config.then(function (config) {
      onCompleted(option, config);
      return undefined;
    });
  }
};

var _loadToChart = function _loadToChart(objImpl, option, onAdded, onFailed) {
  var fnFetch = objImpl.fnFetch,
      api = objImpl.api;

  fnFetch({
    uri: api.getRequestUrl(option),
    option: option,
    onCheckResponse: api.checkResponse,
    onFetch: _fnFetchToChart.bind(null, objImpl),
    onCompleted: onAdded,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _fnFetchToChart = function _fnFetchToChart(objImpl, _ref2) {
  var json = _ref2.json,
      option = _ref2.option,
      onCompleted = _ref2.onCompleted;
  var adapter = objImpl.adapter,
      itemCaption = option.itemCaption,
      value = option.value,
      hasSecondYAxis = option.hasSecondYAxis,
      series = adapter.toSeries(json, option),
      chart = _ChartStore2.default.getActiveChart();


  _ChartFn2.default.addSeriaWithRenderLabel({
    chart: chart, series: series,
    label: series.zhItemCaption || itemCaption || value,
    hasSecondYAxis: !!hasSecondYAxis
  });
  onCompleted(option);
};

var loadItem = function loadItem(objImpl) {
  return {
    loadItem: function loadItem(option, onCompleted, onAdded, onFailed) {
      var parentId = _ChartStore2.default.isLoadToChart();
      if (!parentId) {
        _loadToChartComp(objImpl, option, onCompleted, onFailed);
      } else {
        option.parentId = parentId;
        _loadToChart(objImpl, option, onAdded, onFailed);
      }
    },

    fnFetchToChartComp: _fnFetchToChartComp.bind(null, objImpl),
    fnFetchToChart: _fnFetchToChart.bind(null, objImpl)
  };
};

exports.default = loadItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadItem.js.map