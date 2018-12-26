'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tsIndicators = require('../math/tsIndicators');

var _tsIndicators2 = _interopRequireDefault(_tsIndicators);

var _ChartConfig = require('./ChartConfig');

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

var IndicatorBuilder = {
  removeSeriaFrom: function removeSeriaFrom(chart, zhValueText) {
    var series = chart.series;
    for (var i = 0, max = series.length; i < max; i++) {
      if (series[i].userOptions.zhValueText === zhValueText) {
        series[i].remove(true);
        return true;
      }
    }
    return false;
  },

  addSmaTo: function addSmaTo(chart, option) {
    var id = option.id,
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
  },

  crMfiConfig: function crMfiConfig(chart, period, id) {
    var data = chart.options.zhPoints,
        parentId = chart.options.zhConfig.id,
        _mfi = mfi(data, period),
        dataMfi = _mfi.dataMfi,
        nNotFullPoint = _mfi.nNotFullPoint,
        titleNotFullPoint = nNotFullPoint !== 0 ? ' Not Full Data HL:' + nNotFullPoint : '';

    return _ChartConfig2.default.fIndicatorMfiConfig(id, parentId, id + titleNotFullPoint, dataMfi);
  },

  crMomAthConfig: function crMomAthConfig(chart, id) {
    var data = chart.options.zhPoints,
        _momAth = momAth(data),
        dataMom = _momAth.dataMom,
        dataAth = _momAth.dataAth,
        dataSum = _momAth.dataSum;

    return _ChartConfig2.default.fnMomAthConfig(dataMom, dataAth, dataSum, id);
  }

};

exports.default = IndicatorBuilder;
//# sourceMappingURL=IndicatorBuilder.js.map