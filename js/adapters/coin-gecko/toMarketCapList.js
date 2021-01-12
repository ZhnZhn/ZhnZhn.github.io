"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crRows = _toTableFn["default"].crRows,
    crTableConfig = _toTableFn["default"].crTableConfig;
var crPageConfig = _fnAdapter["default"].crPageConfig;
var HEADERS = [{
  name: 'Rank',
  pn: 'market_cap_rank',
  toN: [],
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Name',
  pn: 'name'
}, {
  isHide: true,
  name: 'Coin',
  pn: 'symbol',
  style: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
}, {
  name: '1h %',
  pn: 'price_change_percentage_1h_in_currency',
  toN: [3],
  isR: true
}, {
  name: '24h %',
  pn: 'price_change_percentage_24h',
  toN: [3],
  isR: true
}, {
  name: '7d %',
  pn: 'price_change_percentage_7d_in_currency',
  toN: [3],
  isR: true
}, {
  name: 'Price',
  pn: 'current_price',
  toN: [],
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'MarketCap',
  pn: 'market_cap',
  toN: [],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  isHide: true,
  name: 'Updated UTC',
  pn: 'last_updated'
}];

var _toDate = function _toDate(rowDate) {
  var _rowDate = rowDate || '';

  return _rowDate.replace('T', ' ').split('.')[0];
};

var _transformDate = function _transformDate(json) {
  return json.map(function (item) {
    item.last_updated = _toDate(item.last_updated);
    return item;
  });
};

var _crDataSource = function _crDataSource(rows) {
  return "CoinGecko " + rows[0].last_updated + " UTC";
};

var toMarketCapList = {
  crKey: function crKey(option) {
    option.key = crPageConfig(option).join('_');
    return option.key;
  },
  toConfig: function toConfig(json, option) {
    var key = option.key,
        title = option.title,
        _json = _transformDate(json),
        _rows = crRows(HEADERS, _json),
        config = crTableConfig({
      id: key,
      title: title,
      headers: HEADERS,
      rows: _rows,
      dataSource: _crDataSource(_rows)
    });

    return {
      config: config
    };
  }
};
var _default = toMarketCapList;
exports["default"] = _default;
//# sourceMappingURL=toMarketCapList.js.map