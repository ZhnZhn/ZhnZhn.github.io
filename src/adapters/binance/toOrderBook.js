import toTableFn from '../toTableFn';
import crOrderBookRows from '../crOrderBookRows';

const { crTableConfig } = toTableFn
, { HEADERS } = crOrderBookRows
, _crTitle = ({ items }) => items[0].s;

const toOrderBook = {
  toConfig(json, option){
    const { _itemKey, dataSource } = option
    , title = _crTitle(option)
    , _rows = crOrderBookRows(json)
    , config = crTableConfig({
      id: _itemKey, title,
      headers: HEADERS,
      rows: _rows,
      dataSource
    })
    return { config };
  }
};

export default toOrderBook
