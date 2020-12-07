
const C = {
 URL: "https://www.bitstamp.net/api/v2/ohlc"
};

const _isArr = Array.isArray;

const BtApi = {
  getRequestUrl(option){
    const { items=[] } = option
    , {v:pair} = items[0]
    , {v:timeframe} = items[1]
    , {v:limit} = items[2];
    return `${C.URL}/${pair}?step=${timeframe}&limit=${limit}`;
  },

  checkResponse(json, option){
    const { data } = json || {}
    , { ohlc, pair } = data || {}
    , { items=[] } = option
    , { c } = items[0];
    if ( c === pair && _isArr(ohlc)) {
      return true;
    }
    throw {
      errCaption: "Response Empty",
    };
  }
};

export default BtApi
