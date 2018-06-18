
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

const _addParamTo = (q, p) => q ? q + '&' + p : p;

const _toQuery = (params, items) => {
  let _q = '', i = 0;
  for (;i<params.length; i++) {
    _q = _addParamTo(_q, `${params[i]}=${items[i].value}`)
  }
  return _q;
}

const _toMapSlice = (params, items, time ) => {
  const zhMapSlice = { time }
      , _max=params.length;
  let queryMap='', i;
  for (i=1 ;i<_max; i++){
    queryMap = _addParamTo(queryMap, `${params[i]}=${items[i].value}`)
    zhMapSlice[params[i]] = items[i].value
  }
  return {
    queryMap, zhMapSlice
  };

}

const _crUrlWithParams = (option) => {
  const {
          seriaType,
          dfParams, dfTable, dfTail,
          items,
          mapType,
          time
        } = option;

  if (!isStrInArr(seriaType)(_categoryTypes)){
    const _query = _toQuery(dfParams, items)
         , _tail = dfTail ? '&' + dfTail : '';
    return `${rootUrl}${dfTable}?${_query}${_tail}`;
  } else {
    const {
            queryMap, zhMapSlice
          } = _toMapSlice(dfParams, items, time);
    if (!mapType) {
      option.zhMapSlice = zhMapSlice
    }
    return `${rootUrl}${dfTable}?${queryMap}&time=${time}`;
  }
}

const EuroStatApi = {

  getRequestUrl(option){
    const {
            group, metric, geo,
            mapValue, time,
            seriaType,
            dfParams
          } = option;

    if (dfParams) {
      return _crUrlWithParams(option);
    }

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
      return `${rootUrl}${mapValue}&time=${time}`;
    }
  },

  checkResponse(json, option) {
    const { error } = json;
    if (error){
       if (error.label) {
          throw {
            errCaption: REQUEST_ERROR,
            message: MESSAGE_HEADER + error.label + _crDetailMsg(option)
          };
       } else {
          throw {
            errCaption: REQUEST_ERROR,
            message: ''
          };
       }
    }
    return true;
  }

}

export default EuroStatApi
