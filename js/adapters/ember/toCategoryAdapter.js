"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _crTotalData = (json, pnMetric) => {
    const hm = (0, _fnAdapter.reduceToHmBy)((_hm, item) => {
      const c = (0, _fnAdapter.getCountryName)(item);
      if (c && (0, _fnAdapter.isTotalVariable)(item)) {
        _hm[c] = (_hm[c] || 0) + item[pnMetric];
      }
      return _hm;
    }, json);
    return _getObjectKeys(hm).map(k => (0, _CategoryFn.crCategoryPoint)((0, _fnAdapter.roundBy)(hm[k], 2), k));
  },
  _crSourceData = (json, pnMetric) => json.reduce((data, item) => {
    const c = (0, _fnAdapter.getCountryName)(item);
    if (c) {
      data.push((0, _CategoryFn.crCategoryPoint)(item[pnMetric], c));
    }
    return data;
  }, []),
  _crData = (json, options) => {
    const source = (0, _fnAdapter.getSourceValue)(options),
      pnMetric = (0, _fnAdapter.getMetricValue)(options);
    return (0, _compareByFn.sortDescByPnY)((0, _fnAdapter.isTotalData)(source) ? _crTotalData(json, pnMetric) : _crSourceData(json, pnMetric));
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map