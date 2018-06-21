
import fnArr from '../../utils/fnArr';

import mapFn from './mapFn'

const { isInArrStr } = fnArr;
const {
        toQuery, toMapSlice,
        createMapValue, createMapSlice
      } = mapFn;

const URL = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"
    , QUERY_TAIL = "&precision=1&sinceTimePeriod=1996M01"
    , DF_TAIL = "precision=1";

const REQUEST_ERROR = 'Request Error'
    , MESSAGE_HEADER = '400: Bad Request\n';

const _crDetailMsg = function(label, option){
  const { alertGeo='', alertMetric='' } = option;
  return MESSAGE_HEADER + label + `\n\nIt seems country-dataset doesn't exsist.\n${alertGeo}:${alertMetric}\n\nIf you use For Date input field in Dialog\ntry to use more late date.`;
};

const _crErr = (errCaption, message) => ({
  errCaption, message
});

const CATEGORY_TYPES = [ 'MAP', 'COLUMN', 'BAR' ];
const _isCategory = isInArrStr(CATEGORY_TYPES);

const _crUrlWithParams = (option) => {
  const {
          seriaType, dfTable, time
        } = option;

  if (!_isCategory(seriaType)){
    const _q = toQuery(option);
    return `${URL}${dfTable}?${_q}&${DF_TAIL}`;
  }

  const {
          query, zhMapSlice
        } = toMapSlice(DF_TAIL, option)
     , _url = `${URL}${dfTable}?${query}`;
   if (seriaType === 'MAP') {
       option.zhMapSlice = zhMapSlice
     return _url;
   } else {
     return `${_url}&time=${time}`;
   }
};

const _crUrl = (option) => {
  const {
          seriaType,
          metric, geo,
          itemMap,
          time
        } = option;

  if (!_isCategory(seriaType)){
    const _geo = `geo=${geo}`
        , _metric = (metric.indexOf('?') === -1)
            ? `${metric}?`
            : metric;

      return `${URL}${_metric}&${_geo}${QUERY_TAIL}`;
  }

  const { mapValue, mapSlice } = itemMap
      , _mapValue = mapValue || createMapValue(option, itemMap);

  if (seriaType === 'MAP') {
    option.zhMapSlice = mapSlice
      ? { ...mapSlice, time }
      : { ...createMapSlice(option, itemMap), time };
    return `${URL}${_mapValue}`;
  } else {
    return `${URL}${_mapValue}&time=${time}`;
  }
};

const EuroStatApi = {

  getRequestUrl(option){
    const { dfParams } = option;
    return dfParams
      ? _crUrlWithParams(option)
      : _crUrl(option);
  },

  checkResponse(json, option) {
    const { error } = json;
    if (error){
      const { label } = error;
      if (label) {
        throw _crErr( REQUEST_ERROR, _crDetailMsg(label, option));
      } else {
        throw _crErr( REQUEST_ERROR, '');
      }
    }
    return true;
  }

};

export default EuroStatApi
