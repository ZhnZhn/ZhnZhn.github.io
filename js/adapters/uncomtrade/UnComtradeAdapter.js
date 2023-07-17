"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
var _toConfig = _interopRequireDefault(require("./toConfig"));
var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));
const UnComtradeAdapter = (0, _crAdapterRouter.default)(void 0, {
  getRoute: _toConfig.default,
  crDfKey: _fnAdapter.crChartId
});
var _default = UnComtradeAdapter;
exports.default = _default;
//# sourceMappingURL=UnComtradeAdapter.js.map