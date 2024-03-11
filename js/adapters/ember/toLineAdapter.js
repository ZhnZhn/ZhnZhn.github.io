"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  getTrue = () => true,
  _crDataImpl = function (items, getDate, getValue, isValue) {
    if (isValue === void 0) {
      isValue = getTrue;
    }
    return items.reduce((data, item) => {
      const value = getValue(item);
      if ((0, _fnAdapter.isNumber)(value) && isValue(item)) {
        data.push([(0, _fnAdapter.ymdToUTC)(getDate(item)), value]);
      }
      return data;
    }, []);
  },
  _crTotalData = (json, pnDate, metric) => {
    const _hm = (0, _fnAdapter.reduceToHmBy)((hm, item) => {
      if ((0, _fnAdapter.isTotalVariable)(item)) {
        const _pn = '' + item[pnDate];
        hm[_pn] = (hm[_pn] || 0) + item[metric];
      }
      return hm;
    }, json);
    return _crDataImpl(_getObjectKeys(_hm), dateKey => dateKey, dateKey => _hm[dateKey]);
  },
  _crSourceData = (json, pnDate, metric, source, options) => _crDataImpl(json, item => item[pnDate], item => item[metric], (0, _fnAdapter.isEuRoute)(options) ? getTrue : item => item.variable === source);
const crData = (json, options) => {
  const source = (0, _fnAdapter.getSourceValue)(options),
    _crData = (0, _fnAdapter.isTotalData)(source) ? _crTotalData : _crSourceData;
  return _crData(json, options.pnDate, (0, _fnAdapter.getMetricValue)(options), source, options).sort(_compareByFn.compareByDate);
};
const toLineAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map