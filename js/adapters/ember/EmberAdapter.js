"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _crAdapterRouter = require("../crAdapterRouter");
var _compareByFn = require("../compareByFn");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _crToTreeMapAdapter = _interopRequireDefault(require("./crToTreeMapAdapter"));
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
      pnDate
    } = options,
    source = (0, _fnAdapter.getSourceValue)(options),
    metric = (0, _fnAdapter.getMetricValue)(options),
    data = (0, _fnAdapter.isTotalData)(source) ? _crTotalData(pnDate, json, metric) : _crSourceData(pnDate, json, metric, source);
  return data.sort(_compareByFn.compareByDate);
};
const toLineAdapter = (0, _crAdapterType.default)({
  crData
});
const getRoute = option => {
  const _seriaType = option.seriaType;
  return (0, _fnAdapter.isTreeMap)(_seriaType) ? (0, _crToTreeMapAdapter.default)(option) : (0, _fnAdapter.isCategory)(_seriaType) ? _toCategoryAdapter.default : toLineAdapter;
};
const EmberAdapter = (0, _crAdapterRouter.crAdapterRouter)(void 0, {
  getRoute
});
var _default = exports.default = EmberAdapter;
//# sourceMappingURL=EmberAdapter.js.map