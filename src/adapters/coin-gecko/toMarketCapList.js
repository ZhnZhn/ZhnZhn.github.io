import {
  crNameProps,
  crTableRows,
  crTableConfig
} from '../toTableFn';
import { crPageConfig } from './fnAdapter';

const _crPriceChangeItem = (
  name,
  pnSuffix,
  isHide
) => ({
  ...crNameProps(
    name,
    `price_change_percentage_${pnSuffix}`,
    isHide
  ),
  toN: [2],
  isR: true
});
const _crStyleItem = (name, pn, options) => ({
  ...crNameProps(name, pn),
  toN: [],
  style: {
    fontWeight: 'bold'
  },
  ...options
});

let _headers;
const _getTableHeaders = () => _headers
  || (_headers = [{
    ...crNameProps('Rank', 'market_cap_rank'),
    toN: [],
    style: { textAlign: 'center' }
  }
  , crNameProps('Name')
  , {
    ...crNameProps('Symbol', true),
    style: {
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }
  },

  _crPriceChangeItem('1h %', '1h_in_currency'),
  _crPriceChangeItem('24h %', '24h'),
  _crPriceChangeItem('7d %', '7d_in_currency'),
  _crPriceChangeItem('30d %', '30d_in_currency', true),
  _crPriceChangeItem('1y %', '1y_in_currency', true),

  _crStyleItem('Price', 'current_price'),
  _crStyleItem('MarketCap', 'market_cap', {isF: true})
  , crNameProps('Updated UTC', 'last_updated', true)
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
    return { config };
  }
}

export default toMarketCapList
