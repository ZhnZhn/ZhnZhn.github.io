import {
  isArr,
  crError
} from '../AdapterFn';

const API_URL = "https://api.eia.gov/v2"
, QUERY_PARAMS = "sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000"
, DF_FREQ= 'monthly';

const _crFacets = (
  items
) => items
 .map((
    { v, id }
 ) => `facets[${id}][]=${v}`)
 .join('&');

const EiaApi = {
  getRequestUrl(option){
    const {
      dfRoute,
      dfSet,
      dfData,
      dfFreq=DF_FREQ,
      items,
      apiKey
    } = option;

    return `${API_URL}/${dfRoute}/${dfSet}/data?frequency=${dfFreq}&data[0]=${dfData}&api_key=${apiKey}&${_crFacets(items)}&${QUERY_PARAMS}`;
  },

  checkResponse(json){
    const { response } = json || {}
    , { data } = response || {};
    if (!isArr(data)) {
      throw crError();
    }
    return true;
  }
};

export default EiaApi
