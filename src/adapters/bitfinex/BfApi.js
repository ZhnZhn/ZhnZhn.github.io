import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://api-pub.bitfinex.com/v2";

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/candles/trade:${timeframe}:t${pair}/hist?limit=${limit}`;

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/book/t${pair}/P0?len=${limit}`;

const BfApi = crRouteDfObApi(_crDfUrl, _crObUrl);

export default BfApi
