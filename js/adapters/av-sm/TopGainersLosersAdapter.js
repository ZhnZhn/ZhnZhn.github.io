"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _toTableFn = require("../toTableFn");
var _fnAdapter = require("./fnAdapter");
const ID = "alp_perf",
  DATA_SOURCE = "Alpha Vantage",
  S_DS = {
    paddingTop: 6
  },
  _crHeaderItem = (name, pn, options) => ({
    ...options,
    name,
    pn
  }),
  HEADERS = [_crHeaderItem("Ticker", "id"), _crHeaderItem("Price", "p"), _crHeaderItem("1d Amount", "cha", {
    isHide: true
  }), _crHeaderItem("1d %", "chp", {
    isR: true
  }), _crHeaderItem("Volume", "v", {
    ...(0, _toTableFn.crStyleBold)(),
    isF: true
  })],
  _crTableOptions = (id, title, rows) => ({
    ...(0, _toTableFn.crTableOptions)(id, title, [...HEADERS], void 0, rows, DATA_SOURCE),
    dsStyle: S_DS
  });
const _roundBy2 = str => (0, _fnAdapter.roundBy)(parseFloat(str), 2);
const _crRows = rows => (0, _isTypeFn.isArr)(rows) ? rows.map(item => ({
  id: item.ticker,
  p: _roundBy2(item.price),
  cha: _roundBy2(item.change_amount),
  chp: _roundBy2((item.change_percentage || "").replace("%")),
  v: (0, _isTypeFn.parseIntBy10)(item.volume)
})) : [];
const _crConfig = json => [_crRows(json.top_gainers), _crRows(json.top_losers), _crRows(json.most_actively_traded)];
const TopGainersLosersAdapter = {
  crKey() {
    return ID;
  },
  toConfig(json, option) {
    const id = ID,
      _updated = json.last_updated || "",
      [gainers, losers, mostActiveTraded] = _crConfig(json),
      config = {
        id: id,
        zhCompType: "ALPHA_PERF",
        zhConfig: {
          id: id,
          key: id
        },
        g: _crTableOptions(`${id}_g`, `Gainers ${_updated}`, gainers),
        l: _crTableOptions(`${id}_l`, `Losers ${_updated}`, losers),
        m: _crTableOptions(`${id}_m`, `Most Active Traded ${_updated}`, mostActiveTraded)
      };
    return {
      config
    };
  }
};
var _default = exports.default = TopGainersLosersAdapter;
//# sourceMappingURL=TopGainersLosersAdapter.js.map