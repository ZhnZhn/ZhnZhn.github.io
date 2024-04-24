"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toCategoryAdapter = _interopRequireDefault(require("./toCategoryAdapter"));
var _toLineAdapter = _interopRequireDefault(require("./toLineAdapter"));
var _crToTreeMapAdapter = _interopRequireDefault(require("./crToTreeMapAdapter"));
var _fnAdapter = require("./fnAdapter");
const getRoute = option => {
  const _seriaType = option.seriaType;
  return (0, _fnAdapter.isTreeMap)(_seriaType) ? (0, _crToTreeMapAdapter.default)(option) : (0, _fnAdapter.isCategory)(_seriaType) ? _toCategoryAdapter.default : _toLineAdapter.default;
};
const EmberAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  getRoute
});
var _default = exports.default = EmberAdapter;
//# sourceMappingURL=EmberAdapter.js.map