import {
  getValues,
  fCheckResponse
} from '../AdapterFn';
import {
  crProviderApi
} from '../ApiFn';

const URL = 'https://api.twelvedata.com'
, QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';

const getRequestUrl = (option) => {
  const {
    apiKey
  } = option
  , [
    symbol,
    interval,
    outputsize
  ] = getValues(option);

  option.itemCaption = symbol

  return `${URL}/time_series?symbol=${symbol}&apikey=${apiKey}&interval=${interval}&outputsize=${outputsize}&${QUERY_TAIL}`;
}
, checkResponse = fCheckResponse(
  json => json?.values,
  json => json?.message
)
, TwApi = crProviderApi(
  getRequestUrl,
  checkResponse
);

export default TwApi
