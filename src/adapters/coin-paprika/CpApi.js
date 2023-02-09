import {
  crError,
  getCoinId
} from './fnAdapter';

const URL = 'https://api.coinpaprika.com/v1';

const _isArr = Array.isArray;

const _crUrlDf = option => {
  const { fromDate } = option
  , _coinId = getCoinId(option);
  return `${URL}/tickers/${_coinId}/historical?start=${fromDate}&interval=1d`;
};

const _crUrlTw = option => {
  const _coinId = getCoinId(option);
  return `${URL}/coins/${_coinId}/twitter`;
};

const _crUrlCi = option => {
  const _coinId = getCoinId(option);
  return `${URL}/coins/${_coinId}`;
};

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
    if (_isArr(json) || (dfSubId === 'CI' && json)) {
      return true;
    }
    throw crError();
  }
}

export default CpApi
