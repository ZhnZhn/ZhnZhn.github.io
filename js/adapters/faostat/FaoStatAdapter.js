"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toTreeMapAdapter = _interopRequireDefault(require("./toTreeMapAdapter"));
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _toSplineAdapter = _interopRequireDefault(require("./toSplineAdapter"));
const FaoStatAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute: (0, _crAdapterRouter.fGetRouteTreeMap)(_toTreeMapAdapter.default, _toCategoryAdapter.default, _toSplineAdapter.default)
});
var _default = exports.default = FaoStatAdapter;
//# sourceMappingURL=FaoStatAdapter.js.map