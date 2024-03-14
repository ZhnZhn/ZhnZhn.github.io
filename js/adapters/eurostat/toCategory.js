"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crCategorySeria = exports.crCategoryConfig = void 0;
var _toColumn = _interopRequireDefault(require("../stat-json/toColumn"));
var _FactoryChart = _interopRequireDefault(require("./FactoryChart"));
var _JsonStatFn = require("./JsonStatFn");
var _EuroStatFn = require("./EuroStatFn");
const _filterZeroIf = (data, isFilter) => isFilter ? data.map(value => value === 0 ? null : value) : data;
const _crScatterProps = seriaColor => ({
  type: 'scatter',
  marker: {
    fillColor: seriaColor,
    radius: 5,
    symbol: 'circle'
  }
});
const _crRouteIsNotExistMsg = seriaType => "Chart " + seriaType + " route isn't exist";
const crCategoryConfig = (json, option) => {
  // By Dim route
  const {
    dfC
  } = option;
  if (dfC && (0, _EuroStatFn.isNotGeoOrReporter)(dfC)) {
    option.category = dfC;
    option.itemSlice = option.zhMapSlice;
    const {
        seriaType
      } = option,
      _crConfig = _toColumn.default[seriaType];
    if (!_crConfig) {
      throw new Error(_crRouteIsNotExistMsg(seriaType));
    }
    return _crConfig(json, option);
  }
  const {
    zhMapSlice: configSlice
  } = option;
  return (0, _JsonStatFn.trJsonToCategory)(json, configSlice).then(_ref => {
    let {
      categories,
      data,
      min
    } = _ref;
    const config = _FactoryChart.default.createConfig(option);
    (0, _EuroStatFn.addToCategoryConfig)(config, {
      json,
      option,
      data,
      categories,
      min
    });
    return config;
  });
};
exports.crCategoryConfig = crCategoryConfig;
const _crSeriaData = (json, configSlice, categories, isFilterZero) => {
  const data = (0, _JsonStatFn.trJsonToSeria)(json, configSlice, categories);
  return _filterZeroIf(data, isFilterZero);
};
const _crSeriaProps = (seriaType, seriaColor) => seriaType === 'DOT_SET' ? _crScatterProps(seriaColor) : void 0;
const crCategorySeria = (json, option, chart) => {
  const categories = chart.options.xAxis[0].categories,
    {
      isFilterZero,
      zhMapSlice: configSlice,
      time,
      seriaColor,
      seriaType
    } = option,
    data = _crSeriaData(json, configSlice, categories, isFilterZero);
  return {
    data,
    minY: (0, _EuroStatFn.findMinY)(data),
    name: configSlice.time || time,
    color: seriaColor,
    tooltip: (0, _EuroStatFn.crCategoryTooltip)(),
    ..._crSeriaProps(seriaType, seriaColor)
  };
};
exports.crCategorySeria = crCategorySeria;
//# sourceMappingURL=toCategory.js.map