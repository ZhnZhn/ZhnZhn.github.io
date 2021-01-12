import Big from 'big.js'
import toTableFn from './toTableFn'

const { crRows } = toTableFn;

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

const HEADERS = [
  {
    name: 'Bid Price',
    pn: 'b_p',
    toN: [],
    style: {
      color: '#4caf50',
      fontWeight: 'bold'
    }
  },
  {
    name: 'Bid QTY',
    pn: 'b_q',
    toN: [],
    style: {
      fontWeight: 'bold'
    }
  },
  {
    name: 'Ask QTY',
    pn: 'a_q',
    toN: [],
    style: {
      fontWeight: 'bold'
    }
  },
  {
    name: 'Ask Price',
    pn: 'a_p',
    toN: [],
    style: {
      color: '#f44336',
      fontWeight: 'bold'
    }
  }
];

const _calcTotal = (arr, len) => {
  let _total = Big(0), i = 0;
  for(i;i<len;i++){
    _total = _total.add(arr[i][1])
  }
  return _total;
};

const _crBgStyle = (onePerc, strV, isLeft) => {
  try {
    const perc = parseInt(Big(strV).div(onePerc).toFixed(0), 10)
    , { to, c } = isLeft ? S.TO_LEFT : S.TO_RIGHT;
    return {
      background: `linear-gradient(${to}, ${c} ${perc}%, transparent ${perc}% ${100-perc}%)`
    };
  } catch(err) {
    return;
  }
};

const crOrderBookRows = (json, limit) => {
  const { bids, asks } = json
  , _len = limit || bids.length
  , rows = []
  , _totalBids = _calcTotal(bids, _len)
  , _totalAsks = _calcTotal(asks, _len)
  , _onePerc = _totalBids.add(_totalAsks).div(100)
  , _crQtyStyle = _crBgStyle.bind(null, _onePerc);

  let i=0, bidItem, askItem;
  for (i; i<_len; i++){
    bidItem = bids[_len-1-i] || []
    askItem = asks[i] || []
    rows.push({
      b_p: bidItem[0],
      b_q: bidItem[1],
      a_p: askItem[0],
      a_q: askItem[1],
      style: {
        b_q: _crQtyStyle(bidItem[1], true),
        a_q: _crQtyStyle(askItem[1]),
      }
    })
  }
  rows.push({
    b_q: _totalBids.toString(),
    a_q: _totalAsks.toString(),
    style: {
      b_q: _crQtyStyle(_totalBids, true),
      a_q: _crQtyStyle(_totalAsks)
    }
  })
  return  crRows(HEADERS, rows);
}

crOrderBookRows.HEADERS = HEADERS

export default crOrderBookRows
