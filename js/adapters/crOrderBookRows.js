"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _toTableFn = _interopRequireDefault(require("./toTableFn"));

var crRows = _toTableFn["default"].crRows;
var S = {
  TO_LEFT: {
    to: 'to left',
    c: '#184416'
  },
  TO_RIGHT: {
    to: 'to right',
    c: '#6c3632'
  }
};
var HEADERS = [{
  name: 'Bid Price',
  pn: 'b_p',
  isToN: true,
  style: {
    color: '#4caf50',
    fontWeight: 'bold'
  }
}, {
  name: 'Bid QTY',
  pn: 'b_q',
  isToN: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'Ask QTY',
  pn: 'a_q',
  isToN: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'Ask Price',
  pn: 'a_p',
  isToN: true,
  style: {
    color: '#f44336',
    fontWeight: 'bold'
  }
}];

var _calcTotal = function _calcTotal(arr, len) {
  var _total = (0, _big["default"])(0),
      i = 0;

  for (i; i < len; i++) {
    _total = _total.add(arr[i][1]);
  }

  return _total;
};

var _crBgStyle = function _crBgStyle(onePerc, strV, isLeft) {
  try {
    var perc = parseInt((0, _big["default"])(strV).div(onePerc).toFixed(0), 10),
        _ref = isLeft ? S.TO_LEFT : S.TO_RIGHT,
        to = _ref.to,
        c = _ref.c;

    return {
      background: "linear-gradient(" + to + ", " + c + " " + perc + "%, transparent " + perc + "% " + (100 - perc) + "%)"
    };
  } catch (err) {
    return;
  }
};

var crOrderBookRows = function crOrderBookRows(json, limit) {
  var bids = json.bids,
      asks = json.asks,
      _len = limit || bids.length,
      rows = [],
      _totalBids = _calcTotal(bids, _len),
      _totalAsks = _calcTotal(asks, _len),
      _onePerc = _totalBids.add(_totalAsks).div(100),
      _crQtyStyle = _crBgStyle.bind(null, _onePerc);

  var i = 0,
      bidItem,
      askItem;

  for (i; i < _len; i++) {
    bidItem = bids[_len - 1 - i] || [];
    askItem = asks[i] || [];
    rows.push({
      b_p: bidItem[0],
      b_q: bidItem[1],
      a_p: askItem[0],
      a_q: askItem[1],
      style: {
        b_q: _crQtyStyle(bidItem[1], true),
        a_q: _crQtyStyle(askItem[1])
      }
    });
  }

  rows.push({
    b_q: _totalBids.toString(),
    a_q: _totalAsks.toString(),
    style: {
      b_q: _crQtyStyle(_totalBids, true),
      a_q: _crQtyStyle(_totalAsks)
    }
  });
  return crRows(HEADERS, rows);
};

crOrderBookRows.HEADERS = HEADERS;
var _default = crOrderBookRows;
exports["default"] = _default;
//# sourceMappingURL=crOrderBookRows.js.map