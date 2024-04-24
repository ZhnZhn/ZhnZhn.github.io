"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _crToTreeMapAdapter = _interopRequireDefault(require("./crToTreeMapAdapter"));
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _toLineAdapter = _interopRequireDefault(require("./toLineAdapter"));
const EmberAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute: (0, _crAdapterRouter.fGetRouteTreeMap)(_crToTreeMapAdapter.default, _toCategoryAdapter.default, _toLineAdapter.default)
});
var _default = exports.default = EmberAdapter;
//# sourceMappingURL=EmberAdapter.js.map