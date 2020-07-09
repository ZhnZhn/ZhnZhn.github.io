import fnAdapter from './fnAdapter'

const {
  getValue,
  crError
} = fnAdapter

const C = {
  ROOT: 'https://api.beta.ons.gov.uk/',
  TRADE: 'v1/datasets/trade/editions/time-series/versions/21/observations',
  QUERY_TAIL: 'time=*&geography=K02000001',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
}

const _isArr = Array.isArray
const _crErr = crError.bind(null, C.ERR_CAPTION, C.MSG_EMPTY);

const OnsApi = {
  getRequestUrl(option){
    const { items } = option
    , v1 = getValue(items[0])
    , v2 = getValue(items[1])
    , v3 = getValue(items[2])
    return `${C.ROOT}${C.TRADE}?country=${v1}&commodity=${v2}&direction=${v3}&${C.QUERY_TAIL}`;
  },

  checkResponse(json){
    if (!(json && _isArr(json.observations))) {
      throw _crErr();
    }
    return true;
  }
}

export default OnsApi
