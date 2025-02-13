import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://api.bitget.com/api/v2/spot/market";

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/history-candles?symbol=${pair}&granularity=${timeframe}&endTime=${Date.now()}&limit=${limit}`;

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/orderbook?symbol=${pair}&type=step0&limit=${limit}`;

const _getData = (json) => (json || {}).data;

const BgApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default BgApi
