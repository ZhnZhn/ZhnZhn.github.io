import { crError } from '../crFn';

const C = {
 URL: "https://www.bitstamp.net/api/v2"
};

const _isArr = Array.isArray;

const _crDfUrl = option => {
  const { items=[] } = option
  , {v:pair} = items[0]
  , {v:timeframe} = items[1]
  , {v:limit} = items[2];
  option.timeframe = timeframe
  return `${C.URL}/ohlc/${pair}?step=${timeframe}&limit=${limit}`;
};

const _crObUrl = option => {
  const { items=[] } = option
  , {v:pair} = items[0];
  return `${C.URL}/order_book/${pair}?order=0`;
};

const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};

const BtApi = {
  getRequestUrl(option){
    const { dfSubId } = option
    , _crUrl = dfSubId && _rCrUrl[dfSubId]
        || _rCrUrl.DF
    return _crUrl(option);
  },

  checkResponse(json, option){
    const { data, bids, asks } = json || {}
    , { ohlc, pair } = data || {}
    , { items=[] } = option
    , { c } = items[0];
    if ( (c === pair && _isArr(ohlc))
      || (_isArr(bids) && _isArr(asks)) ) {
      return true;
    }
    throw crError();
  }
};

export default BtApi
