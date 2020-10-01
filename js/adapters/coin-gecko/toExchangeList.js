"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _crTableConfig = _interopRequireDefault(require("./crTableConfig"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crRows = _toTableFn["default"].crRows,
    crPageConfig = _fnAdapter["default"].crPageConfig,
    getYmdhmUTC = _fnAdapter["default"].getYmdhmUTC;
var HEADERS = [{
  name: 'Trust Rank',
  pn: 'trust_score_rank',
  isToN: true,
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Name',
  pn: 'name'
}, {
  name: '24h BTC',
  pn: 'trade_volume_24h_btc',
  isToN: true,
  isToFixed: true,
  toFixedBy: 2,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: '24h BTC Norm.',
  pn: 'trade_volume_24h_btc_normalized',
  isToN: true,
  isToFixed: true,
  toFixedBy: 2,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'Trust Score',
  pn: 'trust_score',
  isToN: true,
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
var toExchangeList = {
  crKey: function crKey(option) {
    option.key = crPageConfig(option).join('_');
    return option.key;
  },
  toConfig: function toConfig(json, option) {
    var key = option.key,
        title = option.title,
        _rows = crRows(HEADERS, json),
        config = (0, _crTableConfig["default"])({
      id: key,
      title: title,
      headers: HEADERS,
      rows: _rows,
      dataSource: "CoinGecko " + getYmdhmUTC(),
      fns: {
        valueToHref: function valueToHref(id, v) {
          return v;
        }
      }
    });

    return {
      config: config
    };
  }
};
var _default = toExchangeList;
exports["default"] = _default;
//# sourceMappingURL=toExchangeList.js.map