"use strict";

exports.__esModule = true;
exports.toFormatValue = exports.crTdStyle = exports.crAppearance = void 0;
var _Style = require("./Style");
const _isNotNumber = v => Number.isNaN(v) || v == null;
const _crThAriaLabel = (name, order) => `${name}: activate to sort column ${order}`;
const crTdStyle = _ref => {
  let {
    v,
    isR
  } = _ref;
  return isR ? _isNotNumber(v) ? (0, _Style.crNaNStyle)() : v > 0 ? _Style.S_UP : _Style.S_DOWN : void 0;
};
exports.crTdStyle = crTdStyle;
const toFormatValue = _ref2 => {
  let {
    h,
    v,
    fn
  } = _ref2;
  if (h.isR && _isNotNumber(v)) {
    return _Style.TOKEN_NAN;
  }
  if (h.isF && typeof fn === 'function') {
    return fn(v);
  }
  return v;
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
  let style, ariaSort, ariaLabel;
  if (pn === sortBy) {
    if (sortTo === C.UP) {
      style = _Style.S_TH_UP;
      ariaSort = C.DESC;
      ariaLabel = _crThAriaLabel(name, C.ASC);
    } else {
      style = _Style.S_TH_DOWN;
      ariaSort = C.ASC;
      ariaLabel = _crThAriaLabel(name, C.DESC);
    }
  } else {
    ariaLabel = _crThAriaLabel(name, C.ASC);
  }
  return {
    style,
    ariaSort,
    ariaLabel
  };
};
exports.crAppearance = crAppearance;
//# sourceMappingURL=tableFn.js.map