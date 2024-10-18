"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Api = _interopRequireDefault(require("./Api"));
var _crAdapterRouter = require("../crAdapterRouter");
var _IndicatorAdapter = _interopRequireDefault(require("./IndicatorAdapter"));
var _IntradayAdapter = _interopRequireDefault(require("./IntradayAdapter"));
var _SearchAdapter = _interopRequireDefault(require("./SearchAdapter"));
var _FundAdapter = _interopRequireDefault(require("./FundAdapter"));
var _EarnAdapter = _interopRequireDefault(require("./EarnAdapter"));
var _EconomicsAdapter = _interopRequireDefault(require("./EconomicsAdapter"));
var _TopGainersLosersAdapter = _interopRequireDefault(require("./TopGainersLosersAdapter"));
var _CryptocurrencyAdapter = _interopRequireDefault(require("./CryptocurrencyAdapter"));
var _EtfProfileAdapter = _interopRequireDefault(require("./EtfProfileAdapter"));
var _OverviewAdapter = _interopRequireDefault(require("./OverviewAdapter"));
const adapter = (0, _crAdapterRouter.crAdapterRouter)({
    rAdapter: {
      DF: _IndicatorAdapter.default,
      I: _IntradayAdapter.default,
      SR: _SearchAdapter.default,
      F: _FundAdapter.default,
      E: _EarnAdapter.default,
      EI: _EconomicsAdapter.default,
      CM: _EconomicsAdapter.default,
      GL: _TopGainersLosersAdapter.default,
      CR: _CryptocurrencyAdapter.default,
      EP: _EtfProfileAdapter.default,
      OV: _OverviewAdapter.default
    },
    isKey: true
  }),
  AlphaVantage = {
    api: _Api.default,
    adapter
  };
var _default = exports.default = AlphaVantage;
//# sourceMappingURL=AlphaVantage.js.map