import { getValue } from '../AdapterFn';
import {
  crAllOriginsUrl,
  fCrObUrl,
  fRouteApi
} from '../ApiFn';

const API_URL = "https://api-pub.bitfinex.com/v2";

const _crDfUrl = (
  option
) => {
  const {
    proxy,
    items=[]
  } = option
  , pair = getValue(items[0])
  , timeframe = getValue(items[1])
  , limit = getValue(items[2]);
  option.timeframe = timeframe
  return crAllOriginsUrl(proxy, `${API_URL}/candles/trade:${timeframe}:t${pair}/hist?limit=${limit}`)
};

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/book/t${pair}/P0?len=${limit}`;

const _rCrUrl = {
  DF: _crDfUrl,
  OB: fCrObUrl(_crObUrl)
};

const BfApi = fRouteApi(_rCrUrl);

export default BfApi
