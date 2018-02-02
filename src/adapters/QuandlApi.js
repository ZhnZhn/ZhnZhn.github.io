
const C = {
  ROOT_URL: "https://www.quandl.com/api/v3/datasets/",

  REQUEST_ERROR: 'Request Error',
  DATASET_EMPTY: 'Dataset Empty'
}

const QuandlApi = {

  getRequestUrl(option) {
    const { value, fromDate, toDate, apiKey, transform } = option;

    let _queryDate = '';
    if ( fromDate || toDate ){
      _queryDate = 'sort_order=asc'
      if (fromDate) {
        _queryDate = _queryDate + `&trim_start=${fromDate}`
      }
      if (toDate){
        _queryDate = _queryDate + `&trim_end=${toDate}`
      }
    }

    if (transform) {
      _queryDate = _queryDate + `&transform=${transform}`
    }

    let _apiKey = '';
    if (apiKey){
      _apiKey = (_queryDate)
         ? `&api_key=${apiKey}`
         : `api_key=${apiKey}`;
    }

    return `${C.ROOT_URL}${value}.json?${_queryDate}${_apiKey}`;
  },

  checkResponse(json) {
    const { quandl_error, dataset={} } = json;
    if ( quandl_error ){
       if ( quandl_error.message ) {
          throw {
            errCaption : C.REQUEST_ERROR,
            message : json.quandl_error.message
          };
       } else {
          throw {
            errCaption : C.REQUEST_ERROR,
            message : ''
          };
       }
    } else if ( !dataset.data || dataset.data.length === 0 ){
        const {
                newest_available_date='',
                oldest_available_date=''
              } = dataset;
        throw {
           errCaption : C.DATASET_EMPTY,
           message : `Result dataset for request is empty:
                      Newest Date: ${newest_available_date}
                      Oldest Date: ${oldest_available_date}`
        };
    }
    return true;
  }
}

export default QuandlApi
