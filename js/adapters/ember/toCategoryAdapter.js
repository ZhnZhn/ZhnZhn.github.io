"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _mathFn = require("../../math/mathFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _toTsCategoryAdapter = require("../toTsCategoryAdapter");
var _fnAdapter = require("./fnAdapter");
const FN_IDENTITY = value => value,
  _fCrDataPoint = (transformValue, getCategory) => (value, item) => (0, _CategoryFn.crCategoryPoint)(transformValue(value), getCategory(item)),
  _crDataImpl = (items, getValue, getCategory, transformValue, isValue) => (0, _fnAdapter.crDataImpl)(items, getValue, _fCrDataPoint(transformValue, getCategory), isValue),
  _crTotalData = (json, getCategory, pnMetric) => {
    const hm = (0, _fnAdapter.reduceToHmBy)((_hm, item) => {
      const c = getCategory(item);
      if (c && (0, _fnAdapter.isTotalVariable)(item)) {
        _hm[c] = (_hm[c] || 0) + item[pnMetric];
      }
      return _hm;
    }, json);
    return _crDataImpl((0, _isTypeFn.getObjectKeys)(hm), itemKey => hm[itemKey], FN_IDENTITY, value => (0, _mathFn.roundBy)(value, 2));
  },
  _crSourceData = (json, getCategory, pnMetric) => _crDataImpl(json, item => item[pnMetric], getCategory, FN_IDENTITY, item => !!getCategory(item)),
  _crData = (json, options) => {
    if ((0, _fnAdapter.isTsRoute)(options)) {
      return (0, _toTsCategoryAdapter.crTsCategoryData)(json, options);
    }
    const source = (0, _fnAdapter.getSourceValue)(options),
      pnMetric = (0, _fnAdapter.getMetricValue)(options),
      getCategory = (0, _fnAdapter.fGetCategory)(options),
      crCategoryData = (0, _fnAdapter.isTotalData)(source) ? _crTotalData : _crSourceData;
    return (0, _compareByFn.sortDescCategory)(crCategoryData(json, getCategory, pnMetric));
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map