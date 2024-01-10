import {
  FN_IDENTITY,
  FN_NOOP
} from './AdapterFn';
import { crTableConfig } from './toTableFn';
import crOrderBookRows from './crOrderBookRows';

const crAdapterOrderBook = ({
  crTitle,
  crLimit=FN_NOOP,
  crOrderBook=FN_IDENTITY
}) => ({
   toConfig(json, option){
     const { _itemKey, dataSource } = option
     , title = crTitle(option, json)
     , _orderBook = crOrderBook(json)
     , _limit = crLimit(option)
     , [headers, rows] = crOrderBookRows(_orderBook, _limit)
     , config = crTableConfig({
        id: _itemKey,
        title,
        headers,
        rows,
        dataSource
     });
     return { config };
   }
})

export default crAdapterOrderBook
