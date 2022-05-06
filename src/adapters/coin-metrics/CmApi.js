import { crError } from './fnAdapter';

const URL = 'https://community-api.coinmetrics.io/v2';
const _isArr = Array.isArray;

const CmApi = {
  getRequestUrl(option){
    const { items=[], fromDate } = option
    , { v:assets } = items[0]
    , { v:metric } = items[1]
    , _start = fromDate ? `&start=${fromDate}` : '';
    return `${URL}/assets/${assets.toLowerCase()}/metricdata?metrics=${metric}${_start}`
  },

  checkResponse(json){
    const { metricData } = json || {}
    , { series } = metricData || {};
    if (!_isArr(series)) {
      throw crError();
    }
    return true;
  }
};

export default CmApi
