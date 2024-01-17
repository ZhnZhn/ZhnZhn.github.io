import {
  fCrDfUrl,
  fRouteApi
} from '../ApiFn';

const API_URL = "https://www.okx.com/api/v5/market";

const getData = (json) => (json || {}).data

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/mark-price-candles?instId=${pair}&bar=${timeframe}&limit=${limit}`;

const _rCrUrl = {
  DF: fCrDfUrl(_crDfUrl)
};

const KxApi = fRouteApi(_rCrUrl, getData);

export default KxApi
