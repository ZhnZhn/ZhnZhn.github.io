import {
  fCrDfUrl,
  fCrObUrl,
  fRouteApi
} from '../ApiFn';

const API_URL = "https://api.gateio.ws/api/v4/spot";

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/candlesticks?currency_pair=${pair}&interval=${timeframe}&limit=${limit}`;

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/order_book?currency_pair=${pair}&limit=${limit}`;

const _rCrUrl = {
  DF: fCrDfUrl(_crDfUrl),
  OB: fCrObUrl(_crObUrl)
};

const GtApi = fRouteApi(_rCrUrl);

export default GtApi
