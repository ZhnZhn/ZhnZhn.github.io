import loadJson from './loadJson'

const _isArr = Array.isArray;

const _toFirstUpperCase = (str) => str
  .charAt(0)
  .toUpperCase() + str.substring(1);

const _crDimOptions = ({ values, valueTexts, code }) => {
  if (!_isArr(values) || !_isArr(valueTexts)
      || values.length !== valueTexts.length) {
    return;
  }
  const _arr = [];
  for(let i=0; i<valueTexts.length;i++){
    _arr.push({
      caption: valueTexts[i],
      slice: { [code]: values[i] }
    })
  }
  return _arr;
};

const _isStatDenmark = (time, text, item) => !time
  && text && item.id
  && !_isArr(item.valueTexts)
  && _isArr(item.values);

const _crSdnDimOptions = ({ values, id }) => {
  const _arr = [];
  for(let i=0; i<values.length;i++){
    _arr.push({
      caption: values[i].text,
      slice: { [id]: values[i].id }
    })
  }
  return _arr;
};

const TIME_IDS = [
  'Tid',
  'Year','Month','Vuosi','Vuosineljännes'
];

const FREQUENCY_HM = {
  month: 'M',
  quarter: 'K'
};

const _crDimsConfig = (json) => {
  const dims = []
  , { variables } = json;
  let timeId, mapFrequency = 'Y';
  (variables || []).forEach(item => {
    const { code, time } = item
    , _text = item.text || '';
    if (_isStatDenmark(time, _text, item)) {
      dims.push({
        c: _toFirstUpperCase(_text),
        v: item.id,
        options: _crSdnDimOptions(item)
      })
    } else if (!time && TIME_IDS.indexOf(code) === -1) {
      dims.push({
        c: _toFirstUpperCase(_text),
        v: code,
        options: _crDimOptions(item)
     })
    } else {
      timeId = code
      mapFrequency = FREQUENCY_HM[_text.toLowerCase()]
   }
  })
  return { mapFrequency, dims, timeId };
};

const loadDimsWithOptions = (url) => {
  return loadJson(url).then(_crDimsConfig);
};

export default loadDimsWithOptions
