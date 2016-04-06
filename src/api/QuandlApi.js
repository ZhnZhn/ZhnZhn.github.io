
import ApiUtils from '../utils/ApiUtils';

const QuandlApi = {};

QuandlApi.rootUrl = "https://www.quandl.com/api/v3/datasets/";
QuandlApi.apiKey = "";


QuandlApi.getRequestUrl = function(option){
  const queryDate = (option.fromDate && option.toDate) ?
       `sort_order=asc&trim_start=${option.fromDate}&trim_end=${option.toDate}&` : '';

  const uri = `${QuandlApi.rootUrl}${option.value}.json?
           ${queryDate}
           ${QuandlApi.apiKey}`;

  return ApiUtils.createUri(uri);
}


export default QuandlApi;
