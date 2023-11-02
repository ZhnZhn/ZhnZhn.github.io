import {
  TOKEN_NAN,
  S_UP,
  S_DOWN,
  crNaNStyle,
  S_TH_UP,
  S_TH_DOWN
} from './Style';

const _isNotNumber = v => Number.isNaN(v) || v == null;

const _crThAriaLabel = (
  name,
  order
) => `${name}: activate to sort column ${order}`

export const crTdStyle = ({
  v,
  isR
}) => isR
  ? _isNotNumber(v)
       ? crNaNStyle()
       : v > 0 ? S_UP : S_DOWN
  : void 0;

export const toFormatValue = ({ h, v, fn }) => {
  if (h.isR && _isNotNumber(v)) {
    return TOKEN_NAN;
  }
  if (h.isF && typeof fn === 'function') {
    return fn(v);
  }
  return v;
}

export const crAppearance = ({ C, pn, name, sortBy, sortTo }) => {
  let style, ariaSort, ariaLabel;
  if (pn === sortBy) {
   if (sortTo === C.UP) {
    style = S_TH_UP
    ariaSort = C.DESC
    ariaLabel = _crThAriaLabel(name, C.ASC)
   } else {
     style = S_TH_DOWN
     ariaSort = C.ASC
     ariaLabel = _crThAriaLabel(name, C.DESC)
   }
  } else {
    ariaLabel = _crThAriaLabel(name, C.ASC)
  }
  return { style, ariaSort, ariaLabel };
}
