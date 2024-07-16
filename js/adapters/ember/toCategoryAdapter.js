"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  FN_IDENTITY = value => value,
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
    return _crDataImpl(_getObjectKeys(hm), itemKey => hm[itemKey], FN_IDENTITY, value => (0, _fnAdapter.roundBy)(value, 2));
  },
  _crSourceData = (json, getCategory, pnMetric) => _crDataImpl(json, item => item[pnMetric], getCategory, FN_IDENTITY, item => !!getCategory(item)),
  _crData = (json, options) => {
    const source = (0, _fnAdapter.getSourceValue)(options),
      pnMetric = (0, _fnAdapter.getMetricValue)(options),
      getCategory = (0, _fnAdapter.fGetCategory)(options),
      crCategoryData = (0, _fnAdapter.isTotalData)(source) ? _crTotalData : _crSourceData;
    return (0, _compareByFn.sortDescCategory)(crCategoryData(json, getCategory, pnMetric));
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map