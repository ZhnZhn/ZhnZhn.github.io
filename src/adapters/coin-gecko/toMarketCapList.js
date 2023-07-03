import {
  crTableRows,
  crTableConfig
} from '../toTableFn';
import { crPageConfig } from './fnAdapter';

const _crPriceChangeItem = (
  name,
  pnSuffix,
  options
) => ({
  name,
  pn: `price_change_percentage_${pnSuffix}`,
  toN: [3],
  isR: true,
  ...options
});
const _crStyleItem = (name, pn, options) => ({
  name, pn,
  toN: [],
  style: {
    fontWeight: 'bold'
  },
  ...options
});

let _headers;
const _getTableHeaders = () => _headers
  || (_headers = [{
    name: 'Rank',
    pn: 'market_cap_rank',
    toN: [],
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
  },
  _crPriceChangeItem('1h %', '1h_in_currency'),
  _crPriceChangeItem('24h %', '24h'),
  _crPriceChangeItem('7d %', '7d_in_currency'),
  _crPriceChangeItem('30d %', '30d_in_currency', {isHide: true}),
  _crPriceChangeItem('1y %', '1y_in_currency', {isHide: true}),
  _crStyleItem('Price', 'current_price'),
  _crStyleItem('MarketCap', 'market_cap', {isF: true})
  ,{
    isHide: true,
    name: 'Updated UTC',
    pn: 'last_updated'
  }
]);

const _toDate = rowDate => (rowDate || '')
  .replace('T', ' ')
  .split('.')[0];

const _transformDate = json => json
 .map(item => {
   item.last_updated = _toDate(item.last_updated)
   return item;
 });


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
    , headers = _getTableHeaders()
    , rows = crTableRows(headers, _json)
    , config = crTableConfig({
      id: key, title,
      headers, rows,
      dataSource: _crDataSource(rows)
    });
    console.log(config)
    return { config };
  }
}

export default toMarketCapList
