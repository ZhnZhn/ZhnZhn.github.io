"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _toLineAdapter = _interopRequireDefault(require("./toLineAdapter"));
const EiaAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute: (0, _crAdapterRouter.fGetRouteCategory)(_toCategoryAdapter.default, _toLineAdapter.default)
});
var _default = exports.default = EiaAdapter;
//# sourceMappingURL=EiaAdapter.js.map