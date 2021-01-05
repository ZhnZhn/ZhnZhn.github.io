
import AdapterFn from '../AdapterFn'
import toTableFn from '../toTableFn';
import crOrderBookRows from '../crOrderBookRows';

const { toTd } = AdapterFn
, { crTableConfig } = toTableFn
, { HEADERS } = crOrderBookRows
, _crLimit = ({ items }) => parseInt(items[1].v, 10)
, _crTitle = ({ timestamp } , { items }) => {
  const strDate = toTd(parseInt(timestamp, 10)*1000);
  return `${items[0].c} ${strDate}`;
};

const toOrderBook = {
  toConfig(json, option){
    const { _itemKey, dataSource } = option
    , title = _crTitle(json, option)
    , limit = _crLimit(option)
    , rows = crOrderBookRows(json, limit)
    , config = crTableConfig({
       id: _itemKey, title,
       headers: HEADERS,
       rows, dataSource
    });
    return { config };
  }
};

export default toOrderBook
