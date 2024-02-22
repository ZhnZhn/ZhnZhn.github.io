import { isStr } from './isTypeFn';

export const toUpperCaseFirst = (
  v
) => isStr(v) && v
  ? v[0].toUpperCase() + v.slice(1)
  : ''
