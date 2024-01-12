import { getValue } from '../AdapterFn';
import {
  crAllOriginsUrl,
  fCrObUrl,
  fRouteApi
} from '../ApiFn';

const API_URL = "https://api.gateio.ws/api/v4/spot";

const _crDfUrl = (option) => {
  const {
    proxy,
    items=[]
  } = option
  , pair = getValue(items[0])
  , timeframe = getValue(items[1])
  , limit = getValue(items[2]);
  option.timeframe = timeframe
  return crAllOriginsUrl(proxy, `${API_URL}/candlesticks?currency_pair=${pair}&interval=${timeframe}&limit=${limit}`)
};


const _crObUrl = (
  pair,
  limit
) => `${API_URL}/order_book?currency_pair=${pair}&limit=${limit}`;

const _rCrUrl = {
  DF: _crDfUrl,
  OB: fCrObUrl(_crObUrl)
};

const GtApi = fRouteApi(_rCrUrl);

export default GtApi
