'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crThAriaLabel = function _crThAriaLabel(name, order) {
  return name + ': activate to sort column ' + order;
};

var tableFn = {
  crTdStyle: function crTdStyle(_ref) {
    var S = _ref.S,
        v = _ref.v,
        isR = _ref.isR;

    var style = void 0;
    if (isR) {
      if (Number.isNaN(v)) {
        style = S.NAN;
      } else {
        style = v > 0 ? S.UP : S.DOWN;
      }
    }
    return style;
  },

  toFormatValue: function toFormatValue(_ref2) {
    var TOKEN_NAN = _ref2.TOKEN_NAN,
        h = _ref2.h,
        v = _ref2.v,
        fn = _ref2.fn;

    if (h.isR && Number.isNaN(v)) {
      return TOKEN_NAN;
    }
    if (h.isF && typeof fn === 'function') {
      return fn(v);
    }
    return v;
  },

  crAppearance: function crAppearance(_ref3) {
    var S = _ref3.S,
        C = _ref3.C,
        pn = _ref3.pn,
        name = _ref3.name,
        sortBy = _ref3.sortBy,
        sortTo = _ref3.sortTo;

    var style = void 0,
        ariaSort = void 0,
        ariaLabel = void 0;
    if (pn === sortBy) {
      if (sortTo === C.UP) {
        style = S.TH_UP;
        ariaSort = C.DESC;
        ariaLabel = _crThAriaLabel(name, C.ASC);
      } else {
        style = S.TH_DOWN;
        ariaSort = C.ASC;
        ariaLabel = _crThAriaLabel(name, C.DESC);
      }
    } else {
      ariaLabel = _crThAriaLabel(name, C.ASC);
    }
    return { style: style, ariaSort: ariaSort, ariaLabel: ariaLabel };
  }

};

exports.default = tableFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-table\tableFn.js.map