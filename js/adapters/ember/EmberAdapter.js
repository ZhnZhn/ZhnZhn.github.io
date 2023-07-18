"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));
var _compareByFn = require("../compareByFn");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _crTotalData = (pnDate, json, metric) => {
    const _hm = (0, _fnAdapter.reduceToHmBy)((hm, item) => {
      if ((0, _fnAdapter.isTotalVariable)(item)) {
        const _pn = '' + item[pnDate];
        hm[_pn] = (hm[_pn] || 0) + item[metric];
      }
      return hm;
    }, json);
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
const toLineAdapter = (0, _crAdapterType.default)({
  crData
});
const getRoute = option => (0, _fnAdapter.isCategory)(option.seriaType) ? _toCategoryAdapter.default : toLineAdapter;
const EmberAdapter = (0, _crAdapterRouter.default)(void 0, {
  getRoute
});
var _default = EmberAdapter;
exports.default = _default;
//# sourceMappingURL=EmberAdapter.js.map