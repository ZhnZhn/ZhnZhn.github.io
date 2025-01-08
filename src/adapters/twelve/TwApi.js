import {
  getValue,
  fCheckResponse
} from '../AdapterFn';

const URL = 'https://api.twelvedata.com'
, QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';

const TwApi = {
  getRequestUrl(option){
    const {
      apiKey,
      items
    } = option
    , symbol = getValue(items[0], {isUpper: true})
    , interval = getValue(items[1])
    , outputsize = getValue(items[2]);

    option.apiKey = null
    option.itemCaption = symbol

    return `${URL}/time_series?symbol=${symbol}&apikey=${apiKey}&interval=${interval}&outputsize=${outputsize}&${QUERY_TAIL}`;
  },

  checkResponse: fCheckResponse(
    json => (json || {}).values,
    json => (json || {}).message
  )
};

export default TwApi
