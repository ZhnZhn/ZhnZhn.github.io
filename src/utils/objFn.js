import Highcharts from 'highcharts'
import {
  isStr,
  isFn
} from './isTypeFn';

export const merge = Highcharts.merge

export const getByPropsFrom = (
  obj,
  ...props
) => (props || [])
 .reduce((
   nextObj,
   propName
 ) => (nextObj || (isStr(propName) ? {} : []))[propName], obj)

export const getFnByPropName = (
  obj,
  propName,
  dfValue
) => !obj || !isFn(obj[propName])
  ? () => dfValue
  : obj[propName]
