"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _CategoryFn = require("../CategoryFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
const toLineAdapter = (0, _crAdapterType.default)({
  crData: _fnAdapter.crData,
  crConfOption: _fnAdapter.crConfOption
});
const getRoute = option => (0, _CategoryFn.isCategory)(option.seriaType) ? _toCategoryAdapter.default : toLineAdapter;
const adapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute
});
var _default = exports.default = adapter;
//# sourceMappingURL=adapter.js.map