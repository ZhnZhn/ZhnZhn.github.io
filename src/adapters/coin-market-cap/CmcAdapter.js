
import DateUtils from '../../utils/DateUtils'
import AdapterFn from '../AdapterFn'
import toTableFn from '../toTableFn'

const { getUTCTime } = DateUtils;
const { numberFormat } = AdapterFn;
const { crRows } = toTableFn;

const HEADERS = [{
  name: 'Rank',
  pn: 'rank',
  isToN: true,
  style: { textAlign: 'center' }
},{
  name: 'Coin',
  pn: 'symbol',
  isHref: true
},{
  name: 'MarketCap',
  pn: 'market_cap_usd',
  isToN: true,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
},{
   name: '1h %',
   pn: 'percent_change_1h',
   isToN: true,
   isR: true
},{
  name: '24h %',
  pn: 'percent_change_24h',
  isToN: true,
  isR: true
},{
  name: '24h Vol.',
  pn: '24h_volume_usd',
  isToN: true,
  isToFixed: true,
  toFixedBy: 0,
  isR: true,
  isF: true,
  style: {
    textAlign: 'right'
  }
},{
  name: '7d %',
  pn: 'percent_change_7d',
  isToN: true,
  isR: true
}
];

const _crUpdatedTime = (json) => {
  const _seconds = json.map(coin => coin.last_updated)
  , _minMs = Math.max.apply(Math, _seconds)*1000
  , _maxMs = Math.min.apply(Math, _seconds)*1000
  , _fromTime = getUTCTime(_minMs)
  , _toTime = getUTCTime(_maxMs);
  return _fromTime !== _toTime
    ? `${_fromTime} - ${_toTime}`
    : _fromTime;
};

const _crTitle = ({ one, two }, json) => {
  const _two = parseFloat(two) - 1
  , _one = parseFloat(one) + 1
  , _updatedTime = _crUpdatedTime(json);
  return `${_one} - ${_one + _two}: Values in USD: Updated ${_updatedTime} UTC`;
};

const BASE_URL = 'https://coinmarketcap.com/currencies/';
const valueToHref = (id) => `${BASE_URL}${id}`;

const CmcAdapter = {
  crKey(option){
    const {one, two} = option;
    option.key = `${one}_${two}`
    return option.key;
  },

  toConfig(json, option){
    const _id = option.key //_id = _crId(option)
    , config = {
      id: _id,
      title: _crTitle(option, json),
      headers: HEADERS,
      tableFn: {
        numberFormat,
        valueToHref
      },
      //rows: _toRows(HEADERS, json),
      rows: crRows(HEADERS, json),
      zhCompType: 'TABLE',
      zhConfig: {
        id: _id, key: _id
      }
    };
    return { config };
  },

  toSeries(json, option){
    throw new Error('ZH_1000');
  }
};

export default CmcAdapter
