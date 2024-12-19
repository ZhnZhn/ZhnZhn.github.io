"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _crAdapterRouter = require("../crAdapterRouter");
var _toLineAdapter = require("./toLineAdapter");
var _toYearlyAdapter = require("./toYearlyAdapter");
var _toCategoryAdapter = require("./toCategoryAdapter");
const _getAdapterRoute = (0, _AdapterFn.crGetRoute)({
  [_ChartType.CHT_AREA_YEARLY]: _toYearlyAdapter.toYearlyAdapter
}, _toLineAdapter.toLineAdapter);
const NdlAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute: _ref => {
    let {
      seriaType
    } = _ref;
    return (0, _CategoryFn.isCategory)(seriaType) ? _toCategoryAdapter.toCategoryAdapter : _getAdapterRoute(seriaType);
  }
});
var _default = exports.default = NdlAdapter;
//# sourceMappingURL=NdlAdapter.js.map