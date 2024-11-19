import isEmpty from '../../utils/isEmpty';
import {
  crError,
  isNaN,
  roundBy,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';

const API_URL = 'https://www.alphavantage.co/query';

export const crFunctionQuery = value => `function=${value}`
const fGetRequestUrl = (
  getCrQuery
) => (
  option
) => {
  const {
    apiKey
  } = option
  , _crQuery = getCrQuery(option)
  , _queryParam = _crQuery(option);

  option.apiKey = void 0
  return `${API_URL}?${_queryParam}&apikey=${apiKey}`;
};

const ERR_PROP = 'Error Message'
, INFO_PROP = 'Information';

export const REQ_ERROR = 'Request Error'
const checkResponse = (
  json
) => {
  if (isEmpty(json)) {
    throw crError();
  }
  const _msg = json[ERR_PROP] || json[INFO_PROP];
  if (_msg) {
    throw crError(REQ_ERROR, _msg);
  }
};

export const fAvApi = (getCrQuery) => ({
  getRequestUrl: fGetRequestUrl(getCrQuery),
  checkResponse
})

export const fCrData = (
  paramNameY,
  paramNameX,
  yConfig
) => (data) => {
  const _crY = yConfig === '10'
    ? (v) => parseInt(v, 10)
    : yConfig === 'round'
       ? roundBy
       : parseFloat;
  return (data || [])
    .reduce((arr, item={}) => {
       const _y = _crY(item[paramNameY]);
       if (!isNaN(_y)) {
         arr.push([ymdToUTC(item[paramNameX]), _y])
       }
       return arr;
    }, [])
    .sort(compareByDate);
}
