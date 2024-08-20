import {
  isObj,
  crError
} from '../AdapterFn';
import {
  ECB_EUROPA_EU,
  crItemId,
  getSeriesObservertions
} from './fnAdapter';

const API_URL = `https://data-api.${ECB_EUROPA_EU}/service/data`;

const EcbApi = {
  getRequestUrl(option){
    return `${option.proxy}${API_URL}/${option.dfR}/${crItemId(option)}?format=jsondata&detail=dataonly&startPeriod=${option.fromDate}`;
  },
  checkResponse(json){
    if (!isObj(getSeriesObservertions(json))) {
      throw crError();
    }
  }
};

export default EcbApi
