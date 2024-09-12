import {
  getValue,
  crError
} from './fnAdapter';

const URL = 'https://api.twelvedata.com'
, QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';

const _isArr = Array.isArray;

const TwApi = {
  getRequestUrl(option){
    const { apiKey, items } = option
    , symbol = getValue(items[0], {isUpper: true})
    , interval = getValue(items[1])
    , outputsize = getValue(items[2]);
    option.itemCaption = symbol
    return `${URL}/time_series?symbol=${symbol}&apikey=${apiKey}&interval=${interval}&outputsize=${outputsize}&${QUERY_TAIL}`;
  },
  checkResponse(json, option){
    const { values, message } = json || {};
    if (!_isArr(values)) {
      throw crError('', message);
    }
  }
};

export default TwApi
