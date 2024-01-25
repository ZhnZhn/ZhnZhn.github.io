import {
  crNameProps,
  crNumberProps,
  crTableRows,
  crTableConfig
} from '../toTableFn';
import {
  crPageConfig,
  getYmdhmUTC
} from './fnAdapter';

const HEADERS = [{
  ...crNameProps('Trust Rank', 'trust_score_rank'),
  toN: [],
  style: { textAlign: 'center' }
}
, crNameProps('Name', 'name')
, {
  ...crNameProps('24h BTC', 'trade_volume_24h_btc'),
  ...crNumberProps(0)
},{
  ...crNameProps('24h BTC Norm.', 'trade_volume_24h_btc_normalized'),
  ...crNumberProps(0)
},{
  ...crNameProps('Trust Score', 'trust_score'),
  toN: [],
  style: { textAlign: 'center' }
},{
  ...crNameProps('Year Estb.', 'year_established', true),
  style: { textAlign: 'center' }
}
, crNameProps('Country', 'country', true)
, {
  ...crNameProps('Link', 'url', true),
  isHref: true
}];

const toExchangeList = {
  crKey(option){
    option.key = crPageConfig(option).join('_');
    return option.key;
  },

  toConfig(json, option){
    const { key, title } = option
    , _rows = crTableRows(HEADERS, json)
    , config = crTableConfig({
      id: key, title,
      headers: HEADERS,
      rows: _rows,
      dataSource: `CoinGecko ${getYmdhmUTC()}`,
      fns: {
        valueToHref: (id, v) => v
      }
    });
    return { config };
  }
}

export default toExchangeList
