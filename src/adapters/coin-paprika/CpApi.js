import fnAdapter from './fnAdapter'

const { getValue } = fnAdapter

const C = {
  URL: 'https://api.coinpaprika.com/v1',
  DF_ID: 'btc-bitcoin'
}

const _isArr = Array.isArray;

const CpApi = {
  getRequestUrl(option){
    const { items=[], fromDate } = option
    , value = getValue(items[0], { dfValue: C.DF_ID });
    return option._itemUrl = `${C.URL}/coins/${value}/ohlcv/historical?start=${fromDate}&limit=366`;
  },
  checkResponse(json, option){
    return _isArr(json);
  }
}

export default CpApi
