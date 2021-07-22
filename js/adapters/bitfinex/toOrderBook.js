"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterOrderBook = _interopRequireDefault(require("../crAdapterOrderBook"));

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _compareByPrice = function _compareByPrice(a, b) {
  return a[0] - b[0];
};

var crTitle = function crTitle(_ref) {
  var items = _ref.items;
  return items[0].c + ' P0';
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


var crOrderBook = function crOrderBook(json) {
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

var toOrderBook = (0, _crAdapterOrderBook["default"])({
  crTitle: crTitle,
  crOrderBook: crOrderBook
});
var _default = toOrderBook;
exports["default"] = _default;
//# sourceMappingURL=toOrderBook.js.map