import JSONstat from 'jsonstat';

import AdapterFn from '../AdapterFn'
import Box from '../../utils/Box'

const URL_ID_COUNTRY = './data/eurostat/id-country.json';

const _isArr = Array.isArray;

let hmIdCountry = {};
let isHmFetched = false;
const _fnFetchHmIdCountry = () => {
   return (!isHmFetched)
      ? fetch(URL_ID_COUNTRY)
          .then(res => res.json())
          .then(json => {
             hmIdCountry = json.hm;
             isHmFetched = true;
             return hmIdCountry;
          })
          .catch((err) => { return hmIdCountry; })
     : Promise.resolve(hmIdCountry);
}

const _fnIdToCountry = (id) => {
   const name = hmIdCountry[id];
   return name ? name : id;
}

const _combineToArr = (dGeo, sGeo, status={}) => {
  const arr = [];
  dGeo.forEach((id, index) => {
    if (sGeo[index] != null && sGeo[index].value != null){
      arr.push({ id,
         value: sGeo[index].value,
         status: status[index]
      });
    }
  })
  return arr;
}
const _splitForConfig = (arr) => {
   const categories = []
       , data = [];
   let max = Number.NEGATIVE_INFINITY
     , min = Number.POSITIVE_INFINITY;
   arr.forEach((item) => {
     const { id, value, status } = item
         , country = _fnIdToCountry(id);
     categories.push(country);
     data.push({ y: value, c: country, id: country, status })
     if (value>=max) { max = value; }
     if (value<=min) { min = value; }
    })
   return { categories, data, min, max };
}

/***********************/

const _combineToHm = (ids, sGeo) => {
  const hm = {};
  ids.forEach((id, index) => {
    if (sGeo[index] != null && sGeo[index].value != null){
      hm[_fnIdToCountry(id)] = sGeo[index].value;
    }
  })
  return hm;
}
const _trHmToData = (hm, categories) => {
  const data = []
  categories.forEach((id) => {
    if (hm[id] != null){
      data.push(hm[id]);
      //data.push({ y: hm[id], c: id });
    }
    else {
      //data.push({ y: 0, c: id });
      data.push(0);
    }
  })
  return data;
}

const _isEmptyGeoSlice = (_sGeo) => {
  if (!_isArr(_sGeo)) { return true; }
  return _sGeo
   .filter(({ value }) => Boolean(value))
   .length === 0
      ? true
      : false;
};

const JsonStatFn = {
  createGeoSlice : (json, configSlice={}, dfTime) => {
    const  ds = JSONstat(json).Dataset(0);

    // 1) Try create _sGeo with configSlice
    let time = configSlice.time
    , _sGeo = ds.Data(configSlice);

    // 2) Try create _sGeo with configSlice and dfTime from dialog
    if (dfTime && _isEmptyGeoSlice(_sGeo)) {
      _sGeo = ds.Data({ ...configSlice, ...{time: dfTime}})
      time = dfTime
    }

    // 3) Try create _sGeo with maxIndex time available in ds
    if (_isEmptyGeoSlice(_sGeo)){
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
  },

  crGeoSeria: (json, configSlice) => {
    const ds = JSONstat(json).Dataset(0) || {}
    , data = (ds.Data?.(configSlice) || [])
        .map(obj => obj.value)
        .filter(value => value !== null);
    return {
      date: ds.Dimension?.("time") || {},
      data
    };
  },

  trJsonToCategory : (json, configSlice) => {
    const { dGeo, sGeo } = JsonStatFn.createGeoSlice(json, configSlice);
    return _fnFetchHmIdCountry().then(() => {
       return Box( _combineToArr(dGeo.id, sGeo, json.status) )
         .map(arr => arr.sort(AdapterFn.compareByValueId))
         .fold(_splitForConfig);
       });
  },
  trJsonToSeria : (json, configSlice, categories) => {
    const { dGeo, sGeo } = JsonStatFn.createGeoSlice(json, configSlice);
    return Box(_combineToHm(dGeo.id, sGeo))
      .fold((hm) => _trHmToData(hm, categories));
  }
}

export default JsonStatFn
