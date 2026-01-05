import {
  isNumber,
  isStr
} from './isTypeFn';

export const getCaption = item => {
  const {
    caption,
    c
  } = item ?? {};
  return '' + (c ?? caption ?? '');
};

export const getValue = (
  item,
  dfStrOrNumber
) => {
  const {
    value,
    v
  } = item ?? {}
  , _value = v ?? value;
  return isStr(_value)
    ? _value
    : isNumber(_value)
    ? '' + _value
    : isStr(dfStrOrNumber)
    ? dfStrOrNumber
    : isNumber(dfStrOrNumber)
    ? '' + dfStrOrNumber
    : '';
}

export const getValueUpperCase = (
  item
) => getValue(item).toUpperCase()

export const fIsValueEqual = (
  token
) => item => getValue(item) === token

export const getValueAndCaption = (
  item,
  options
) => [
  getValue(item, options),
  getCaption(item)
]
