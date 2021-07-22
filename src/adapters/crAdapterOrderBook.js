import toTableFn from './toTableFn';
import crOrderBookRows from './crOrderBookRows';

const { crTableConfig } = toTableFn
, { HEADERS } = crOrderBookRows;

const fnNoop = () => {};
const fnIdentity = json => json;

const crAdapterOrderBook = ({
  crTitle,
  crLimit=fnNoop,
  crOrderBook=fnIdentity
}) => ({
   toConfig(json, option){
     const { _itemKey, dataSource } = option
     , title = crTitle(option, json)
     , _orderBook = crOrderBook(json)
     , _limit = crLimit(option)
     , rows = crOrderBookRows(_orderBook, _limit)
     , config = crTableConfig({
        id: _itemKey, title,
        headers: HEADERS,
        rows, dataSource
     });
     return { config };
   }
})

export default crAdapterOrderBook
