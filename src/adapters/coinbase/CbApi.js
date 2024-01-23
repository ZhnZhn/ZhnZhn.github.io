import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://api.exchange.coinbase.com/products";

const _crDfUrl = (
  pair,
  timeframe
) => `${API_URL}/${pair}/candles?granularity=${timeframe}`;

const CbApi = crRouteDfObApi(_crDfUrl);

export default CbApi
