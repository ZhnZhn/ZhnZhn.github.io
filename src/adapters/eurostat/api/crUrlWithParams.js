import apiFn from './apiFn'
import mapFn from './mapFn'

const { URL, DF_TAIL, isCategory } = apiFn;
const { toQuery, toMapSlice } = mapFn;

const crUrlWithParams = (option) => {  
  const {
    seriaType, dfTable, time
  } = option;

  if (!isCategory(seriaType)){
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

export default crUrlWithParams
