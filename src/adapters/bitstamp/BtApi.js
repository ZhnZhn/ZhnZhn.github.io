import { isArr } from '../../utils/isTypeFn';
import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://www.bitstamp.net/api/v2";

const _getData = (
  json,
  option
) => {
  const {
    data,
    bids,
    asks
  } = json || {}
  , { ohlc, pair } = data || {}
  , { items=[] } = option
  , { c } = items[0];
  return c === pair && isArr(ohlc)
    ? ohlc
    : isArr(bids) && isArr(asks)
    ? json
    : void 0;
};

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/ohlc/${pair}?step=${timeframe}&limit=${limit}`;

const _crObUrl = (
  pair
) => `${API_URL}/order_book/${pair}?order=0`;

const BtApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default BtApi
