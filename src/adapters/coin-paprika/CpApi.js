import fnAdapter from './fnAdapter'

const { getValue } = fnAdapter;

const C = {
  URL: 'https://api.coinpaprika.com/v1',
  DF_ID: 'btc-bitcoin',
  DF_SUBTITLE: 'Values on 23:59:59 UTC'
};

const _isArr = Array.isArray;

const _getCoinId = ({ items=[] }) => getValue(items[0], { dfValue: C.DF_ID })

const _crUrlDf = option => {
  const { fromDate } = option
  , _coinId = _getCoinId(option);
  option.subtitle = C.DF_SUBTITLE
  return `${C.URL}/coins/${_coinId}/ohlcv/historical?start=${fromDate}&limit=366`;
}

const _crUrlTw = option => {
  const _coinId = _getCoinId(option);
  return `${C.URL}/coins/${_coinId}/twitter`;
}

const _crUrlCi = option => {
  const _coinId = _getCoinId(option);
  return `${C.URL}/coins/${_coinId}`;
}

const _rApi = {
  DF: _crUrlDf,
  TW: _crUrlTw,
  CI: _crUrlCi
};

const CpApi = {
  getRequestUrl(option){
    const { dfSubId } = option
    , _crUrl = _rApi[dfSubId] || _rApi.DF;
    return (option._itemUrl = _crUrl(option));
  },
  checkResponse(json, option){
    const { dfSubId } = option;
    return _isArr(json)
      || (dfSubId === 'CI' && json);
  }
}

export default CpApi
