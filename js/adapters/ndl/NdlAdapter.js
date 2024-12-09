"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _AdapterFn = require("../AdapterFn");
var _crAdapterRouter = require("../crAdapterRouter");
var _toLineAdapter = require("./toLineAdapter");
var _toYearlyAdapter = require("./toYearlyAdapter");
const _getAdapterRoute = (0, _AdapterFn.crGetRoute)({
  [_ChartType.CHT_AREA]: _toLineAdapter.toLineAdapter,
  [_ChartType.CHT_SPLINE]: _toLineAdapter.toLineAdapter,
  [_ChartType.CHT_LINE]: _toLineAdapter.toLineAdapter,
  [_ChartType.CHT_COLUMN]: _toLineAdapter.toLineAdapter,
  [_ChartType.CHT_YEARLY]: _toYearlyAdapter.toYearlyAdapter,
  [_ChartType.CHT_AREA_YEARLY]: _toYearlyAdapter.toYearlyAdapter
}, _toLineAdapter.toLineAdapter);
const NdlAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute: _ref => {
    let {
      seriaType
    } = _ref;
    return _getAdapterRoute(seriaType);
  }
});
var _default = exports.default = NdlAdapter;
//# sourceMappingURL=NdlAdapter.js.map