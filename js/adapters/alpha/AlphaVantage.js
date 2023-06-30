"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Api = _interopRequireDefault(require("./Api"));
var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));
var _IndicatorAdapter = _interopRequireDefault(require("./IndicatorAdapter"));
var _IntradayAdapter = _interopRequireDefault(require("./IntradayAdapter"));
var _SearchAdapter = _interopRequireDefault(require("./SearchAdapter"));
var _FundAdapter = _interopRequireDefault(require("./FundAdapter"));
var _EarnAdapter = _interopRequireDefault(require("./EarnAdapter"));
var _EconomicsAdapter = _interopRequireDefault(require("./EconomicsAdapter"));
const _rAdapter = {
    DF: _IndicatorAdapter.default,
    I: _IntradayAdapter.default,
    SR: _SearchAdapter.default,
    F: _FundAdapter.default,
    E: _EarnAdapter.default,
    EI: _EconomicsAdapter.default,
    CM: _EconomicsAdapter.default
  },
  adapter = (0, _crAdapterRouter.default)(_rAdapter, {
    isKey: true
  }),
  AlphaVantage = {
    api: _Api.default,
    adapter
  };
var _default = AlphaVantage;
exports.default = _default;
//# sourceMappingURL=AlphaVantage.js.map