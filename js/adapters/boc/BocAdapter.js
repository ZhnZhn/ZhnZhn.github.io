"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const _fCrItemTuple = options => {
    const seriesId = (0, _fnAdapter.getSeriesId)(options);
    return item => [(0, _AdapterFn.ymdToUTC)(item.d), parseFloat((item[seriesId] || {}).v)];
  },
  crData = (0, _crAdapterType.fCrDataType1)(_fnAdapter.getObservationsData, _fCrItemTuple);
const BocAdapter = (0, _crAdapterType.crAdapterType1)({
  crData
});
var _default = exports.default = BocAdapter;
//# sourceMappingURL=BocAdapter.js.map