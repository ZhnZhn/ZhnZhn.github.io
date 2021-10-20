"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _loadJson = _interopRequireDefault(require("./loadJson"));

const _isArr = Array.isArray;

const _toFirstUpperCase = str => str.charAt(0).toUpperCase() + str.substring(1);

const _crDimItem = (caption, sliceId, value) => ({
  caption,
  slice: {
    [sliceId]: value
  }
});

const _isNotCorrectDim = (values, valueTexts) => !_isArr(values) || !_isArr(valueTexts) || values.length !== valueTexts.length;

const _crDimOptions = ({
  values,
  valueTexts,
  code
}) => {
  if (_isNotCorrectDim(values, valueTexts)) {
    return;
  }

  return valueTexts.map((text, index) => _crDimItem(text, code, values[index]));
};

const _crDateOptions = ({
  values,
  valueTexts
}) => {
  if (_isNotCorrectDim(values, valueTexts)) {
    return;
  }

  const _dateOptions = [];
  valueTexts.forEach((valueText, i) => {
    _dateOptions.push({
      caption: valueText,
      value: values[i]
    });
  });
  return _dateOptions.reverse();
};

const _isSdn = item => item && item.id && item.text && !_isArr(item.valueTexts) && _isArr(item.values);

const _crSdnDimOptions = ({
  values,
  id
}) => (values || []).map(item => _crDimItem(item.text, id, item.id));

const TIME_IDS = ['Tid', 'Year', 'Month', 'Vuosi', 'Vuosineljännes'];

const _isNotTimeDimension = (time, code) => !time && TIME_IDS.indexOf(code) === -1 && (code + '').indexOf('TLIST(') === -1; //'TLIST(' //'TLIST(M1)', 'TLIST(A1)' SIR


const FREQUENCY_HM = {
  month: 'M',
  quarter: 'K'
};

const _crSdnDimConfig = variables => {
  const dims = [];
  let timeId,
      mapFrequency = 'Y';
  variables.forEach(item => {
    const {
      time,
      text = '',
      id
    } = item;

    if (time) {
      timeId = id;
      dims.dateOptions = item.values.map(({
        id,
        text
      }) => ({
        caption: text,
        value: id
      })).reverse();
    } else {
      dims.push({
        c: _toFirstUpperCase(text),
        v: id,
        options: _crSdnDimOptions(item)
      });
    }
  });
  return {
    mapFrequency,
    dims,
    timeId
  };
};

const _crDimsConfig = json => {
  const dims = [],
        {
    variables
  } = json;
  let timeId,
      mapFrequency = 'Y';

  if (!_isArr(variables)) {
    return {
      dims,
      timeId,
      mapFrequency
    };
  }

  if (_isSdn(variables[0])) {
    return _crSdnDimConfig(variables);
  }

  variables.forEach(item => {
    const {
      code,
      time
    } = item,
          _text = item.text || '';

    if (_isNotTimeDimension(time, code)) {
      dims.push({
        c: _toFirstUpperCase(_text),
        v: code,
        options: _crDimOptions(item)
      });
    } else {
      timeId = code;
      mapFrequency = FREQUENCY_HM[_text.toLowerCase()];
      dims.dateOptions = _crDateOptions(item);
    }
  });
  return {
    mapFrequency,
    dims,
    timeId
  };
};

const loadDimsWithOptions = url => {
  return (0, _loadJson.default)(url).then(_crDimsConfig);
};

var _default = loadDimsWithOptions;
exports.default = _default;
//# sourceMappingURL=loadDimsWithOptions.js.map