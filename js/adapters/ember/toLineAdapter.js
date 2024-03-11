"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _fCrDataPoint = getDate => (value, item) => [(0, _fnAdapter.ymdToUTC)(getDate(item)), value],
  _crDataImpl = (items, getValue, getDate, isValue) => (0, _fnAdapter.crDataImpl)(items, getValue, _fCrDataPoint(getDate), isValue),
  _crTotalData = (json, metric, pnDate) => {
    const _hm = (0, _fnAdapter.reduceToHmBy)((hm, item) => {
      if ((0, _fnAdapter.isTotalVariable)(item)) {
        const _pn = '' + item[pnDate];
        hm[_pn] = (hm[_pn] || 0) + item[metric];
      }
      return hm;
    }, json);
    return _crDataImpl(_getObjectKeys(_hm), dateKey => _hm[dateKey], dateKey => dateKey);
  },
  _crSourceData = (json, metric, pnDate, source, options) => _crDataImpl(json, item => item[metric], item => item[pnDate], (0, _fnAdapter.isEuRoute)(options) ? void 0 : item => item.variable === source);
const crData = (json, options) => {
  const source = (0, _fnAdapter.getSourceValue)(options),
    _crData = (0, _fnAdapter.isTotalData)(source) ? _crTotalData : _crSourceData;
  return _crData(json, (0, _fnAdapter.getMetricValue)(options), options.pnDate, source, options).sort(_compareByFn.compareByDate);
};
const toLineAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map