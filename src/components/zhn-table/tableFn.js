
const _crThAriaLabel = (name, order) => {
  return `${name}: activate to sort column ${order}`;
};

const tableFn = {
  crTdStyle: ({ S, v, isR }) => {
    let style;
    if (isR) {
      if ( Number.isNaN(v) ) {
        style = S.NAN
      } else {
        style = v > 0 ? S.UP : S.DOWN;
      }
    }
    return style;
  },

  toFormatValue: ({ TOKEN_NAN, h, v, fn }) => {
    if (h.isR && Number.isNaN(v)) {
      return TOKEN_NAN;
    }
    if (h.isF && typeof fn === 'function') {
      return fn(v);
    }
    return v;
  },


  crAppearance: ({ S, C, pn, name, sortBy, sortTo }) => {
    let style, ariaSort, ariaLabel;
    if (pn === sortBy) {
      if (sortTo === C.UP) {
       style = S.TH_UP
       ariaSort = C.DESC
       ariaLabel = _crThAriaLabel(name, C.ASC)
      } else {
        style = S.TH_DOWN
        ariaSort = C.ASC
        ariaLabel = _crThAriaLabel(name, C.DESC)
      }
    } else {
       ariaLabel = _crThAriaLabel(name, C.ASC)
    }
    return { style, ariaSort, ariaLabel };
  }


};

export default tableFn
