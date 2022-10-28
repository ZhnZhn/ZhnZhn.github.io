"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crAdapterOrderBook = _interopRequireDefault(require("../crAdapterOrderBook"));

const _compareByPrice = (a, b) => a[0] - b[0];

const crTitle = _ref => {
  let {
    items
  } = _ref;
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


const crOrderBook = json => {
  const asks = [],
        bids = [];
  json.forEach(arrItem => {
    if ((0, _AdapterFn.isTypeNumber)(arrItem[0])) {
      if (arrItem[2] > 0) {
        bids.push([arrItem[0], arrItem[2], arrItem[1]]);
      } else {
        asks.push([arrItem[0], -1 * arrItem[2], arrItem[1]]);
      }
    }
  });
  return {
    asks: asks.sort(_compareByPrice),
    bids: bids.sort(_compareByPrice).reverse()
  };
};

const toOrderBook = (0, _crAdapterOrderBook.default)({
  crTitle,
  crOrderBook
});
var _default = toOrderBook;
exports.default = _default;
//# sourceMappingURL=toOrderBook.js.map