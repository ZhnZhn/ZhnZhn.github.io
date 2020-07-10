import fnAdapter from './fnAdapter'

const {
  getValue,
  crError
} = fnAdapter

const C = {
  ROOT: 'https://api.beta.ons.gov.uk/v1/datasets/',
  EDT: '/editions/time-series/versions/',
  OBS: '/observations?',
  QUERY_TAIL: 'time=*&geography=K02000001',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
}

const _isArr = Array.isArray
const _crErr = crError.bind(null, C.ERR_CAPTION, C.MSG_EMPTY);

const _crUrl = (item, vers) => C.ROOT+item+C.EDT+vers+C.OBS;

const _crTradeUrl = ({ items }) => {
  const v1 = getValue(items[0])
  , v2 = getValue(items[1])
  , v3 = getValue(items[2]);
  return `${_crUrl('trade', '21')}country=${v1}&commodity=${v2}&direction=${v3}&${C.QUERY_TAIL}`;
}

const _crCpiUrl = ({ items }) => {
  const v1 = getValue(items[0]);
  return `${_crUrl('cpih01', '34')}aggregate=${v1}&${C.QUERY_TAIL}`;
}

const _rCrUrl = {
  '21': _crTradeUrl,
  '34': _crCpiUrl
}

const OnsApi = {
  getRequestUrl(option){
    return _rCrUrl[option.dfV]?.(option);
  },

  checkResponse(json){
    if (!(json && _isArr(json.observations))) {
      throw _crErr();
    }
    return true;
  }
}

export default OnsApi
