import crEsDimConfig from './crEsDimConfig';
import crSdnDimConfig from './crSdnDimConfig';
import crDimConfig from './crDimConfig';

import loadJson from './loadJson';

const _isArr = Array.isArray;

const _isEs = (dimension, source) =>
  dimension && source === 'Eurostat'

const _isSdn = item => item
  && item.id && item.text
  && !_isArr(item.valueTexts)
  && _isArr(item.values);

const _crDimsConfig = (json) => {
  const dims = []
  , { variables, dimension, source } = json;
  let timeId, mapFrequency = 'Y';
  if (_isEs(dimension, source)) {
    return crEsDimConfig(dimension);
  }
  if (!_isArr(variables)) {
    return {dims, timeId, mapFrequency};
  }
  if (_isSdn(variables[0])) {
    return crSdnDimConfig(variables);
  }
  return crDimConfig(variables);
};

const loadDimsWithOptions = url => loadJson(url)
 .then(_crDimsConfig);

export default loadDimsWithOptions
