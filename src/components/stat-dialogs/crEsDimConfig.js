import { toFirstUpperCase } from './dimConfigFn';

const _keys = Object.keys;

const _crEsOptions = (category, id) => {
  const { label } = category || {};
  return _keys(label || {}).map(k => ({
    caption: label[k],
    value: k,
    id
  }));
};

const crEsDimConfig = dimension => {
  const dims = [null];
  _keys(dimension).forEach(k => {
    if (k !== 'time') {
      const _dim = dimension[k]
      , {label, category} = _dim || {}
      , dim = {
        c: toFirstUpperCase(label),
        v: k,
        options: _crEsOptions(category, k)
      };
      if (k !== 'geo') {
        dims.push(dim)
      } else {
        dims[0] = dim
      }
    }
  })
  return {
    dims: dims.filter(Boolean),
    timeId: 'time'
  };
};

export default crEsDimConfig
