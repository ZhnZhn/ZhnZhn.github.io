"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _AdapterFn = require("../AdapterFn");
const SOURCE_TOTAL = 'Total',
  SOURCE_FOSSIL = 'Fossil',
  SOURCE_CLEAN = 'Clean',
  _getObjectKeys = Object.keys,
  _compareByDate = (a, b) => a[0] - b[0],
  _crTotalData = (json, metric) => {
    const _hm = json.reduce((hm, item) => {
      if (item.variable === SOURCE_FOSSIL || item.variable === SOURCE_CLEAN) {
        const _pn = '' + item.year;
        hm[_pn] = (hm[_pn] || 0) + item[metric];
      }
      return hm;
    }, {});
    return _getObjectKeys(_hm).map(key => [(0, _AdapterFn.ymdToUTC)(parseInt(key, 10)), _hm[key]]);
  },
  _crSourceData = (json, metric, source) => json.reduce((data, item) => {
    if (item.variable === source) {
      data.push([(0, _AdapterFn.ymdToUTC)(item.year), item[metric]]);
    }
    return data;
  }, []);
const crData = (json, options) => {
  const {
      items
    } = options,
    metric = items[1].v,
    source = items[2].v,
    data = source === SOURCE_TOTAL ? _crTotalData(json, metric) : _crSourceData(json, metric, source);
  return data.sort(_compareByDate);
};
const EmberAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = EmberAdapter;
exports.default = _default;
//# sourceMappingURL=EmberAdapter.js.map