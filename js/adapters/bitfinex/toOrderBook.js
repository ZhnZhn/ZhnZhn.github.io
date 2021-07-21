"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _crOrderBookRows = _interopRequireDefault(require("../crOrderBookRows"));

var crTableConfig = _toTableFn["default"].crTableConfig,
    HEADERS = _crOrderBookRows["default"].HEADERS;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _compareByPrice = function _compareByPrice(a, b) {
  return a[0] - b[0];
};
/*
From Bitfinex Documentation
[[
  PRICE:	float	Price level (Trading only)
  COUNT:	int	Number of orders at that price level
  ±AMOUNT:	float	Total amount available at that price level.
]]
if AMOUNT > 0 then bid else ask.
*/


var _crOrderBook = function _crOrderBook(json) {
  var asks = [],
      bids = [];
  json.forEach(function (arrItem) {
    if (_isNumber(arrItem[0])) {
      if (arrItem[2] > 0) {
        bids.push([arrItem[0], arrItem[2]]);
      } else {
        asks.push([arrItem[0], -1 * arrItem[2]]);
      }
    }
  });
  return {
    asks: asks.sort(_compareByPrice),
    bids: bids.sort(_compareByPrice).reverse()
  };
};

var toOrderBook = {
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        dataSource = option.dataSource,
        items = option.items,
        title = items[0].c + ' P0',
        _orderBook = _crOrderBook(json),
        rows = (0, _crOrderBookRows["default"])(_orderBook),
        config = crTableConfig({
      id: _itemKey,
      title: title,
      headers: HEADERS,
      rows: rows,
      dataSource: dataSource
    });

    return {
      config: config
    };
  }
};
var _default = toOrderBook;
exports["default"] = _default;
//# sourceMappingURL=toOrderBook.js.map