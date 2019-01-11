
import AdapterFn from '../AdapterFn'

const { numberFormat } = AdapterFn;

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

const _getCellValue = (r, h) => {
  const { pn, isToN, isToFixed } = h;
  return isToN
    ? isToFixed
        ? parseFloat(parseFloat(r[pn]).toFixed(0))
        : parseFloat(r[pn])
    : r[pn];
}

const _toRows = ( headers=[], rows=[] ) => {
  const _rows = [...rows].map(r => {
    headers.forEach(h => {
      r[h.pn] = _getCellValue(r, h);
    })
    return r;
  })
  return _rows;
}

const _getUTCTime = (ms) =>{
  if (!Number.isInteger(ms)) {
    return '';
  }
  const _d = new Date(ms);
  return `${_d.getUTCHours()}:${_d.getUTCMinutes()}`;
};

const _crUpdatedTime = (json) => {
  const _seconds = json.map(coin => coin.last_updated)
  , _minMs = Math.max.apply(Math, _seconds)*1000
  , _maxMs = Math.min.apply(Math, _seconds)*1000
  , _fromTime = _getUTCTime(_minMs)
  , _toTime = _getUTCTime(_maxMs);
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
  toConfig(json, option){
    const { one, two } = option
        , _id = `${one}_${two}`
        , config = {
          id: _id,
          title: _crTitle(option, json),
          headers: HEADERS,
          tableFn: {
            numberFormat,
            valueToHref
          },
          rows: _toRows(HEADERS, json),
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
