import {
  isArr,
  getValue
} from '../AdapterFn';
import { crError } from '../crFn';

const API_URL = 'https://api.beta.ons.gov.uk/v1/datasets/'
, EDT = '/editions/time-series/versions/'
, OBS = '/observations?'
, QUERY_TIME = '&time=*'
, QUERY_TAIL = '&time=*&geography=K02000001';

const _crUrl = (
  item,
  vers=1
) => API_URL + item + EDT + vers + OBS;

const _crTradeUrl = ({
  items
}) => {
  const v1 = getValue(items[0])
  , v2 = getValue(items[1])
  , v3 = getValue(items[2]);
  return `${_crUrl('trade')}countriesandterritories=${v1}&standardindustrialtradeclassification=${v2}&direction=${v3}${QUERY_TAIL}`;
}

const _crCpiUrl = ({
  items
}) => {
  const v1 = getValue(items[0]);
  return `${_crUrl('cpih01')}aggregate=${v1}${QUERY_TAIL}`;
}

const _crPhriUrl = ({
  items
}) => {
  const v1 = getValue(items[0])
  , v2 = getValue(items[1]);
  return `${_crUrl('index-private-housing-rental-prices')}geography=${v1}&indexandyearchange=${v2}${QUERY_TIME}`;
}

const _crGdpUrl = ({
  items
}) => {
  const v1 = getValue(items[0])
  , v2 = getValue(items[1])
  , v3 = getValue(items[2]);
  return `${_crUrl('regional-gdp-by-quarter')}geography=${v1}&unofficialstandardindustrialclassification=${v2}&growthrate=${v3}&prices=cvm${QUERY_TIME}`;
}

const _rCrUrl = {
  '21': _crTradeUrl,
  '34': _crCpiUrl,
  '20': _crPhriUrl,
  '5': _crGdpUrl
};

const OnsApi = {
  getRequestUrl(option){
    return _rCrUrl[option.dfV]?.(option);
  },

  checkResponse(json){
    if (!(json && isArr(json.observations))) {
      throw crError();
    }
    return true;
  }
};

export default OnsApi
