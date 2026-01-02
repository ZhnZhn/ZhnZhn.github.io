import { isStr } from './isTypeFn';

export const toUpperCaseFirst = (
  strOr
) => isStr(strOr) && strOr
  ? strOr[0].toUpperCase() + strOr.slice(1)
  : ''

export const safeReplaceIn = (
  str,
  from,
  to
) => isStr(str)
  ? str.replace(from, to)
  : ''

export const toPlural = str => {
  if (!str) return str;
  const _lastIndex = str.length - 1;
  return str[_lastIndex] === 'y'
    ? str.slice(0, _lastIndex) + 'ies'
    : str + 's';
}
