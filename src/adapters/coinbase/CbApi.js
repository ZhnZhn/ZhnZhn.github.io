import {
  fCrDfUrl,
  fRouteApi
} from '../ApiFn';

const API_URL = "https://api.exchange.coinbase.com/products";

const _crDfUrl = (
  pair,
  timeframe
) => `${API_URL}/${pair}/candles`;

const _rCrUrl = {
  DF: fCrDfUrl(_crDfUrl)
};

const CbApi = fRouteApi(_rCrUrl);

export default CbApi
