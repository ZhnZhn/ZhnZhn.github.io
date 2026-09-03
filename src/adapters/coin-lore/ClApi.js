import { isArr } from '../../utils/isTypeFn'
import { crError } from '../AdapterFn';
import { crProviderApi } from '../ApiFn';

const API_URL = 'https://api.coinlore.net/api';

const getRequestUrl = (option) => {
  const { items } = option
  , { v:id } = items[0];
  return `${API_URL}/exchange/?id=${id}`;
}
, checkResponse = (json, _option) => {
  const { pairs } = json  || {};
  if (!isArr(pairs)) {
    throw crError()
  }
}
, ClApi = crProviderApi(
  getRequestUrl,
  checkResponse
);

export default ClApi
