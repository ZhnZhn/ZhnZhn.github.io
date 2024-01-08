import {
  crAllOriginsUrl,
  fCheckResponse
} from '../AdapterFn';

const API_URL = "https://api.kucoin.com/api/v1/market/candles";
const _getData = (
  json
) => (json || {}).data;

const KcApi = {
  getRequestUrl(option){
    const { proxy, items=[] } = option
    , {v:pair} = items[0]
    , {v:timeframe} = items[1];
    option.timeframe = timeframe
    return crAllOriginsUrl(proxy, `${API_URL}?symbol=${pair}&type=${timeframe}`)
  },

  checkResponse: fCheckResponse(_getData)
};

export default KcApi
