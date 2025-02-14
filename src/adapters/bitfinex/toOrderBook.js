import { isTypeNumber } from '../AdapterFn';
import {
  crTitleDf,
  crAdapterOrderBook
} from '../crAdapterOrderBook';

const _compareByPrice = (a, b) => a[0] - b[0];

const crTitle = (option) => crTitleDf(option) + ' P0';

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
  const asks = [], bids = [];
  json.forEach(arrItem => {
    if (isTypeNumber(arrItem[0])) {
      if (arrItem[2] > 0) {
        bids.push([arrItem[0], arrItem[2], arrItem[1]])
      } else {
        asks.push([arrItem[0], -1*arrItem[2], arrItem[1]])
      }
    }
  })
  return {
    asks: asks.sort(_compareByPrice),
    bids: bids.sort(_compareByPrice).reverse()
  }
};

const toOrderBook = crAdapterOrderBook({ crTitle, crOrderBook });

export default toOrderBook
