"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _AdapterFn = require("../AdapterFn");
var _AvStockMarketsApi = _interopRequireDefault(require("./AvStockMarketsApi"));
var _IndicatorAdapter = _interopRequireDefault(require("./IndicatorAdapter"));
var _IntradayAdapter = _interopRequireDefault(require("./IntradayAdapter"));
var _InstrAdapter = _interopRequireDefault(require("./InstrAdapter"));
var _SearchAdapter = _interopRequireDefault(require("./SearchAdapter"));
var _FundAdapter = _interopRequireDefault(require("./FundAdapter"));
var _EarnAdapter = _interopRequireDefault(require("./EarnAdapter"));
var _TopGainersLosersAdapter = _interopRequireDefault(require("./TopGainersLosersAdapter"));
var _EtfProfileAdapter = _interopRequireDefault(require("./EtfProfileAdapter"));
var _OverviewAdapter = _interopRequireDefault(require("./OverviewAdapter"));
const adapter = (0, _crAdapterRouter.crAdapterRouter)({
    rAdapter: {
      DF: _IndicatorAdapter.default,
      I: _IntradayAdapter.default,
      INSTR: _InstrAdapter.default,
      SR: _SearchAdapter.default,
      F: _FundAdapter.default,
      E: _EarnAdapter.default,
      GL: _TopGainersLosersAdapter.default,
      EP: _EtfProfileAdapter.default,
      OV: _OverviewAdapter.default
    },
    crDfKey: _AdapterFn.crDfItemKey
  }),
  AlphaVantage = {
    api: _AvStockMarketsApi.default,
    adapter
  };
var _default = exports.default = AlphaVantage;
//# sourceMappingURL=AvStockMarkets.js.map