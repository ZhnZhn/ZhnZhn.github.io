"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toChart = _interopRequireDefault(require("./toChart"));
var _toExchangeList = _interopRequireDefault(require("./toExchangeList"));
var _toExchangeVolume = _interopRequireDefault(require("./toExchangeVolume"));
var _toMarketCapList = _interopRequireDefault(require("./toMarketCapList"));
const CgAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  rAdapter: {
    DF: _toChart.default,
    EL: _toExchangeList.default,
    EV: _toExchangeVolume.default,
    MCL: _toMarketCapList.default
  },
  isKey: true
});
var _default = exports.default = CgAdapter;
//# sourceMappingURL=CgAdapter.js.map