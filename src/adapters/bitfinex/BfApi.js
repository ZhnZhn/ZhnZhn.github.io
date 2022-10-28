import {
  isArr,
  crError
} from '../AdapterFn';

const API_URL = "https://api-pub.bitfinex.com/v2";

const _crDfUrl = (
  option
) => {
  const { proxy, items=[] } = option
  , {v:pair} = items[0]
  , {v:timeframe} = items[1]
  , {v:limit} = items[2];
  option.timeframe = timeframe
  return `${proxy}${API_URL}/candles/trade:${timeframe}:t${pair}/hist?limit=${limit}`;
};

const _crObUrl = ({
  proxy,
  items=[]
}) => {
  const {v:pair} = items[0]
  , {v:len} = items[1];
  return `${proxy}${API_URL}/book/t${pair}/P0?len=${len}`;
};

const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};

const BfApi = {
  getRequestUrl(option){
    const { dfSubId } = option
    , _crUrl = dfSubId && _rCrUrl[dfSubId]
        || _rCrUrl.DF;
    return _crUrl(option);
  },

  checkResponse(json, option){
    if (!isArr(json)) {
      throw crError();
    }
    return true;
  }
};

export default BfApi
