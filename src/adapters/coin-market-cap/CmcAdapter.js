
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
  isR: true,
  isF: true
},{
  name: '7d %',
  pn: 'percent_change_7d',
  isToN: true,
  isR: true
}
];

const _toRows = ( headers=[], rows=[] ) => {
  const _rows = [...rows].map(r => {
    headers.forEach(h => {
      const { pn, isToN } = h
      r[pn] = isToN
        ? parseFloat(r[pn])
        : r[pn];
    })
    return r;
  })
  return _rows;
}

const _crTitle = ({ one, two }) => {
  const _two = parseFloat(two) - 1
      , _one = parseFloat(one) + 1;
  return `${_one} - ${_one + _two}: Values in USD`;
};

const BASE_URL = 'https://coinmarketcap.com/currencies/';
const valueToHref = (id) => `${BASE_URL}${id}`;

const CmcAdapter = {
  toConfig(json, option){
    const { one, two } = option
        , _id = `${one}_${two}`
        , config = {
          id: _id,
          title: _crTitle(option),
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
