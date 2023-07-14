"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const SOURCE_FOSSIL = 'Fossil',
  SOURCE_CLEAN = 'Clean',
  _getObjectKeys = Object.keys,
  _crTotalData = (pnDate, json, metric) => {
    const _hm = json.reduce((hm, item) => {
      if (item.variable === SOURCE_FOSSIL || item.variable === SOURCE_CLEAN) {
        const _pn = '' + item[pnDate];
        hm[_pn] = (hm[_pn] || 0) + item[metric];
      }
      return hm;
    }, {});
    return _getObjectKeys(_hm).map(key => [(0, _fnAdapter.ymdToUTC)(key), _hm[key]]);
  },
  _crSourceData = (pnDate, json, metric, source) => json.reduce((data, item) => {
    if (item.variable === source) {
      data.push([(0, _fnAdapter.ymdToUTC)(item[pnDate]), item[metric]]);
    }
    return data;
  }, []);
const crData = (json, options) => {
  const {
      items,
      pnDate
    } = options,
    metric = (0, _fnAdapter.getValue)(items[1]),
    source = (0, _fnAdapter.getValue)(items[2]),
    data = (0, _fnAdapter.isTotalData)(source) ? _crTotalData(pnDate, json, metric) : _crSourceData(pnDate, json, metric, source);
  return data.sort(_compareByFn.compareByDate);
};
const EmberAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = EmberAdapter;
exports.default = _default;
//# sourceMappingURL=EmberAdapter.js.map