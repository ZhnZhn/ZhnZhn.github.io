import { parseIntBy10 } from '../utils/isTypeFn';
import { toTdSafe } from '../utils/dateFormatFn';

import {
  FN_IDENTITY,
  FN_NOOP
} from './AdapterFn';
import { crTableConfig } from './toTableFn';
import crOrderBookRows from './crOrderBookRows';

export const crTitleDf = ({ items }) => items[0].c;

export const fCrTitle = (
  jsonPn,
  isSeconds
) => (option, json) => {
  const _multipleBy = isSeconds ? 1000 : 1
  , strDate = toTdSafe(parseIntBy10(json[jsonPn]) * _multipleBy);
  return `${crTitleDf(option)} ${strDate}`;
}

export const crAdapterOrderBook = ({
  crTitle=crTitleDf,
  crLimit=FN_NOOP,
  crOrderBook=FN_IDENTITY
}={}) => ({
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
