"use strict";

exports.__esModule = true;
exports.getValueUpperCase = exports.getValueAndCaption = exports.getValue = exports.getCaption = exports.fIsValueEqual = void 0;
var _isTypeFn = require("./isTypeFn");
const getCaption = item => {
  const {
    caption,
    c
  } = item ?? {};
  return '' + (c ?? caption ?? '');
};
exports.getCaption = getCaption;
const getValue = (item, dfStrOrNumber) => {
  const {
      value,
      v
    } = item ?? {},
    _value = v ?? value;
  return (0, _isTypeFn.isStr)(_value) ? _value : (0, _isTypeFn.isNumber)(_value) ? '' + _value : (0, _isTypeFn.isStr)(dfStrOrNumber) ? dfStrOrNumber : (0, _isTypeFn.isNumber)(dfStrOrNumber) ? '' + dfStrOrNumber : '';
};
exports.getValue = getValue;
const getValueUpperCase = item => getValue(item).toUpperCase();
exports.getValueUpperCase = getValueUpperCase;
const fIsValueEqual = token => item => getValue(item) === token;
exports.fIsValueEqual = fIsValueEqual;
const getValueAndCaption = (item, options) => [getValue(item, options), getCaption(item)];
exports.getValueAndCaption = getValueAndCaption;
//# sourceMappingURL=itemFn.js.map