import { isStr } from './isTypeFn';

export const toUpperCaseFirst = (
  strOr
) => isStr(strOr) && strOr
  ? strOr[0].toUpperCase() + strOr.slice(1)
  : ''
