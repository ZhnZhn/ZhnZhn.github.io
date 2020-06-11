import fnAdapter from './fnAdapter'

const { getValue } = fnAdapter

const C = {
  URL: 'https://api.coinpaprika.com/v1',
  DF_ID: 'btc-bitcoin'
}

const _isArr = Array.isArray;

const _crUrlDf = option => {
  const { items=[], fromDate } = option
  , value = getValue(items[0], { dfValue: C.DF_ID });
  return `${C.URL}/coins/${value}/ohlcv/historical?start=${fromDate}&limit=366`;
}

const _crUrlTw = option => {
  const { items=[] } = option
  , value = getValue(items[0], { dfValue: C.DF_ID });
  return `${C.URL}/coins/${value}/twitter`;
}

const _rApi = {
  DF: _crUrlDf,
  TW: _crUrlTw
}

const CpApi = {
  getRequestUrl(option){
    const { dfRoute } = option
    , _crUrl = _rApi[dfRoute] || _rApi.DF;
    return (option._itemUrl = _crUrl(option));
  },
  checkResponse(json, option){
    return _isArr(json);
  }
}

export default CpApi
