'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnFetchToChart = exports.fnFetchToChartComp = exports.loadQuandl = undefined;

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  var chartId = option.value;
  var chartType = option.chartType;


  if (!_ChartStore2.default.isChartExist(chartType, chartId)) {
    (0, _fn.fnFetch)({
      uri: _QuandlApi2.default.getRequestUrl(option),
      option: option,
      onCheckResponse: _QuandlApi2.default.checkResponse,
      onFetch: fnFetchToChartComp,
      onCompleted: onCompleted,
      onCatch: _fnCatch.fnCatch,
      onFailed: onFailed
    });
  } else {
    var _Msg$Alert$ALREADY_EX = _Msg2.default.Alert.ALREADY_EXIST;
    var caption = _Msg$Alert$ALREADY_EX.caption;
    var descr = _Msg$Alert$ALREADY_EX.descr;

    option.alertCaption = caption;
    option.alertDescr = descr;
    onFailed(option);
  }
};

var fnFetchToChartComp = function fnFetchToChartComp(_ref) {
  var json = _ref.json;
  var option = _ref.option;
  var onCompleted = _ref.onCompleted;

  var _QuandlAdapter$toConf = _QuandlAdapter2.default.toConfig(json, option);

  var config = _QuandlAdapter$toConf.config;
  var chartType = option.chartType;
  var browserType = option.browserType;

  onCompleted(chartType, browserType, config);
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
  _fnAddSeriesToChart(chart, series, option.value);

  onCompleted();
};

var _fnAddSeriesToChart = function _fnAddSeriesToChart(chart, series, label) {
  var options = chart.options;

  //12symbols
  var seriesText = label.length > 12 ? label.substring(0, 12) : label,
      seriesCount = options.zhSeries.count,
      row = Math.floor(seriesCount / 3),
      x = 145 + 100 * seriesCount - row * 300,
      y = 95 + 15 * row;

  chart.addSeries(series, true, true);
  chart.renderer.text(seriesText, x, y).css({ color: options.colors[series._colorIndex] }).add();

  options.zhSeries.count += 1;

  if (series.minY !== undefined && options.yAxis[0].min > series.minY) {
    chart.yAxis[0].update({ min: series.minY, startOnTick: true });
  }
};

var loadQuandl = function loadQuandl(chartType, browserType, option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();

  option.apiKey = _ChartStore2.default.getQuandlKey();

  if (!parentId) {
    option.chartType = chartType;
    option.browserType = browserType;
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