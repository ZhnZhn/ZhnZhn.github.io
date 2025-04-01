import { filterBoolean } from '../../../utils/arrFn';
import { getObjectKeys } from '../../../utils/isTypeFn';

import {
  TIME_ID,
  GEO_ID,
  ADJ,
  ADJ_ID,
  GEO_ENTITY
} from './EsConfig';
import { toUpperCaseFirst } from './dimConfigFn';

const _crC = label => (label || '')
  .split('_')
  .map(toUpperCaseFirst)
  .join(' ');

const _crEsOptions = (category, id) => {
  const { label } = category || {};
  return getObjectKeys(label).map(k => ({
    caption: label[k],
    value: k,
    id
  }));
};

const _crOptionsWithSc = dim => dim
 .options.map(item => {
   item.sc = item.value
   item.caption = `${item.caption} (${item.value})`
   return item;
});

const _getMapFrequency = dims => {
  for(let i=0; i<dims.length; i++){
    const _item = dims[i] || {};
    if (_item.v === "freq") {
      return ((_item.options || [])[0] || {}).value;
    }
  }
};

const crDimConfigEs = dimension => {
  const dims = [null]
  , adjDims = [];
  getObjectKeys(dimension).forEach(k => {
    if (k !== TIME_ID) {
      const _dim = dimension[k]
      , {label, category} = _dim || {}
      , dim = {
        c: _crC(label),
        v: k,
        options: _crEsOptions(category, k)
      };
      if (k === ADJ_ID) {
        dim.c = ADJ
        dim.options = _crOptionsWithSc(dim)
        adjDims.push(dim)
      } else if (k === GEO_ID) {
        dim.c = GEO_ENTITY
        dims[0] = dim
      } else {
        dims.push(dim)
      }
    }
  })
  const _dims = filterBoolean(dims)
    .concat(adjDims);
  return {
    dims: _dims,
    mapFrequency: _getMapFrequency(_dims),
    timeId: TIME_ID
  };
};

export default crDimConfigEs
