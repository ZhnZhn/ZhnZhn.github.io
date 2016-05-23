
import ApiUtils from '../utils/ApiUtils';

const QuandlApi = {};

QuandlApi.rootUrl = "https://www.quandl.com/api/v3/datasets/";
QuandlApi.BLANK = '';

QuandlApi.getRequestUrl = function(option){
  const queryDate = (option.fromDate && option.toDate) ?
       `sort_order=asc&trim_start=${option.fromDate}&trim_end=${option.toDate}` :
        QuandlApi.BLANK;

  let apiKey;
  if (option.apiKey){
    apiKey = (queryDate) ?
        `&api_key=${option.apiKey}` :
        `api_key=${option.apiKey}`;
  } else {
    apiKey = QuandlApi.BLANK;
  }

  const uri = `${QuandlApi.rootUrl}${option.value}.json?${queryDate}${apiKey}`;

  return ApiUtils.createUri(uri);
}

const CheckCaptions = {
  CLIENT : 'Request Error',
  SERVER : 'Response Error'
}
QuandlApi.checkResponse = function(response, json){
    const {status, statusText} = response;
    if (status>=200 && status<400){
      return true;
    } else if (status>=400 && status<500){
     if (json.quandl_error && json.quandl_error.message){
       throw {zhCaption : CheckCaptions.CLIENT, message : json.quandl_error.message }
     } else {
       throw {zhCaption : CheckCaptions.CLIENT, message : statusText }
     }
    } else if (status>=500 && status<600){
       throw {zhCaption : CheckCaptions.SERVER, message : statusText }
    } else {
      return false;
    }
}

export default QuandlApi;
