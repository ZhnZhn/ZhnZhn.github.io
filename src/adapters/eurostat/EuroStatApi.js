
import fnArr from '../../utils/fnArr';

const { isStrInArr } = fnArr;

const rootUrl = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"
    , queryTail = "&precision=1&sinceTimePeriod=1996M01";

const REQUEST_ERROR = 'Request Error'
    , MESSAGE_HEADER = '400 : Bad Request\n';


const _crDetailMsg = function(option){
  const {alertGeo='', alertMetric=''} = option
  return `\n\nIt seems country-dataset doesn't exsist.\n${alertGeo}:${alertMetric}\n\nIf you use For Date input field in Dialog\ntry to use more late date.`
}

const _categoryTypes = [ 'MAP', 'COLUMN', 'BAR' ];


const EuroStatApi = {

  getRequestUrl(option){
    const {
            group, metric, geo,
            mapValue, time,
            seriaType
          } = option;

    if (!isStrInArr(seriaType)(_categoryTypes)){
      let _param = `geo=${geo}`
        , _group;
      if (group){
        _group = `${group}?`;
        if (metric){
          _param = `${_param}&indic=${metric}`;
        }
      } else {
        _group = (metric.indexOf('?') === -1)
           ? `${metric}?`
           : metric ;
        _param = `&${_param}`;
      }

      return `${rootUrl}${_group}${_param}${queryTail}`;
  } else if (seriaType === 'COLUMN') {
    return `${rootUrl}${mapValue}&sinceTimePeriod=${time}`;
  } else if (seriaType === 'MAP') {
     return `${rootUrl}${mapValue}`;
  } else {
    //return `${rootUrl}ei_lmhr_m?precision=1&lastTimePeriod=1&s_adj=NSA&time=2016M08`;
    return `${rootUrl}${mapValue}&time=${time}`;
    //return `${rootUrl}${mapValue}&sinceTimePeriod=${time}`;
  }
  },

  checkResponse(json, option) {
    const { error } = json
    if (error){
       if (error.label) {
          throw {
            errCaption : REQUEST_ERROR,
            message : MESSAGE_HEADER + error.label + _crDetailMsg(option)
          };
       } else {
          throw { errCaption : REQUEST_ERROR, message : '' };
       }
    }
    return true;
  }

}

export default EuroStatApi
