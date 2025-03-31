"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crCategorySeria = exports.crCategoryConfig = void 0;
var _AdapterFn = require("../AdapterFn");
var _toColumn = _interopRequireDefault(require("../stat-json/toColumn"));
var _FactoryChart = _interopRequireDefault(require("./FactoryChart"));
var _JsonStatFn = require("./JsonStatFn");
var _EuroStatFn = require("./EuroStatFn");
const _filterZeroAndRoundByIf = (data, option) => {
  const {
      isFilterZero
    } = option,
    crValue = (0, _AdapterFn.fCrValue)(option, _AdapterFn.FN_IDENTITY),
    _roundValue = point => (0, _AdapterFn.isNumber)(point && point.y) ? (point.y = crValue(point.y), point) : point,
    _crCategoryPoint = isFilterZero ? point => !point || point.y === 0 ? null : _roundValue(point) : _roundValue;
  return _crCategoryPoint === _AdapterFn.FN_IDENTITY ? data : data.map(_crCategoryPoint);
};
const _crScatterProps = seriaColor => ({
  type: 'scatter',
  marker: {
    fillColor: seriaColor,
    radius: 5,
    symbol: 'circle'
  }
});
const _crRouteIsNotExistMsg = seriaType => `Chart ${seriaType} route isn't exist`;
const crCategoryConfig = (json, option) => {
  // By Dim route
  const {
    dfC
  } = option;
  if (dfC && (0, _EuroStatFn.isNotGeoOrReporter)(dfC)) {
    const {
        seriaType
      } = option,
      _crConfig = _toColumn.default[seriaType];
    if (!_crConfig) {
      throw new Error(_crRouteIsNotExistMsg(seriaType));
    }
    return _crConfig(json, option);
  }
  const _isAddToCategories = (0, _EuroStatFn.isEuCaption)((0, _AdapterFn.getCaption)(option.items[0])) ? _EuroStatFn.isEuGeoEntity : void 0;
  return (0, _JsonStatFn.trJsonToCategory)(json, _isAddToCategories).then(_ref => {
    let {
      categories,
      data,
      min
    } = _ref;
    const config = _FactoryChart.default.createConfig(option);
    (0, _EuroStatFn.addToCategoryConfig)(config, {
      json,
      option,
      data: _filterZeroAndRoundByIf(data, option),
      categories,
      min
    });
    return config;
  });
};
exports.crCategoryConfig = crCategoryConfig;
const _crSeriaData = (json, option, categories) => {
  const data = (0, _JsonStatFn.trJsonToSeria)(json, categories);
  return _filterZeroAndRoundByIf(data, option);
};
const _crSeriaProps = (seriaType, seriaColor) => seriaType === 'DOT_SET' ? _crScatterProps(seriaColor) : void 0;
const crCategorySeria = (json, option, chart) => {
  const categories = chart.options.xAxis[0].categories,
    {
      zhMapSlice: configSlice,
      time,
      seriaColor,
      seriaType
    } = option,
    data = _crSeriaData(json, option, categories);
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