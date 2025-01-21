"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterRouter = require("../crAdapterRouter");
var _toAssetList = require("./toAssetList");
var _toExchangeList = require("./toExchangeList");
var _toHistoryChart = require("./toHistoryChart");
const CoinCapAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  rAdapter: {
    MCL: _toAssetList.toAssetList,
    EVL: _toExchangeList.toExchangeList,
    HMC: _toHistoryChart.toHistoryChart
  },
  crDfKey: _AdapterFn.crDfItemKey
});
var _default = exports.default = CoinCapAdapter;
//# sourceMappingURL=CoinCapAdapter.js.map