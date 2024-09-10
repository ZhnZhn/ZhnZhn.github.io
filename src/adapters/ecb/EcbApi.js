import {
  isObj,
  crError
} from '../AdapterFn';
import {
  isCategory
} from '../CategoryFn';
import {
  ECB_EUROPA_EU,
  crItemId,
  getSeriesObservertions
} from './fnAdapter';

const API_URL = `https://data-api.${ECB_EUROPA_EU}/service/data`;

const EcbApi = {
  getRequestUrl(option){
    const _queryDate = isCategory(option.seriaType)
      ? `startPeriod=${option.time}&endPeriod=${option.time}`
      : `startPeriod=${option.fromDate}`;
    return `${option.proxy}${API_URL}/${option.dfR}/${crItemId(option)}?format=jsondata&detail=dataonly&${_queryDate}`;
  },
  checkResponse(json){
    if (!isObj(getSeriesObservertions(json))) {
      throw crError();
    }
  }
};

export default EcbApi
