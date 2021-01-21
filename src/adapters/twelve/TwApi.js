
import fnAdapter from './fnAdapter'

const {
  getValue,
  crError
} = fnAdapter;

const C = {
  URL: 'https://api.twelvedata.com',
  QUERY_TAIL: 'dp=2&order=ASC&timezone=UTC',
  ERR_EMPTY: 'Response is empty'
};

const _isArr = Array.isArray;

const TwApi = {
  getRequestUrl(option){
    const { apiKey, items } = option
    , symbol = getValue(items[0], {isUpper: true})
    , interval = getValue(items[1])
    , outputsize = getValue(items[2]);

    return `${C.URL}/time_series?symbol=${symbol}&apikey=${apiKey}&interval=${interval}&outputsize=${outputsize}&${C.QUERY_TAIL}`;
  },
  checkResponse(json, option){
    const { values } = json || {};
    if (_isArr(values)) {
      return true;
    }
    throw crError('', json.message || C.ERR_EMPTY);
  }
};

export default TwApi
