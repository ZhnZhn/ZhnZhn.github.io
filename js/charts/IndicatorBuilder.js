"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _tsIndicators = _interopRequireDefault(require("../math/tsIndicators"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

var categoryRate = _tsIndicators["default"].categoryRate,
    categoryDiff = _tsIndicators["default"].categoryDiff,
    pby10 = _tsIndicators["default"].pby10,
    sma = _tsIndicators["default"].sma,
    mfi = _tsIndicators["default"].mfi,
    momAth = _tsIndicators["default"].momAth;
var _crMfiConfig = _ChartConfig["default"].crMfiConfig,
    _crMomAthConfig = _ChartConfig["default"].crMomAthConfig;

var _getD12 = function _getD12(chart) {
  var series = chart.series,
      s1 = series[0],
      d1 = s1.data,
      d2 = (series[1] || {}).data || [];
  return {
    d1: d1,
    d2: d2,
    sc: s1.color
  };
};

var _findMinY = function _findMinY(arr) {
  var y,
      min = Number.MAX_SAFE_INTEGER;

  for (var i = 0; i < arr.length; i++) {
    y = arr[i].y;

    if (y < min) {
      min = y;
    }
  }

  return min !== Number.MAX_SAFE_INTEGER ? min : null;
};

var _fCategoryCalc = function _fCategoryCalc(calc, name, isUpdateMin) {
  return function (chart, rc) {
    var _getD = _getD12(chart),
        d1 = _getD.d1,
        d2 = _getD.d2,
        sc = _getD.sc;

    if (d2.length !== 0) {
      var data = calc(d1, d2, {
        rc: rc,
        sc: sc
      });
      chart.addSeries({
        name: name,
        data: data,
        color: rc
      }, true, true);

      if (isUpdateMin) {
        chart.yAxis[0].setExtremes(_findMinY(data), null, true);
      }

      return true;
    }

    return false;
  };
};

var _addDataAsSeriaToChart = function _addDataAsSeriaToChart(chart, option) {
  var seria = _ChartConfig["default"].crSeria(option);

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
  addCategoryRateTo: _fCategoryCalc(categoryRate, 'Rate S1/S2'),
  addCategoryDiffTo: _fCategoryCalc(categoryDiff, 'Diff S1-S2', true),
  powerBy10: function powerBy10(chart, power) {
    var seria = chart.series[0],
        name = seria.getName(),
        _pby = pby10(seria.data, power),
        dataP = _pby[0],
        by = _pby[1];

    seria.update({
      data: dataP,
      name: name + "*" + by
    }, true);
  },
  addSmaTo: function addSmaTo(chart, option) {
    var id = option.id,
        period = option.period,
        data = chart.series[0].data,
        dataSma = sma(data, period);

    if (dataSma.length > 0) {
      return _addDataAsSeriaToChart(chart, {
        zhValueText: id,
        lineWidth: 2,
        data: dataSma,
        name: "SMA(" + period + ")"
      });
    } else {
      console.log('It seems, there are not enough data for SMA(' + period + ')');
      return void 0;
    }
  },
  crMfiConfig: function crMfiConfig(chart, period, id) {
    var data = chart.options.zhPoints,
        _mfi = mfi(data, period),
        dataMfi = _mfi.dataMfi,
        nNotFullPoint = _mfi.nNotFullPoint,
        titleNotFullPoint = nNotFullPoint !== 0 ? ' Not Full Data HL:' + nNotFullPoint : '';

    return _crMfiConfig(id, id + titleNotFullPoint, dataMfi);
  },
  crMomAthConfig: function crMomAthConfig(chart) {
    var data = chart.options.zhPoints;
    return _crMomAthConfig(momAth(data));
  }
};
var _default = IndicatorBuilder;
exports["default"] = _default;
//# sourceMappingURL=IndicatorBuilder.js.map