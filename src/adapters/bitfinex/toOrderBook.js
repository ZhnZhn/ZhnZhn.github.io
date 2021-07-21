import toTableFn from '../toTableFn';
import crOrderBookRows from '../crOrderBookRows';

const { crTableConfig } = toTableFn
, { HEADERS } = crOrderBookRows;

const _isNumber = n => typeof n === 'number';

const _compareByPrice = (a, b) => a[0] - b[0];

/*
From Bitfinex Documentation
[[
  PRICE:	float	Price level (Trading only)
  COUNT:	int	Number of orders at that price level
  ±AMOUNT:	float	Total amount available at that price level.
]]
if AMOUNT > 0 then bid else ask.
*/

const _crOrderBook = json => {
  const asks = [], bids = [];
  json.forEach(arrItem => {
    if (_isNumber(arrItem[0])) {
      if (arrItem[2] > 0) {
        bids.push([arrItem[0], arrItem[2]])
      } else {
        asks.push([arrItem[0], -1*arrItem[2]])
      }
    }
  })
  return {
    asks: asks.sort(_compareByPrice),
    bids: bids.sort(_compareByPrice).reverse()
  }
}

const toOrderBook = {
  toConfig(json, option){
    const { _itemKey, dataSource, items } = option
    , title = items[0].c + ' P0'
    , _orderBook = _crOrderBook(json)
    , rows = crOrderBookRows(_orderBook)
    , config = crTableConfig({
       id: _itemKey, title,
       headers: HEADERS,
       rows, dataSource
    });
    return { config };
  }
};

export default toOrderBook
