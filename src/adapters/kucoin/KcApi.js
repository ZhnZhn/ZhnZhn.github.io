import {
  fCrDfUrl,
  fCrObUrl,
  fRouteApi
} from '../ApiFn';

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

const _rCrUrl = {
  DF: fCrDfUrl(_crDfUrl),
  OB: fCrObUrl(_crObUrl)
};

const KcApi = fRouteApi(_rCrUrl, _getData);

export default KcApi
