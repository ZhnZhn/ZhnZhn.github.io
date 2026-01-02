import { isStr } from './isTypeFn';

export const getByPropsFrom = (
  obj,
  ...props
) => (props || [])
 .reduce((
   nextObj,
   propName
 ) => (nextObj || (isStr(propName) ? {} : []))[propName], obj)
