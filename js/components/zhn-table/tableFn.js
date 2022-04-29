"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Style = require("./Style");

const _isNotNumber = v => Number.isNaN(v) || v == null;

const _crThAriaLabel = (name, order) => {
  return name + ": activate to sort column " + order;
};

const tableFn = {
  crTdStyle: _ref => {
    let {
      v,
      isR
    } = _ref;
    let style;

    if (isR) {
      if (_isNotNumber(v)) {
        style = _Style.S_NAN;
      } else {
        style = v > 0 ? _Style.S_UP : _Style.S_DOWN;
      }
    }

    return style;
  },
  toFormatValue: _ref2 => {
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
  },
  crAppearance: _ref3 => {
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
  }
};
var _default = tableFn;
exports.default = _default;
//# sourceMappingURL=tableFn.js.map