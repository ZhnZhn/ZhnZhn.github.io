"use strict";

exports.__esModule = true;
exports.default = void 0;
var _toTableFn = require("../toTableFn");
var _fnAdapter = require("./fnAdapter");
const PN_TRADE_VOLUME_24H_BTC = "trade_volume_24h_btc",
  PN_TRADE_VOLUME_24H_BTC_NORM = `${PN_TRADE_VOLUME_24H_BTC}_normalized`,
  HEADERS = [(0, _toTableFn.crRankProps)("Trust Rank", "trust_score_rank"), (0, _toTableFn.crNameProps)("Name"), {
    ...(0, _toTableFn.crNameProps)("24h BTC", PN_TRADE_VOLUME_24H_BTC),
    ...(0, _toTableFn.crNumberProps)(0)
  }, {
    ...(0, _toTableFn.crNameProps)("24h BTC Norm.", PN_TRADE_VOLUME_24H_BTC_NORM),
    ...(0, _toTableFn.crNumberProps)(0)
  }, (0, _toTableFn.crRankProps)("Trust Score", "trust_score"), {
    ...(0, _toTableFn.crNameProps)("Year Estb.", "year_established", true),
    ...(0, _toTableFn.crStyleCenter)()
  }, (0, _toTableFn.crNameProps)("Country", true), {
    ...(0, _toTableFn.crNameProps)("Link", "url", true),
    isHref: true
  }];
const toExchangeList = {
  crKey(option) {
    option.key = (0, _fnAdapter.crPageConfig)(option).join("_");
    return option.key;
  },
  toConfig(json, option) {
    const {
        key,
        title
      } = option,
      _rows = (0, _toTableFn.crTableRows)(HEADERS, json),
      config = (0, _toTableFn.crTableConfig)({
        id: key,
        title,
        headers: HEADERS,
        rows: _rows,
        dataSource: `CoinGecko ${(0, _fnAdapter.getYmdhmUTC)()}`,
        fns: {
          valueToHref: (id, v) => v
        }
      });
    return {
      config
    };
  }
};
var _default = exports.default = toExchangeList;
//# sourceMappingURL=toExchangeList.js.map