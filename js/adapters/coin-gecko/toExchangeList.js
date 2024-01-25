"use strict";

exports.__esModule = true;
exports.default = void 0;
var _toTableFn = require("../toTableFn");
var _fnAdapter = require("./fnAdapter");
const HEADERS = [{
  ...(0, _toTableFn.crNameProps)('Trust Rank', 'trust_score_rank'),
  toN: [],
  style: {
    textAlign: 'center'
  }
}, (0, _toTableFn.crNameProps)('Name', 'name'), {
  ...(0, _toTableFn.crNameProps)('24h BTC', 'trade_volume_24h_btc'),
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  ...(0, _toTableFn.crNameProps)('24h BTC Norm.', 'trade_volume_24h_btc_normalized'),
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  ...(0, _toTableFn.crNameProps)('Trust Score', 'trust_score'),
  toN: [],
  style: {
    textAlign: 'center'
  }
}, {
  ...(0, _toTableFn.crNameProps)('Year Estb.', 'year_established', true),
  style: {
    textAlign: 'center'
  }
}, (0, _toTableFn.crNameProps)('Country', 'country', true), {
  ...(0, _toTableFn.crNameProps)('Link', 'url', true),
  isHref: true
}];
const toExchangeList = {
  crKey(option) {
    option.key = (0, _fnAdapter.crPageConfig)(option).join('_');
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