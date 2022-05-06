export {
  getValue,
  joinBy,
  toUpperCaseFirst
} from '../AdapterFn';
export {
  crError
} from '../crFn';

import {
  getValue,
  ymdToUTC
} from '../AdapterFn';
import {
  crItemLink
} from '../crFn';
import { crVolumePoint } from '../pointFn';

const DF_ID = 'btc-bitcoin';
const _getCoinId = ({ items=[] }) =>
  getValue(items[0], { dfValue: DF_ID });

const COIN_URL = 'https://coinpaprika.com/coin'
, _crCoinUrl = option => `${COIN_URL}/${_getCoinId(option)}/`
, _crInfo = option => ({
  name: option.title || '',
  description: crItemLink('Coinpaprika', _crCoinUrl(option))
});

export const getCoinId = _getCoinId

export const crData = (arr) => {
  const data = []
  , dColumn = []
  , dVolume = []
  , dMarketCap = [];
  arr.forEach(item => {
    const {
      time_close,
      close,
      open,
      low,
      high,
      volume,
      market_cap
    } = item
    , _date = time_close
        ? ymdToUTC(time_close.split('T')[0])
        : void 0;
    if (_date) {
      data.push([_date, close])
      dVolume.push([_date, volume])
      dColumn.push(
        crVolumePoint({
           date: _date,
           open,
           close,
           volume,
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
    dVolume,
    dColumn,
    dMarketCap
  };
}

export const addConfOption = option => ({
  info: _crInfo(option)
})
