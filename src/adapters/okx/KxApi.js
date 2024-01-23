import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://www.okx.com/api/v5/market";

const getData = (json) => (json || {}).data;

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/mark-price-candles?instId=${pair}&bar=${timeframe}&limit=${limit}`;

const KxApi = crRouteDfObApi(
  _crDfUrl,
  void 0,
  getData
);

export default KxApi
