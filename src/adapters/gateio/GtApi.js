import { crRouteDfObApi } from '../ApiFn';

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

const GtApi = crRouteDfObApi(_crDfUrl, _crObUrl);

export default GtApi
