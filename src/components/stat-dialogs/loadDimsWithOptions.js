import {
  crDimItem,
  toFirstUpperCase
} from './dimConfigFn';

import crEsDimConfig from './crEsDimConfig';
import crSdnDimConfig from './crSdnDimConfig';

import loadJson from './loadJson';

const _isArr = Array.isArray;

const _isNotCorrectDim = (values, valueTexts) =>
 !_isArr(values) || !_isArr(valueTexts)
 || values.length !== valueTexts.length;

const _crDimOptions = ({ values, valueTexts, code }) => {
  if (_isNotCorrectDim(values, valueTexts)) {
    return;
  }
  return valueTexts.map((text, index) =>
    crDimItem(text, code, values[index]));
};

const _crDateOptions = ({ values, valueTexts }) => {
  if (_isNotCorrectDim(values, valueTexts)) {
    return;
  }
  const _dateOptions = [];
  valueTexts.forEach((valueText, i) => {
    _dateOptions.push({
      caption: valueText,
      value: values[i]
    })
  });
  return _dateOptions.reverse();
};

const _isSdn = item => item
  && item.id && item.text
  && !_isArr(item.valueTexts)
  && _isArr(item.values);

const TIME_IDS = [
  'Tid',
  'Year','Month','Vuosi','Vuosineljännes'
];

const _isNotTimeDimension = (time, code) => !time &&
  TIME_IDS.indexOf(code) === -1
  && (code+'').indexOf('TLIST(') === -1;
  //'TLIST(' //'TLIST(M1)', 'TLIST(A1)' SIR

const FREQUENCY_HM = {
  month: 'M',
  quarter: 'K'
};


const _isEs = (dimension, source) =>
  dimension && source === 'Eurostat'

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
  variables.forEach(item => {
    const { code, time } = item
    , _text = item.text || '';
    if (_isNotTimeDimension(time, code)) {
      dims.push({
        c: toFirstUpperCase(_text),
        v: code,
        options: _crDimOptions(item)
     })
    } else {
      timeId = code
      mapFrequency = FREQUENCY_HM[_text.toLowerCase()]
      dims.dateOptions = _crDateOptions(item)
   }
  })
  return { mapFrequency, dims, timeId };
};

const loadDimsWithOptions = (url) => {
  return loadJson(url).then(_crDimsConfig);
};

export default loadDimsWithOptions
