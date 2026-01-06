import { isArr } from '../../utils/isTypeFn';
import { crRouteDfObApi } from '../ApiFn';

const API_URL = 'https://api.crypto.com/exchange/v1/public';

const _getData = (json) => {
  const {
    data
  } = (json || {}).result || {}
  , _ob = (data || [])[0]
  , { asks, bids } = _ob || {};
  return isArr(asks) && isArr(bids)
    ? { asks, bids }
    : isArr(data)
    ? data
    : void 0;
}

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/get-candlestick?instrument_name=${pair}-PERP&timeframe=${timeframe}&count=${limit}`;

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/get-book?instrument_name=${pair}-PERP&depth=${limit}`;

const CrApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default CrApi
