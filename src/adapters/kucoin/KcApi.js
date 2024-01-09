import {
  getValue,
  crAllOriginsUrl,
  fGetRequestUrl,
  fCheckResponse
} from '../AdapterFn';

const API_URL = "https://api.kucoin.com/api/v1/market";
const _getData = (
  json
) => (json || {}).data;

const _crDfUrl = (option) => {
  const {
    proxy,
    items=[]
  } = option
  , pair = getValue(items[0])
  , timeframe = getValue(items[1]);
  option.timeframe = timeframe
  return crAllOriginsUrl(proxy, `${API_URL}/candles?symbol=${pair}&type=${timeframe}`)
};

const _crObUrl = ({
  proxy,
  items=[]
}) => crAllOriginsUrl(proxy, `${API_URL}/orderbook/level2_20?symbol=${getValue(items[0])}`);

const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};

const KcApi = {
  getRequestUrl: fGetRequestUrl(_rCrUrl),
  checkResponse: fCheckResponse(_getData)
};

export default KcApi
