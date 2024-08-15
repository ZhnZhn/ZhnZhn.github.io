"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const _fCrItemTuple = options => {
    const seriesId = (0, _fnAdapter.getSeriesId)(options);
    return item => [(0, _AdapterFn.ymdToUTC)((item || {}).d), parseFloat(((item || {})[seriesId] || {}).v)];
  },
  crData = (0, _AdapterFn.fCrData)(_fnAdapter.getObservationsData, _fCrItemTuple);
const BocAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = exports.default = BocAdapter;
//# sourceMappingURL=BocAdapter.js.map