import apiFn from './apiFn'
import mapFn from './mapFn'

const { URL, QUERY_TAIL, isCategory } = apiFn;
const { createMapValue, createMapSlice } = mapFn;

const crUrl = (option) => {
  const {
    seriaType,
    metric, geo,
    itemMap,
    time
  } = option;

  if (!isCategory(seriaType)){
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

export default crUrl
