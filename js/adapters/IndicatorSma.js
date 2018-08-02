'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnMomAthConfig = exports.fnGetConfigMfi = exports.fnRemoveSeries = exports.fnAddSeriesSma = undefined;

var _tsIndicators = require('../math/tsIndicators');

var _tsIndicators2 = _interopRequireDefault(_tsIndicators);

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sma = _tsIndicators2.default.sma,
    mfi = _tsIndicators2.default.mfi,
    momAth = _tsIndicators2.default.momAth;


var _addDataAsSeriaToChart = function _addDataAsSeriaToChart(chart, option) {
  var seria = Object.assign(_ChartConfig2.default.fSeries(), option);
  chart.addSeries(seria, true, true);
  return chart.options.colors[seria['_colorIndex']];
};

var fnAddSeriesSma = exports.fnAddSeriesSma = function fnAddSeriesSma(option) {
  var chart = option.chart,
      id = option.id,
      period = option.period,
      plus = option.plus,
      parentId = chart.options.zhConfig.id,
      data = chart.series[0].data,
      dataSma = sma(data, period, plus);


  if (dataSma.length > 0) {
    return _addDataAsSeriaToChart(chart, {
      zhSeriaId: parentId + '_' + id,
      zhValueText: id,
      lineWidth: 2,
      data: dataSma
    });
  } else {
    console.log('It seems, there are not enough data for SMA(' + period + ')');
    return undefined;
  }
};

var fnRemoveSeries = exports.fnRemoveSeries = function fnRemoveSeries(chart, zhValueText) {
  var series = chart.series;
  for (var i = 0, max = series.length; i < max; i++) {
    if (series[i].userOptions.zhValueText === zhValueText) {
      series[i].remove(true);
      return true;
    }
  }
  return false;
};

var fnGetConfigMfi = exports.fnGetConfigMfi = function fnGetConfigMfi(chart, period, id) {
  var data = chart.options.zhPoints,
      parentId = chart.options.zhConfig.id,
      _mfi = mfi(data, period),
      dataMfi = _mfi.dataMfi,
      nNotFullPoint = _mfi.nNotFullPoint,
      titleNotFullPoint = nNotFullPoint !== 0 ? ' Not Full Data HL:' + nNotFullPoint : '';

  return _ChartConfig2.default.fIndicatorMfiConfig(id, parentId, id + titleNotFullPoint, dataMfi);
};

var fnMomAthConfig = exports.fnMomAthConfig = function fnMomAthConfig(chart, id) {
  var data = chart.options.zhPoints,
      _momAth = momAth(data),
      dataMom = _momAth.dataMom,
      dataAth = _momAth.dataAth,
      dataSum = _momAth.dataSum;

  return _ChartConfig2.default.fnMomAthConfig(dataMom, dataAth, dataSum, id);
};
//# sourceMappingURL=IndicatorSma.js.map