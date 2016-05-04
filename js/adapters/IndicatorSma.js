'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnRemoveSeries = exports.fnAddSeriesSma = undefined;

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _ChartConfigs = require('../constants/ChartConfigs');

var _ChartConfigs2 = _interopRequireDefault(_ChartConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnAddSeriesSma = exports.fnAddSeriesSma = function fnAddSeriesSma(chart, period) {

  var _id = 'SMA(' + period + ')',
      dataSma = [],
      data = chart.series[0].data;

  var bSum = (0, _big2.default)('0.0');
  for (var i = 0, max = data.length; i < max; i++) {
    var point = data[i];
    if (i > period) {
      bSum = bSum.plus(point.y).minus(data[i - period].y);
      dataSma.push([point.x, parseFloat(bSum.div(period).toFixed(2))]);
    } else {
      bSum = bSum.plus(point.y);
    }
  }

  if (dataSma.length > 0) {
    var config = _ChartConfigs2.default.fSeries();

    config.zhValueText = _id;
    config.lineWidth = 2;
    config.data = dataSma;

    chart.addSeries(config, true, true);

    return chart.options.colors[config['_colorIndex']];
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\IndicatorSma.js.map