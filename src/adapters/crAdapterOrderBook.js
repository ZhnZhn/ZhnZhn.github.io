import { crTableConfig } from './toTableFn';
import crOrderBookRows from './crOrderBookRows';

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
     , [headers, rows] = crOrderBookRows(_orderBook, _limit)
     , config = crTableConfig({
        id: _itemKey, title,
        headers,
        rows, dataSource
     });
     return { config };
   }
})

export default crAdapterOrderBook
