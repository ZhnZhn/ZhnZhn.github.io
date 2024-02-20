"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _crDataPoint = (date, value) => [(0, _fnAdapter.ymdToUTC)(date), value],
  _crTotalData = (json, pnDate, metric) => {
    const _hm = (0, _fnAdapter.reduceToHmBy)((hm, item) => {
      if ((0, _fnAdapter.isTotalVariable)(item)) {
        const _pn = '' + item[pnDate];
        hm[_pn] = (hm[_pn] || 0) + item[metric];
      }
      return hm;
    }, json);
    return _getObjectKeys(_hm).map(key => _crDataPoint(key, _hm[key]));
  },
  _crSourceData = (json, pnDate, metric, source) => json.reduce((data, item) => {
    if (item.variable === source) {
      data.push(_crDataPoint(item[pnDate], item[metric]));
    }
    return data;
  }, []);
const _crEuData = (json, pnDate, metric) => json.map(item => _crDataPoint(item[pnDate], item[metric]));
const crData = (json, options) => {
  const source = (0, _fnAdapter.getSourceValue)(options),
    _crData = (0, _fnAdapter.isEuRoute)(options) ? _crEuData : (0, _fnAdapter.isTotalData)(source) ? _crTotalData : _crSourceData;
  return _crData(json, options.pnDate, (0, _fnAdapter.getMetricValue)(options), source).sort(_compareByFn.compareByDate);
};
const toLineAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map