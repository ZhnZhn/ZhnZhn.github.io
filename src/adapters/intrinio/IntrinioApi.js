import {
  getToDate
} from '../../utils/dateFn';
import {
  isArr,
  getValue,
  crError
} from '../AdapterFn';

const API_URL = 'https://api.intrinio.com/historical_data'
, RES_ERR_STATUS = [ 401 ]
, TO_DATE = getToDate();

const _getErr = (
  json
) => json
  && isArr(json.errors)
  && json.errors[0];

const _crUrl = (
  identifier,
  fromDate
) => `${API_URL}?identifier=${identifier}&start_date=${fromDate}`;

const IntrinioApi = {
  crOptionFetch(option){
    const { apiKey } = option;
    return {
      headers: {
        'X-Authorization-Public-Key': apiKey
      }
    };
  },

  getRequestUrl(option){
    const {
      fromDate,
      items
    } = option;

    option.one = getValue(items[0])
    option.two = getValue(items[1])
    option.three = getValue(items[0]) || 'QTR'

    const {
      one,
      two,
      three,
    } = option;

    option.resErrStatus = RES_ERR_STATUS

    if (two) {
      return `${_crUrl(one, fromDate)}&item=${two}&end_date=${TO_DATE}&type=${three}`
    }
  },

  checkResponse(json){
    const _jsonErr = _getErr(json);
    if (_jsonErr) {
      throw crError(_jsonErr.human, _jsonErr.message);
    }
    if (!isArr(json.data)) {
      throw crError();
    }
  }
};

export default IntrinioApi
