"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fIsAddToCategories = exports.crCategoryTooltip = exports.crCategoryConfigImpl = void 0;
var _compose = _interopRequireDefault(require("../../utils/compose"));
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _Chart = require("../../charts/Chart");
var _Tooltip = require("../../charts/Tooltip");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _EuroStatFn = require("./EuroStatFn");
var _FactoryChart = _interopRequireDefault(require("./FactoryChart"));
const EU_COLOR = "#001489",
  EA_COLOR = "#cca300",
  NOT_EU_MEMBER_COLOR = '#8085e9',
  EU_MEMBER = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];
const _fIsCode = token => str => str.toLowerCase().indexOf(token) !== -1,
  _isEaCaption = _fIsCode("euro area"),
  _isEuMember = str => EU_MEMBER.indexOf(str) !== -1;
const _isEuCaption = _fIsCode("union");
const _isEuGeoEntity = str => _isEaCaption(str) || _isEuCaption(str) || _isEuMember(str);
const _getCategoryColor = caption => _isEuCaption(caption) ? EU_COLOR : _isEaCaption(caption) ? EA_COLOR : _isEuMember(caption) ? void 0 : NOT_EU_MEMBER_COLOR;
const _setColorToCategory = p => {
  const color = _getCategoryColor(p.c || "");
  if (color) {
    p.color = color;
  }
  return p;
};
const _colorCategoriesAndRoundBy = (data, roundByCategoryValueIf) => {
  const _colorAndRoundByIf = (0, _compose.default)(roundByCategoryValueIf, _setColorToCategory);
  for (const p of data) {
    _colorAndRoundByIf(p);
  }
};
const crCategoryConfigImpl = _ref => {
  let {
    json,
    option,
    data,
    categories,
    min
  } = _ref;
  const {
    title,
    subtitle,
    time
  } = option;
  _colorCategoriesAndRoundBy(data, (0, _CategoryFn.fRoundByIf)(option));
  const config = (0, _pipe.default)(_FactoryChart.default.createConfig(option, categories), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddSeriaBy)(0, {
    data,
    name: time
  }), (0, _configBuilderFn.fAdd)({
    info: (0, _EuroStatFn.crDatasetInfo)(json),
    zhConfig: {
      ...(0, _EuroStatFn.crZhConfig)(option),
      itemCaption: title || "EU",
      itemTime: time
    }
  }), _configBuilderFn.setBarConfigHeightIf, _configBuilderFn.toConfig);
  if (!option.isNotZoomToMinMax) {
    config.yAxis.min = min;
  }
  return config;
};
exports.crCategoryConfigImpl = crCategoryConfigImpl;
const crCategoryTooltip = () => (0, _Chart.fTooltip)(_Tooltip.tooltipCategorySimple);
exports.crCategoryTooltip = crCategoryTooltip;
const FN_TRUE = () => true,
  _isNotValueEqZero = value => value !== 0,
  _crPredicate = (isPredicate, predicate) => isPredicate ? predicate : FN_TRUE;
const fIsAddToCategories = option => {
  const _isGeoEntity = _crPredicate(_isEuCaption((0, _AdapterFn.getCaption)(option.items[0])), _isEuGeoEntity),
    _isValue = _crPredicate(option.isFilterZero, _isNotValueEqZero);
  return (geoEntity, value) => _isGeoEntity(geoEntity) && _isValue(value);
};
exports.fIsAddToCategories = fIsAddToCategories;
//# sourceMappingURL=toCategoryFn.js.map