"use strict";

exports.__esModule = true;
exports.default = void 0;
var _dimConfigFn = require("./dimConfigFn");
const _isArr = Array.isArray;
const FREQUENCY_HM = {
  month: 'M',
  quarter: 'K'
};
const TIME_IDS = ['Tid', 'Year', 'Month', 'Vuosi', 'Vuosineljännes'];
const _isNotTimeDimension = (time, code) => !time && TIME_IDS.indexOf(code) === -1 && (code + '').indexOf('TLIST(') === -1;
//'TLIST(' //'TLIST(M1)', 'TLIST(A1)' SIR

const _isNotCorrectDim = (values, valueTexts) => !_isArr(values) || !_isArr(valueTexts) || values.length !== valueTexts.length;
const _crDimOptions = _ref => {
  let {
    values,
    valueTexts,
    code
  } = _ref;
  if (_isNotCorrectDim(values, valueTexts)) {
    return;
  }
  return valueTexts.map((text, index) => (0, _dimConfigFn.crDimItem)(text, code, values[index]));
};
const _crDateOptions = _ref2 => {
  let {
    values,
    valueTexts
  } = _ref2;
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
const crDimConfig = variables => {
  const dims = [];
  let timeId,
    mapFrequency = 'Y';
  variables.forEach(item => {
    const {
        code,
        time
      } = item,
      _text = item.text || '';
    if (_isNotTimeDimension(time, code)) {
      dims.push({
        c: (0, _dimConfigFn.toUpperCaseFirst)(_text),
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
var _default = exports.default = crDimConfig;
//# sourceMappingURL=crDimConfig.js.map