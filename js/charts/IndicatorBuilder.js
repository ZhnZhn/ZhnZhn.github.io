"use strict";

exports.__esModule = true;
exports.removeSeriaFrom = exports.powerBy10 = exports.crMomAthConfig = exports.crMfiConfig = exports.addSmaTo = exports.addRsiTo = exports.addCategoryRocTo = exports.addCategoryRateTo = exports.addCategoryDiffTo = void 0;
var _tsIndicators = require("../math/tsIndicators");
var _crMiniConfigFn = require("./crMiniConfigFn");
var _ChartConfigFn = require("./ChartConfigFn");
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
};

//df config chart.ignoreHiddenSeries = true
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
  const seria = (0, _ChartConfigFn.crSeriaConfig)(option),
    _seriaIns = chart.addSeries(seria, true, true);
  return (_seriaIns || {}).color;
};
const removeSeriaFrom = (chart, zhValueText) => {
  const series = chart.series;
  for (const seria of series) {
    if (seria.userOptions.zhValueText === zhValueText) {
      seria.remove(true);
      return true;
    }
  }
  return false;
};
exports.removeSeriaFrom = removeSeriaFrom;
const addCategoryRateTo = _fCategoryCalc(_tsIndicators.categoryRate, 'Rate S1/S2');
exports.addCategoryRateTo = addCategoryRateTo;
const addCategoryDiffTo = _fCategoryCalc(_tsIndicators.categoryDiff, 'Diff S1-S2');
exports.addCategoryDiffTo = addCategoryDiffTo;
const addCategoryRocTo = _fCategoryCalc(_tsIndicators.categoryRoc, 'ROC S1 from S2');
exports.addCategoryRocTo = addCategoryRocTo;
const powerBy10 = (chart, power) => {
  const seria = chart.series[0],
    name = seria.getName(),
    [dataP, by] = (0, _tsIndicators.pby10)(seria.data, power);
  seria.update({
    data: dataP,
    name: name + "*" + by
  }, true);
};
exports.powerBy10 = powerBy10;
const _fAddTaTo = (taName, taFn, yaxisOptions) => (chart, option) => {
  const {
      id,
      period
    } = option,
    _data = chart.series[0].data,
    data = taFn(_data, period),
    name = taName + "(" + period + ")",
    seriaOption = {
      zhValueText: id,
      lineWidth: 2,
      data: data,
      name: name
    };
  return data.length > 0 ? yaxisOptions ? (chart.zhAddSeriaToYAxis({
    name: taName,
    data,
    ...yaxisOptions
  }, (0, _ChartConfigFn.crSeriaConfig)({
    name,
    zhValueText: id,
    lineWidth: 2
  })) || {}).color : _addToChartSeria(chart, seriaOption) : console.log('It seems, there are not enough data for ' + name);
};
const addSmaTo = _fAddTaTo('SMA', _tsIndicators.sma);
exports.addSmaTo = addSmaTo;
const addRsiTo = _fAddTaTo('RSI', _tsIndicators.rsi, {
  min: 0,
  max: 100
});
exports.addRsiTo = addRsiTo;
const crMfiConfig = (chart, period, id) => {
  const data = chart.options.zhPoints,
    [dataMfi, nNotFullPoint] = (0, _tsIndicators.mfi)(data, period),
    titleNotFullPoint = nNotFullPoint !== 0 ? ' Not Full Data HL:' + nNotFullPoint : '';
  return (0, _crMiniConfigFn.crMiniMfiConfig)(id, id + titleNotFullPoint, dataMfi);
};
exports.crMfiConfig = crMfiConfig;
const crMomAthConfig = chart => {
  const data = chart.options.zhPoints;
  return (0, _crMiniConfigFn.crMiniMomAthConfig)((0, _tsIndicators.momAth)(data));
};
exports.crMomAthConfig = crMomAthConfig;
//# sourceMappingURL=IndicatorBuilder.js.map