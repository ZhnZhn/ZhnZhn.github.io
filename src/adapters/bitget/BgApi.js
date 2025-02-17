import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://api.bitget.com/api/v2/spot/market";

const _crPairLimitQueryToken = (
  pair,
  limit
) => `symbol=${pair}&limit=${limit}`;

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/candles?${_crPairLimitQueryToken(pair, limit)}&granularity=${timeframe}`;

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/orderbook?${_crPairLimitQueryToken(pair, limit)}&type=step0`;

const _getData = (json) => (json || {}).data;

const BgApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default BgApi
