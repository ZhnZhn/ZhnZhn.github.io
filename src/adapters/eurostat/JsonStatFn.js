import JSONstat from 'jsonstat';

import { compareByValueId } from '../compareByFn';
import Box from '../../utils/Box';
import {
  fetchHmIdCountry,
  getCountryById
} from './fetchHmIdCountry';

const _isArr = Array.isArray;

const _combineToArr = (
  dGeo,
  sGeo,
  status={}
) => dGeo
  .reduce((arr, id, index) => {
    if (sGeo[index] != null && sGeo[index].value != null){
      arr.push({
         id,
         value: sGeo[index].value,
         status: status[index]
      });
    }
    return arr;
  }, []);

const _splitForConfig = (arr) => {
   const categories = []
   , data = [];
   let max = Number.NEGATIVE_INFINITY
   , min = Number.POSITIVE_INFINITY;
   arr.forEach((item) => {
     const { id, value, status } = item
     , country = getCountryById(id);
     categories.push(country);
     data.push({
       y: value,
       c: country,
       id: country,
       status
     })
     if (value>=max) { max = value; }
     if (value<=min) { min = value; }
    })
   return {
     categories,
     data,
     min,
     max
   };
}

/***********************/

const _combineToHm = (
  ids,
  sGeo
) => {
  const hm = {};
  ids.forEach((id, index) => {
    const { value } = sGeo[index] || {};
    if (value != null){
      hm[getCountryById(id)] = value;
    }
  })
  return hm;
};

const _trHmToData = (
  hm,
  categories
) => categories
  .map(id => ({
    y: hm[id] || null,
    c: id
  }));

const _isGeoSliceEmpty = (
  sGeo
) => _isArr(sGeo)
  ? sGeo
     .filter(({ value }) => Boolean(value))
     .length === 0
  : true;

export const createGeoSlice = (
  json,
  configSlice={},
  dfTime
) => {
  const  ds = JSONstat(json).Dataset(0);

  // 1) Try create _sGeo with configSlice
  let time = configSlice.time
  , _sGeo = ds.Data(configSlice);

  // 2) Try create _sGeo with configSlice and dfTime from dialog
  if (dfTime && _isGeoSliceEmpty(_sGeo)) {
    _sGeo = ds.Data({ ...configSlice, ...{time: dfTime}})
    time = dfTime
  }

  // 3) Try create _sGeo with maxIndex time available in ds
  if (_isGeoSliceEmpty(_sGeo)){
    const maxIndex = (ds.Dimension("time").id || []).length;
    if (maxIndex>0) {
      time = ds.Dimension("time").id[maxIndex-1];
      _sGeo = ds.Data({...configSlice, ...{ time } })
    }
  }

  return {
    dGeo: ds.Dimension("geo") || { id: [] },
    sGeo: _sGeo || [],
    time
  };
}

export const crGeoSeria = (
  json,
  configSlice
) => {
   const ds = JSONstat(json).Dataset(0) || {}
   , data = (ds.Data?.(configSlice) || [])
       .map(obj => obj.value)
       .filter(value => value !== null);
   return {
     date: ds.Dimension?.("time") || {},
     data
   };
}

export const trJsonToCategory = (
  json,
  configSlice
) => {
  const {
    dGeo,
    sGeo
  } = createGeoSlice(json, configSlice);
  return fetchHmIdCountry().then(() => {
     return Box(_combineToArr(dGeo.id, sGeo, json.status))
       .map(arr => arr.sort(compareByValueId))
       .fold(_splitForConfig);
     });
}

export const trJsonToSeria = (
  json,
  configSlice,
  categories
) => {
    const {
      dGeo,
      sGeo
    } = createGeoSlice(json, configSlice);
    return Box(_combineToHm(dGeo.id, sGeo))
      .fold(hm => _trHmToData(hm, categories));
}
