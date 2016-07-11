
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
    apiKey = (queryDate)
       ? `&api_key=${option.apiKey}`
       : `api_key=${option.apiKey}`;
  } else {
    apiKey = QuandlApi.BLANK;
  }

  const uri = `${QuandlApi.rootUrl}${option.value}.json?${queryDate}${apiKey}`;

  return ApiUtils.createUri(uri);
}

const REQUEST_ERROR = 'Request Error'
    , DATASET_EMPTY = 'Dataset Empty';
QuandlApi.checkResponse = function(json){
  const { quandl_error, dataset={} } = json;
  if ( quandl_error ){
     if ( quandl_error.message ) {
        throw { errCaption : REQUEST_ERROR, message : json.quandl_error.message }
     } else {
        throw { errCaption : REQUEST_ERROR, message : '' }
     }
  } else if ( !dataset.data || dataset.data.length === 0 ){
      const { newest_available_date='', oldest_available_date='' } = dataset;
      throw {
         errCaption : DATASET_EMPTY,
         message : `Result dataset for request is empty:
                    Newest Date: ${newest_available_date}
                    Oldest Date: ${oldest_available_date}`
      }

  }
  return true;
}


export default QuandlApi;
