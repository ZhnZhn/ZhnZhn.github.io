import toTableFn from '../toTableFn'
import fnAdapter from './fnAdapter'

const {
  crRows,
  crTableConfig
} = toTableFn
, {
    crPageConfig,
    getYmdhmUTC
  } = fnAdapter;

const HEADERS = [{
  name: 'Trust Rank',
  pn: 'trust_score_rank',
  toN: [],
  style: { textAlign: 'center' }
},{
  name: 'Name',
  pn: 'name'
},{
  name: '24h BTC',
  pn: 'trade_volume_24h_btc',
  toN: [2],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
},{
  name: '24h BTC Norm.',
  pn: 'trade_volume_24h_btc_normalized',
  toN: [2],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
},{
  name: 'Trust Score',
  pn: 'trust_score',
  toN: [],
  style: { textAlign: 'center' }
},{
  isHide: true,
  name: 'Year Estb.',
  pn: 'year_established',
  style: { textAlign: 'center' }
},{
  isHide: true,
  name: 'Country',
  pn: 'country'
},{
  isHide: true,
  name: 'Link',
  pn: 'url',
  isHref: true
}]

const toExchangeList = {
  crKey(option){
    option.key = crPageConfig(option).join('_');
    return option.key;
  },

  toConfig(json, option){
    const { key, title } = option
    , _rows = crRows(HEADERS, json)
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
