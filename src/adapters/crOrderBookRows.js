import Big from "big.js";

import {
  filterBoolean
} from "../utils/arrFn";
import {
  isNumber,
  parseIntBy10
} from "../utils/isTypeFn"

import {
  bindTo
} from "./AdapterFn";
import {
  crStyleBold,
  crTableRows
} from "./toTableFn";

const _crBgStyleProps = (
  isLeft
) => isLeft
  ? ["to left", "#184416"]
  : ["to right", "#6c3632"];

const _crItemHeader = (
  name,
  pn,
  color
) => ({
   name, pn,
   toN: [],
   ...crStyleBold({ color })
})

const _crTableHeaders = (
  isOrderNumber
) => filterBoolean([
  _crItemHeader("Bid", "b_p", "#4caf50")
  , isOrderNumber ? _crItemHeader("BN", "b_n") : void 0
  , _crItemHeader("Bid QTY", "b_q")
  , _crItemHeader("Ask QTY", "a_q")
  , isOrderNumber ? _crItemHeader("AN", "a_n") : void 0
  , _crItemHeader("Ask", "a_p", "#f44336")
]);

const _calcTotal = (arr, valueIndex, len) => {
  let _total = Big(0), i = 0;
  for(i;i<len;i++){
    _total = _total.add(arr[i][valueIndex])
  }
  return _total;
};

const _crBgStyle = (onePerc, strV, isLeft) => {
  try {
    const perc = parseIntBy10(
      Big(strV).div(onePerc).toFixed(0)
    )
    , [to, color] = _crBgStyleProps(isLeft);
    return {
      background: `linear-gradient(${to}, ${color} ${perc}%, transparent ${perc}% ${100-perc}%)`
    };
  } catch(err) {
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
      a_q: _crQtyStyle(askItem[1]),
    }
});

const _crRowPnq = (bidItem, askItem, _crQtyStyle) => {
  const _row = _crRowPq(bidItem, askItem, _crQtyStyle);
  _row.b_n = bidItem[2]
  _row.a_n = askItem[2]
  return _row;
};

const crOrderBookRows = (json, limit) => {
  const { bids, asks } = json
  , _isOrderNumber = isNumber(asks[0][2])
  , _len = limit || bids.length
  , rows = []
  , _totalBids = _calcTotal(bids, 1, _len)
  , _totalAsks = _calcTotal(asks, 1, _len)
  , _onePerc = _totalBids.add(_totalAsks).div(100)
  , _crQtyStyle = bindTo(_crBgStyle, _onePerc)
  , _crRow = _isOrderNumber ? _crRowPnq : _crRowPq;

  let i=0, bidItem, askItem;
  for (i; i<_len; i++){
    bidItem = bids[_len-1-i] || []
    askItem = asks[i] || []
    rows.push(_crRow(bidItem, askItem, _crQtyStyle))
  }

  const _totalRow = {
    b_q: _totalBids.toString(),
    a_q: _totalAsks.toString(),
    style: {
      b_q: _crQtyStyle(_totalBids, true),
      a_q: _crQtyStyle(_totalAsks)
    }
  }
  if (_isOrderNumber) {
    _totalRow.b_n = _calcTotal(bids, 2, _len)
    _totalRow.a_n = _calcTotal(asks, 2, _len)
  }
  rows.push(_totalRow)

  const _headers = _crTableHeaders(_isOrderNumber);
  return  [_headers, crTableRows(_headers, rows)];
};

export default crOrderBookRows
