"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterRouter = require("../crAdapterRouter");
var _toChartConfig = _interopRequireDefault(require("./toChartConfig"));
var _toTwConfig = _interopRequireDefault(require("./toTwConfig"));
var _toCiConfig = _interopRequireDefault(require("./toCiConfig"));
const CpAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  rAdapter: {
    DF: _toChartConfig.default,
    TW: _toTwConfig.default,
    CI: _toCiConfig.default
  },
  crDfKey: _AdapterFn.crDfItemKey
});
var _default = exports.default = CpAdapter;
//# sourceMappingURL=CpAdapter.js.map