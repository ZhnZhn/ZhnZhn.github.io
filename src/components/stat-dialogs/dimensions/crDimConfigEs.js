import {
  TIME_ID,
  GEO_ID,
  ADJ,
  ADJ_ID,
  GEO_ENTITY
} from './EsConfig';
import { toFirstUpperCase } from './dimConfigFn';

const _keys = Object.keys;

const _crC = label => (label || '')
  .split('_')
  .map(toFirstUpperCase)
  .join(' ');

const _crEsOptions = (category, id) => {
  const { label } = category || {};
  return _keys(label || {}).map(k => ({
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

const crDimConfigEs = dimension => {
  const dims = [null]
  , adjDims = [];
  _keys(dimension).forEach(k => {
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
  return {
    dims: dims.filter(Boolean).concat(adjDims),
    timeId: TIME_ID
  };
};

export default crDimConfigEs
