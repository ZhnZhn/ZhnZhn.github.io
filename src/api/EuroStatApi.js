
const rootUrl = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"
    , queryTail = "&precision=1&sinceTimePeriod=1996M01";

const REQUEST_ERROR = 'Request Error'
    , MESSAGE_HEADER = '400 : Bad Request\n';

const _crDetailMsg = function(option){
  const {alertGeo='', alertMetric=''} = option
  return `\n\nIt seems country-dataset doesn't exsist.\n${alertGeo}:${alertMetric}`
}

const EuroStatApi = {

  getRequestUrl(option){

    const { group, metric, geo, zhCompType, mapValue, time } = option;

    if (!zhCompType){
    let _param = `geo=${geo}`
      , _group;

    if (group){
      _group = `${group}?`;
      if (metric){
        _param = `${_param}&indic=${metric}`;
      }
    } else {
      _group = ( metric.indexOf('?') === -1) ? `${metric}?` : metric ;
      _param = `&${_param}`;
    }


    return `${rootUrl}${_group}${_param}${queryTail}`;
  } else {
    //return `${rootUrl}ei_lmhr_m?precision=1&lastTimePeriod=1&s_adj=NSA&time=2016M08`;
    return `${rootUrl}${mapValue}&time=${time}`;
  }
  },

  checkResponse(json, option) {
    const { error } = json
    if ( error ){
       if ( error.label ) {
          throw {
              errCaption : REQUEST_ERROR,
              message : MESSAGE_HEADER + error.label + _crDetailMsg(option)
          }
       } else {
          throw { errCaption : REQUEST_ERROR, message : '' }
       }
    }
    return true
  }

}

export default EuroStatApi
