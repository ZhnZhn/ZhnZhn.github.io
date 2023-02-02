import crDimConfigEs from './crDimConfigEs';
import crDimConfigSdn from './crDimConfigSdn';
import crDimConfig from './crDimConfig';

import loadJson from './loadJson';

const _isArr = Array.isArray;

const _isEs = (dimension, source) =>
  dimension && source === 'ESTAT'
  
const _isSdn = item => item
  && item.id && item.text
  && !_isArr(item.valueTexts)
  && _isArr(item.values);

const _crDimsConfig = (json) => {
  const dims = []
  , { variables, dimension, source } = json;
  let timeId, mapFrequency = 'Y';
  if (_isEs(dimension, source)) {
    return crDimConfigEs(dimension);
  }
  if (!_isArr(variables)) {
    return {dims, timeId, mapFrequency};
  }
  if (_isSdn(variables[0])) {
    return crDimConfigSdn(variables);
  }
  return crDimConfig(variables);
};

const loadDimsWithOptions = url => loadJson(url)
 .then(_crDimsConfig);

export default loadDimsWithOptions
