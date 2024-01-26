"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
var _toConfig = _interopRequireDefault(require("./toConfig"));
var _crAdapterRouter = require("../crAdapterRouter");
const UnComtradeAdapter = (0, _crAdapterRouter.crAdapterRouter)(void 0, {
  getRoute: _toConfig.default,
  crDfKey: _fnAdapter.crChartId
});
var _default = exports.default = UnComtradeAdapter;
//# sourceMappingURL=UnComtradeAdapter.js.map