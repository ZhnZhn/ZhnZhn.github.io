"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
const toLineAdapter = (0, _crAdapterType.default)({
    crData: _fnAdapter.crData,
    crConfOption: _fnAdapter.crConfOption
  }),
  adapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: (0, _crAdapterRouter.fGetRouteCategory)(_toCategoryAdapter.default, toLineAdapter)
  });
var _default = exports.default = adapter;
//# sourceMappingURL=adapter.js.map