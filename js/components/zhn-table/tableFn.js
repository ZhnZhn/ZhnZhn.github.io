"use strict";

exports.__esModule = true;
exports.toFormatValue = exports.crTdStyle = exports.crAppearance = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _Style = require("./Style");
//const _isNotNumber = v => Number.isNaN(v) || v == null;

const _crThAriaLabel = (name, order) => `${name}: activate to sort column ${order}`;
const crTdStyle = _ref => {
  let {
    v,
    isR
  } = _ref;
  return isR ? (0, _isTypeFn.isNumber)(v) ? v > 0 ? _Style.S_UP : _Style.S_DOWN : (0, _Style.crNaNStyle)() : void 0;
};
exports.crTdStyle = crTdStyle;
const toFormatValue = _ref2 => {
  let {
    h,
    v,
    fn
  } = _ref2;
  return h.isR && !(0, _isTypeFn.isNumber)(v) ? _Style.TOKEN_NAN : h.isF && (0, _isTypeFn.isFn)(fn) ? fn(v) : v;
};
exports.toFormatValue = toFormatValue;
const crAppearance = _ref3 => {
  let {
    C,
    pn,
    name,
    sortBy,
    sortTo
  } = _ref3;
  const [style, ariaSort, ariaLabel] = pn === sortBy ? sortTo === C.UP ? [_Style.S_TH_UP, C.DESC, _crThAriaLabel(name, C.ASC)] : [_Style.S_TH_DOWN, C.ASC, _crThAriaLabel(name, C.DESC)] : [void 0, void 0, _crThAriaLabel(name, C.ASC)];
  return {
    style,
    ariaSort,
    ariaLabel
  };
};
exports.crAppearance = crAppearance;
//# sourceMappingURL=tableFn.js.map