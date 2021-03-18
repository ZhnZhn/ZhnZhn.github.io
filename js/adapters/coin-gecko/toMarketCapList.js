"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crRows = _toTableFn["default"].crRows,
    crTableConfig = _toTableFn["default"].crTableConfig;
var crPageConfig = _fnAdapter["default"].crPageConfig;

var _crPriceChangeItem = function _crPriceChangeItem(name, pnSuffix, options) {
  return (0, _extends2["default"])({
    name: name,
    pn: "price_change_percentage_" + pnSuffix,
    toN: [3],
    isR: true
  }, options);
};

var _crStyleItem = function _crStyleItem(name, pn, options) {
  return (0, _extends2["default"])({
    name: name,
    pn: pn,
    toN: [],
    style: {
      fontWeight: 'bold'
    }
  }, options);
};

var _headers;

var _getTableHeaders = function _getTableHeaders() {
  return _headers || (_headers = [{
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
  }, _crPriceChangeItem('1h %', '1h_in_currency'), _crPriceChangeItem('24h %', '24h'), _crPriceChangeItem('7d %', '7d_in_currency'), _crPriceChangeItem('30d %', '30d_in_currency', {
    isHide: true
  }), _crPriceChangeItem('1y %', '1y_in_currency', {
    isHide: true
  }), _crStyleItem('Price', 'current_price'), _crStyleItem('MarketCap', 'market_cap', {
    isF: true
  }), {
    isHide: true,
    name: 'Updated UTC',
    pn: 'last_updated'
  }]);
};

var _toDate = function _toDate(rowDate) {
  return (rowDate || '').replace('T', ' ').split('.')[0];
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
        headers = _getTableHeaders(),
        rows = crRows(headers, _json),
        config = crTableConfig({
      id: key,
      title: title,
      headers: headers,
      rows: rows,
      dataSource: _crDataSource(rows)
    });

    return {
      config: config
    };
  }
};
var _default = toMarketCapList;
exports["default"] = _default;
//# sourceMappingURL=toMarketCapList.js.map