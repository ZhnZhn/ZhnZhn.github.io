"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _toAssetListAdapter = require("./toAssetListAdapter");
var _toHistoryChartAdapter = require("./toHistoryChartAdapter");
const CoinCapAdapter = (0, _crAdapterRouter.crAdapterRouter)({
  rAdapter: {
    MCL: _toAssetListAdapter.toAssetListAdapter,
    HMC: _toHistoryChartAdapter.toHistoryChartAdapter
  },
  isKey: true
});
var _default = exports.default = CoinCapAdapter;
//# sourceMappingURL=CoinCapAdapter.js.map