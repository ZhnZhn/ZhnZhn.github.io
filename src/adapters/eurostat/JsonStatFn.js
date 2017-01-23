import JSONstat from 'jsonstat';
import sortBy from 'lodash.sortby';

import { Box, getFromNullable } from '../../utils/fnStyle'

const hmIdCountry = {
  "AT":"Austria","BE":"Belgium","BG":"Bulgaria",
  "CH":"Switzerland","CY":"Cyprus","CZ":"Czech Republic",
  "DE":"Germany","DK":"Denmark",
  "EA":"EA","EA18":"EA18","EA19":"EA19",
  "EE":"Estonia","EL":"Greece","ES":"Spain",
  "EU":"EU","EU28":"EU28",
  "FI":"Finland","FR":"France","HR":"Croatia","HU":"Hungary",
  "IE":"Ireland","IS":"Iceland","IT":"Italy","JP":"Japan",
  "LT":"Lithuania","LU":"Luxembourg","LV":"Latvia",
  "MT":"Malta","ME":"Montenegro", "MK":"Macedonia",
  "NL":"Netherlands","NO":"Norway","PL":"Poland","PT":"Portugal",
  "RO":"Romania","RS":"Serbia","SE":"Sweden","SI":"Slovenia","SK":"Slovakia",
  "TR":"Turkey","UK":"United Kingdom","US":"United States"
}

const _fnIdToCountry = (id) => {
   const name = hmIdCountry[id];
   return (name) ? name : id;
}

const _combineToArr = (dGeo, sGeo) => {
  const arr = [];
  dGeo.forEach((id, index) => {
    if (sGeo[index] != null && sGeo[index].value != null){
      arr.push({ id, value : sGeo[index].value });
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
     const { id, value } = item
     categories.push(_fnIdToCountry(id));
     data.push(value);
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
    }
    else {
      data.push(0);
    }
  })
  return data;
}

const JsonStatFn = {
  createGeoSlice : (json, configSlice) => {
    const  ds = JSONstat(json).Dataset(0)
    return {
      dGeo : getFromNullable(ds.Dimension("geo"), { id : []}),
      sGeo : getFromNullable(ds.Data(configSlice), [])
    };
  },

  trJsonToCategory : (json, configSlice) => {
    const { dGeo, sGeo } = JsonStatFn.createGeoSlice(json, configSlice);
    return Box( _combineToArr(dGeo.id, sGeo) )
             .map( (arr) => sortBy(arr, ['value', 'id']))
             .fold(_splitForConfig);
  },
  trJsonToSeria : (json, configSlice, categories) => {
    const { dGeo, sGeo } = JsonStatFn.createGeoSlice(json, configSlice);
    return Box(_combineToHm(dGeo.id, sGeo))
             .fold((hm) => _trHmToData(hm, categories));
  }
}

export default JsonStatFn
