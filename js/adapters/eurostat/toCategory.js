"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crCategorySeria = exports.crCategoryConfig = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _toColumn = _interopRequireDefault(require("../stat-json/toColumn"));
var _JsonStatFn = require("./JsonStatFn");
var _EuroStatFn = require("./EuroStatFn");
const _crScatterProps = seriaColor => ({
  type: 'scatter',
  marker: {
    fillColor: seriaColor,
    radius: 5,
    symbol: 'circle'
  }
});
const _crRouteIsNotExistMsg = seriaType => `Chart ${seriaType} route isn't exist`;
const FN_TRUE = () => true;
const _fIsAddToCategories = option => {
  const _isGeoEntity = (0, _EuroStatFn.isEuCaption)((0, _AdapterFn.getCaption)(option.items[0])) ? _EuroStatFn.isEuGeoEntity : FN_TRUE,
    _isValue = option.isFilterZero ? value => value !== 0 : FN_TRUE;
  return (geoEntity, value) => _isGeoEntity(geoEntity) && _isValue(value);
};
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
  return (0, _JsonStatFn.trJsonToCategory)(json, _fIsAddToCategories(option)).then(_ref => {
    let {
      categories,
      data,
      min
    } = _ref;
    return (0, _EuroStatFn.crCategoryConfigImpl)({
      json,
      option,
      min,
      data,
      categories
    });
  });
};
exports.crCategoryConfig = crCategoryConfig;
const _crSeriaData = (json, option, categories) => {
  const data = (0, _JsonStatFn.trJsonToSeria)(json, categories);
  return (0, _EuroStatFn.roundByDataIf)(data, option);
};
const _crSeriaProps = (seriaType, seriaColor) => seriaType === 'DOT_SET' ? _crScatterProps(seriaColor) : void 0;
const crCategorySeria = (json, option, chart) => {
  const categories = (0, _CategoryFn.getCategories)(chart),
    {
      zhMapSlice: configSlice,
      time,
      seriaColor,
      seriaType
    } = option,
    data = _crSeriaData(json, option, categories);
  return {
    data,
    minY: (0, _AdapterFn.findMinY)(data),
    name: configSlice.time || time,
    color: seriaColor,
    tooltip: (0, _EuroStatFn.crCategoryTooltip)(),
    ..._crSeriaProps(seriaType, seriaColor)
  };
};
exports.crCategorySeria = crCategorySeria;
//# sourceMappingURL=toCategory.js.map