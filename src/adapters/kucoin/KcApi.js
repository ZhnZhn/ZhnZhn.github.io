import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://api.kucoin.com/api/v1/market";
const _getData = (
  json
) => (json || {}).data;

const _crDfUrl = (
  pair,
  timeframe
) => `${API_URL}/candles?symbol=${pair}&type=${timeframe}`;

const _crObUrl = (
  pair
) => `${API_URL}/orderbook/level2_20?symbol=${pair}`;

const KcApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default KcApi
