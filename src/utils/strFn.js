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
