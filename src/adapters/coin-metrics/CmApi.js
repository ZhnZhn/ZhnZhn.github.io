import {
  getDaysFromYmd,
  crError
} from './fnAdapter';

const URL = 'https://community-api.coinmetrics.io/v4';
const _isArr = Array.isArray;

const CmApi = {
  getRequestUrl(option){
    const {
      items=[],
      fromDate
    } = option
    , { v:assets } = items[0]
    , { v:metric } = items[1]
    , [
        _start,
        _pageSize
    ] = fromDate
      ? [`&start_time=${fromDate}`, getDaysFromYmd(fromDate)]
      : ['', 360];

    option.metric = metric
    return `${URL}/timeseries/asset-metrics/?assets=${assets.toLowerCase()}&metrics=${metric}&frequency=1d&page_size=${_pageSize}${_start}`;
  },

  checkResponse(json){
    const { data } = json || {};
    if (!_isArr(data)) {
      throw crError("Server Response");
    }
    return true;
  }
};

export default CmApi
