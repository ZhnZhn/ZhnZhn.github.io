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
  const {
    list,
    a,
    b
  } = (json || {}).result || {};
  return isArr(list)
    ? list
    : isArr(a) && isArr(b)
    ? {asks: a, bids: b}
    : void 0;
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
