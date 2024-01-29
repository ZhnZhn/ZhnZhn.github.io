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

const _crNumberCenterProps = () => ({
  toN: [],
  style: { textAlign: 'center' }
})
, PN_TRADE_VOLUME_24H_BTC = 'trade_volume_24h_btc'
, PN_TRADE_VOLUME_24H_BTC_NORM = `${PN_TRADE_VOLUME_24H_BTC}_normalized`
, HEADERS = [{
  ...crNameProps('Trust Rank', 'trust_score_rank'),
  ..._crNumberCenterProps()
}
, crNameProps('Name')
, {
  ...crNameProps('24h BTC', PN_TRADE_VOLUME_24H_BTC),
  ...crNumberProps(0)
},{
  ...crNameProps('24h BTC Norm.', PN_TRADE_VOLUME_24H_BTC_NORM),
  ...crNumberProps(0)
},{
  ...crNameProps('Trust Score', 'trust_score'),
  ..._crNumberCenterProps()
},{
  ...crNameProps('Year Estb.', 'year_established', true),
  style: { textAlign: 'center' }
}
, crNameProps('Country', true)
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
