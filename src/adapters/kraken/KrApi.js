import {
  isArr,
  isObj
} from '../AdapterFn';
import {
  crRouteDfObApi
} from '../ApiFn';

const API_URL = "https://api.kraken.com/0/public";
const _getData = (
  json
) => {
  const { result } = json || {}
  if (!isObj(result)) {
    return;
  }
  let _propName, _data;
  for (_propName in result){
    _data = result[_propName];
    if (isArr(_data)
     || isObj(_data) && isArr(_data.asks) && isArr(_data.bids)
    ) {
      return _data;
    }
  }
};

const _crDfUrl = (
  pair,
  timeframe
) => `${API_URL}/OHLC?pair=${pair}&interval=${timeframe}`;

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/Depth?pair=${pair}&count=${limit}`;

const KrApi = crRouteDfObApi(
  _crDfUrl,
  _crObUrl,
  _getData
);

export default KrApi
