import {
  isFn,
  isNumber
} from '../../utils/isTypeFn';

import {
  TOKEN_NAN,
  S_UP,
  S_DOWN,
  crNaNStyle,
  S_TH_UP,
  S_TH_DOWN
} from './Style';

//const _isNotNumber = v => Number.isNaN(v) || v == null;

const _crThAriaLabel = (
  name,
  order
) => `${name}: activate to sort column ${order}`

export const crTdStyle = ({
  v,
  isR
}) => isR
  ? isNumber(v)
    ? v > 0 ? S_UP : S_DOWN
    : crNaNStyle()
  : void 0;

export const toFormatValue = ({
  h,
  v,
  fn
}) => h.isR && !isNumber(v)
  ? TOKEN_NAN
  : h.isF && isFn(fn)
  ? fn(v)
  : v;

export const crAppearance = ({
  C,
  pn,
  name,
  sortBy,
  sortTo
}) => {
  const [
    style,
    ariaSort,
    ariaLabel
  ] = pn === sortBy
    ? sortTo === C.UP
       ? [S_TH_UP, C.DESC, _crThAriaLabel(name, C.ASC)]
       : [S_TH_DOWN, C.ASC, _crThAriaLabel(name, C.DESC)]
    : [void 0, void 0, _crThAriaLabel(name, C.ASC)];  
  return {
    style,
    ariaSort,
    ariaLabel
  };
}
