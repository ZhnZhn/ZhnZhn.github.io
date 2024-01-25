"use strict";

exports.__esModule = true;
exports.default = void 0;
var _toTableFn = require("../toTableFn");
var _fnAdapter = require("./fnAdapter");
const HEADERS = [{
  name: 'Trust Rank',
  pn: 'trust_score_rank',
  toN: [],
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Name',
  pn: 'name'
}, {
  name: '24h BTC',
  pn: 'trade_volume_24h_btc',
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  name: '24h BTC Norm.',
  pn: 'trade_volume_24h_btc_normalized',
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  name: 'Trust Score',
  pn: 'trust_score',
  toN: [],
  style: {
    textAlign: 'center'
  }
}, {
  isHide: true,
  name: 'Year Estb.',
  pn: 'year_established',
  style: {
    textAlign: 'center'
  }
}, {
  isHide: true,
  name: 'Country',
  pn: 'country'
}, {
  isHide: true,
  name: 'Link',
  pn: 'url',
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