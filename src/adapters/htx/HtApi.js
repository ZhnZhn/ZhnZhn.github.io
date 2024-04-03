import { isArr } from '../AdapterFn';
import { crRouteDfObApi } from '../ApiFn';

const API_URL = "https://api.huobi.pro";

const _getData = (
  json
) => json && isArr(json.data)
  ? json.data
  : void 0;

const _crDfUrl = (
  pair,
  timeframe,
  limit
) => `${API_URL}/market/history/kline?symbol=${pair}&period=${timeframe}&size=${limit}`;

const _crObUrl = () => {};

const HtApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default HtApi
