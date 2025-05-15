import {
  getValues,
  fCheckResponse
} from '../AdapterFn';

const URL = 'https://api.twelvedata.com'
, QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';

const TwApi = {
  getRequestUrl(option){
    const {
      apiKey
    } = option
    , [
      symbol,
      interval,
      outputsize
    ] = getValues(option);

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
