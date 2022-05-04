"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _toTableFn = require("./toTableFn");

const S = {
  TO_LEFT: {
    to: 'to left',
    c: '#184416'
  },
  TO_RIGHT: {
    to: 'to right',
    c: '#6c3632'
  }
};

const _crItemHeader = (name, pn, color) => ({
  name,
  pn,
  toN: [],
  style: {
    color,
    fontWeight: 'bold'
  }
});

const _crTableHeaders = isOrderNumber => [_crItemHeader('Bid', 'b_p', '#4caf50'), isOrderNumber ? _crItemHeader('BN', 'b_n') : void 0, _crItemHeader('Bid QTY', 'b_q'), _crItemHeader('Ask QTY', 'a_q'), isOrderNumber ? _crItemHeader('AN', 'a_n') : void 0, _crItemHeader('Ask', 'a_p', '#f44336')].filter(Boolean);

const _calcTotal = (arr, valueIndex, len) => {
  let _total = (0, _big.default)(0),
      i = 0;

  for (i; i < len; i++) {
    _total = _total.add(arr[i][valueIndex]);
  }

  return _total;
};

const _crBgStyle = (onePerc, strV, isLeft) => {
  try {
    const perc = parseInt((0, _big.default)(strV).div(onePerc).toFixed(0), 10),
          {
      to,
      c
    } = isLeft ? S.TO_LEFT : S.TO_RIGHT;
    return {
      background: "linear-gradient(" + to + ", " + c + " " + perc + "%, transparent " + perc + "% " + (100 - perc) + "%)"
    };
  } catch (err) {
    return;
  }
};

const _crRowPq = (bidItem, askItem, _crQtyStyle) => ({
  b_p: bidItem[0],
  b_q: bidItem[1],
  a_p: askItem[0],
  a_q: askItem[1],
  style: {
    b_q: _crQtyStyle(bidItem[1], true),
    a_q: _crQtyStyle(askItem[1])
  }
});

const _crRowPnq = (bidItem, askItem, _crQtyStyle) => {
  const _row = _crRowPq(bidItem, askItem, _crQtyStyle);

  _row.b_n = bidItem[2];
  _row.a_n = askItem[2];
  return _row;
};

const crOrderBookRows = (json, limit) => {
  const {
    bids,
    asks
  } = json,
        _isOrderNumber = typeof asks[0][2] === 'number',
        _len = limit || bids.length,
        rows = [],
        _totalBids = _calcTotal(bids, 1, _len),
        _totalAsks = _calcTotal(asks, 1, _len),
        _onePerc = _totalBids.add(_totalAsks).div(100),
        _crQtyStyle = _crBgStyle.bind(null, _onePerc),
        _crRow = _isOrderNumber ? _crRowPnq : _crRowPq;

  let i = 0,
      bidItem,
      askItem;

  for (i; i < _len; i++) {
    bidItem = bids[_len - 1 - i] || [];
    askItem = asks[i] || [];
    rows.push(_crRow(bidItem, askItem, _crQtyStyle));
  }

  const _totalRow = {
    b_q: _totalBids.toString(),
    a_q: _totalAsks.toString(),
    style: {
      b_q: _crQtyStyle(_totalBids, true),
      a_q: _crQtyStyle(_totalAsks)
    }
  };

  if (_isOrderNumber) {
    _totalRow.b_n = _calcTotal(bids, 2, _len);
    _totalRow.a_n = _calcTotal(asks, 2, _len);
  }

  rows.push(_totalRow);

  const _headers = _crTableHeaders(_isOrderNumber);

  return [_headers, (0, _toTableFn.crTableRows)(_headers, rows)];
};

var _default = crOrderBookRows;
exports.default = _default;
//# sourceMappingURL=crOrderBookRows.js.map