import toTableFn from '../toTableFn'
import fnAdapter from './fnAdapter'
import crTableConfig from './crTableConfig'

const { crRows } = toTableFn;
const { crPageConfig } = fnAdapter;

const HEADERS = [{
  name: 'Rank',
  pn: 'market_cap_rank',
  isToN: true,
  style: { textAlign: 'center' }
},{
  name: 'Name',
  pn: 'name',
},{
  isHide: true,
  name: 'Coin',
  pn: 'symbol',
  style: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
},{
  name: '1h %',
  pn: 'price_change_percentage_1h_in_currency',
  isToN: true,
  isToFixed: true,
  toFixedBy: 3,
  isR: true
},{
  name: '24h %',
  pn: 'price_change_percentage_24h',
  isToN: true,
  isToFixed: true,
  toFixedBy: 3,
  isR: true
},{
  name: '7d %',
  pn: 'price_change_percentage_7d_in_currency',
  isToN: true,
  isToFixed: true,
  toFixedBy: 3,
  isR: true
},{
  name: 'Price',
  pn: 'current_price',
  isToN: true,
  style: {
    fontWeight: 'bold'
  }
},{
  name: 'MarketCap',
  pn: 'market_cap',
  isToN: true,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
},{
  isHide: true,
  name: 'Updated UTC',
  pn: 'last_updated'
}
];

const _toDate = (rowDate) => {
  const _rowDate = rowDate || '';
  return _rowDate.replace('T', ' ').split('.')[0];
}

const _transformDate = json => {
  return json.map(item => {
    item.last_updated = _toDate(item.last_updated)
    return item;
  })
};

const _crDataSource = (rows) => {
  return `CoinGecko ${rows[0].last_updated} UTC`;
};

const toMarketCapList = {
  crKey(option){
    option.key = crPageConfig(option).join('_');
    return option.key;
  },

  toConfig(json, option){
    const { key, title } = option
    , _json = _transformDate(json)
    , _rows = crRows(HEADERS, _json)
    , config = crTableConfig({
      id: key, title,
      headers: HEADERS,
      rows: _rows,
      dataSource: _crDataSource(_rows)
    })
    return { config };
  }
}

export default toMarketCapList
