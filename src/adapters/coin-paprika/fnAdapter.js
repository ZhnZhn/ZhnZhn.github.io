export {
  getValue,
  joinBy,
  toUpperCaseFirst,
  crError
} from '../AdapterFn';

import {
  getValue,
  ymdToUTC
} from '../AdapterFn';
import {
  fCrItemLinkByCaption
} from '../crFn';

const DF_ID = 'btc-bitcoin'
, _crItemLink = fCrItemLinkByCaption('Coinpaprika')
, _getCoinId = ({
  items=[]
}) => getValue(items[0], { dfValue: DF_ID });

const COIN_URL = 'https://coinpaprika.com/coin'
, _crCoinUrl = option => `${COIN_URL}/${_getCoinId(option)}/`
, _crInfo = option => ({
  name: option.title || '',
  description: _crItemLink(_crCoinUrl(option))
});

export const getCoinId = _getCoinId

export const crData = (arr) => {
  const data = []
  , dVolume = []
  , dMarketCap = [];
  arr.forEach(item => {
    const {
      timestamp,
      price,
      volume_24h,
      market_cap
    } = item
    , _date = timestamp
        ? ymdToUTC(timestamp.split('T')[0])
        : 0;
    if (_date) {
      data.push([_date, price])
      dVolume.push([_date, volume_24h])
      dMarketCap.push([_date, market_cap])
    }
  })
  return {
    data,
    dVolume,
    dMarketCap
  };
}

export const addConfOption = option => ({
  info: _crInfo(option)
})
