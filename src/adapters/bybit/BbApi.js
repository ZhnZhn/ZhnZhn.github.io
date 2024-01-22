import {
  isArr
} from '../AdapterFn';
import {
  fCrDfUrl,
  fCrObUrl,
  fRouteApi
} from '../ApiFn';

const API_URL = "https://api.bybit.com/v5/market";
const SYMBOL = "category=spot&symbol";

const _getData = (json) => {
  const { result } = json || {}
  , { list, a, b } = result || {};
  if (isArr(list)) {
    return list;
  }
  if (isArr(a) && isArr(b)) {
    return {
      asks: a,
      bids: b
    };
  }
};

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/kline?${SYMBOL}=${pair}&interval=${timeframe}&limit=${limit}`;


const _crObUrl = (
  pair,
  limit
) => `${API_URL}/orderbook?${SYMBOL}=${pair}&limit=${limit}`;


const _rCrUrl = {
  DF: fCrDfUrl(_crDfUrl),
  OB: fCrObUrl(_crObUrl)
};

const BbApi = fRouteApi(_rCrUrl, _getData);

export default BbApi
