
const rootUrl = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"
    , queryTail = "&precision=1&sinceTimePeriod=1996M01";

const REQUEST_ERROR = 'Request Error'
    , MESSAGE_HEADER = '400 : Bad Request\n';

const EuroStatApi = {

  getRequestUrl(option){
    const { group, metric, geo } = option;

    let   _param = `geo=${geo}`
    if (metric){
      _param = `${_param}&indic=${metric}`
    }
    
    return `${rootUrl}${group}?${_param}${queryTail}`;
  },

  checkResponse(json) {
    const { error } = json
    if ( error ){
       if ( error.label ) {
          throw { errCaption : REQUEST_ERROR, message : MESSAGE_HEADER + error.label }
       } else {
          throw { errCaption : REQUEST_ERROR, message : '' }
       }
    }
    return true
  }

}

export default EuroStatApi
