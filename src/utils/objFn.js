import Highcharts from 'highcharts'
import { isStr } from './isTypeFn';

export const merge = Highcharts.merge

export const getByPropsFrom = (
  obj,
  ...props
) => (props || [])
 .reduce((
   nextObj,
   propName
 ) => (nextObj || (isStr(propName) ? {} : []))[propName], obj)
