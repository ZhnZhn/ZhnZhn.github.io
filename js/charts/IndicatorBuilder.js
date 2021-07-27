"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _tsIndicators = _interopRequireDefault(require("../math/tsIndicators"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

const {
  categoryRate,
  categoryDiff,
  categoryRoc,
  pby10,
  sma,
  mfi,
  momAth
} = _tsIndicators.default;
const {
  crMfiConfig,
  crMomAthConfig
} = _ChartConfig.default;

const _getD12 = chart => {
  const series = chart.series,
        s1 = series[0],
        d1 = s1.data,
        d2 = (series[1] || {}).data || [];
  return {
    d1,
    d2,
    sc: s1.color
  };
};

const _updateYAxisMin = chart => {
  const _yAxis = chart.yAxis[0],
        {
    dataMin,
    min
  } = _yAxis.getExtremes();

  if (dataMin < min) {
    _yAxis.setExtremes(dataMin, null, true);
  }
}; //df config chart.ignoreHiddenSeries = true


const _hideFirstSecondSeries = chart => {
  const _series = chart.series;

  _series[0].hide();

  _series[1].hide();
};

const _fCategoryCalc = (calc, name) => (chart, rc) => {
  const {
    d1,
    d2,
    sc
  } = _getD12(chart);

  if (d2.length !== 0) {
    const data = calc(d1, d2, {
      rc,
      sc
    });
    chart.addSeries({
      name,
      data,
      color: rc
    }, true, true);

    _updateYAxisMin(chart);

    _hideFirstSecondSeries(chart);

    return true;
  }

  return false;
};

const _addToChartSeria = (chart, option) => {
  const seria = _ChartConfig.default.crSeria(option),
        _seriaIns = chart.addSeries(seria, true, true);

  return (_seriaIns || {}).color;
};

const IndicatorBuilder = {
  removeSeriaFrom: (chart, zhValueText) => {
    const series = chart.series;

    for (let i = 0, max = series.length; i < max; i++) {
      if (series[i].userOptions.zhValueText === zhValueText) {
        series[i].remove(true);
        return true;
      }
    }

    return false;
  },
  addCategoryRateTo: _fCategoryCalc(categoryRate, 'Rate S1/S2'),
  addCategoryDiffTo: _fCategoryCalc(categoryDiff, 'Diff S1-S2'),
  addCategoryRocTo: _fCategoryCalc(categoryRoc, 'ROC S1 from S2'),
  powerBy10: (chart, power) => {
    const seria = chart.series[0],
          name = seria.getName(),
          [dataP, by] = pby10(seria.data, power);
    seria.update({
      data: dataP,
      name: name + "*" + by
    }, true);
  },
  addSmaTo: (chart, option) => {
    const {
      id,
      period
    } = option,
          data = chart.series[0].data,
          dataSma = sma(data, period);

    if (dataSma.length > 0) {
      return _addToChartSeria(chart, {
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
  crMfiConfig: (chart, period, id) => {
    const data = chart.options.zhPoints,
          [dataMfi, nNotFullPoint] = mfi(data, period),
          titleNotFullPoint = nNotFullPoint !== 0 ? ' Not Full Data HL:' + nNotFullPoint : '';
    return crMfiConfig(id, id + titleNotFullPoint, dataMfi);
  },
  crMomAthConfig: chart => {
    const data = chart.options.zhPoints;
    return crMomAthConfig(momAth(data));
  }
};
var _default = IndicatorBuilder;
exports.default = _default;
//# sourceMappingURL=IndicatorBuilder.js.map