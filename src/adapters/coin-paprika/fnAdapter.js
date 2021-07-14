import AdapterFn from '../AdapterFn'

const {
  crError,
  ymdToUTC,
  crVolumePoint,
  getValue,
  joinBy,
  toUpperCaseFirst,
  crItemLink
} = AdapterFn;

const DF_ID = 'btc-bitcoin';
const getCoinId = ({ items=[] }) =>
  getValue(items[0], { dfValue: DF_ID });

const COIN_URL = 'https://coinpaprika.com/coin'
, _crCoinUrl = option => `${COIN_URL}/${getCoinId(option)}/`
, _crInfo = option => ({
  name: option.title || '',
  description: crItemLink('Coinpaprika', _crCoinUrl(option))
});


const fnAdapter = {
  crError,
  getValue,
  joinBy,
  toUpperCaseFirst,

  getCoinId,

  crData: (arr) => {
    const data = []
    , dColumn = [], dVolume = []
    , dMarketCap = [];
    arr.forEach(item => {
      const {
        time_close, close,
        open, low, high, volume,
        market_cap
      } = item
      , _date = time_close
          ? ymdToUTC(time_close.split('T')[0])
          : void 0;
      if (_date) {
        data.push([ _date, close ])
        dVolume.push([ _date, volume ])
        dColumn.push(
          crVolumePoint({
             date: _date,
             open, close, volume,
             option: {
                _high: high,
                _low: low
              }
          })
        )
        dMarketCap.push([_date, market_cap])
      }
    })
    return {
      data,
      dVolume, dColumn,
      dMarketCap
    };
  },

  addConfOption: option => ({
    info: _crInfo(option)
  })
}

export default fnAdapter
