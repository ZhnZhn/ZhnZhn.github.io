"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));
var _crCategoryConfig = _interopRequireDefault(require("../crCategoryConfig"));
var _fToCategorySeries = _interopRequireDefault(require("../fToCategorySeries"));
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys;
const _crCategoryPoint = (y, n) => {
  const c = (0, _domSanitize.default)(n);
  return {
    y,
    name: c,
    c
  };
};
const _crTotalData = (json, pnMetric) => {
  const hm = (0, _fnAdapter.reduceToHmBy)((_hm, item) => {
    const c = (0, _fnAdapter.getCountryName)(item);
    if (c && (0, _fnAdapter.isTotalVariable)(item)) {
      _hm[c] = (_hm[c] || 0) + item[pnMetric];
    }
    return _hm;
  }, json);
  return _getObjectKeys(hm).map(k => _crCategoryPoint((0, _fnAdapter.roundBy)(hm[k], 2), k));
};
const _crData = (json, pnMetric) => json.reduce((data, item) => {
  const c = (0, _fnAdapter.getCountryName)(item);
  if (c) {
    data.push(_crCategoryPoint(item[pnMetric], c));
  }
  return data;
}, []);
const toCategoryAdapter = {
  toConfig: (json, option) => {
    const {
        title,
        subtitle,
        seriaType,
        seriaColor,
        _itemKey,
        time,
        dataSource,
        items
      } = option,
      pnMetric = (0, _fnAdapter.getValue)(items[1]),
      source = (0, _fnAdapter.getValue)(items[2]),
      data = (0, _fnAdapter.isTotalData)(source) ? _crTotalData(json, pnMetric) : _crData(json, pnMetric),
      _arrSeriaType = seriaType.split('_'),
      config = (0, _crCategoryConfig.default)(subtitle, title, _arrSeriaType[0], seriaColor, (0, _compareByFn.sortDescByPnY)(data), (0, _fnAdapter.isCategoryCluster)(seriaType));
    config.zhConfig = {
      id: _itemKey,
      key: _itemKey,
      itemCaption: subtitle + ": " + title,
      itemTime: time,
      dataSource
    };
    return {
      config
    };
  }
};
toCategoryAdapter.toSeries = (0, _fToCategorySeries.default)(toCategoryAdapter.toConfig);
var _default = toCategoryAdapter;
exports.default = _default;
//# sourceMappingURL=toCategoryAdapter.js.map