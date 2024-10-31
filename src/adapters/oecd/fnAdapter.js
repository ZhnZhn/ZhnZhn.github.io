import {
  getByPropsFrom,
  getValue
} from '../AdapterFn';

export const getJsonData = (
  json
) => (json || {}).data || {}

export const getDataSeries = (
  data
) => getByPropsFrom(data, "dataSets", 0, "series") || {}

export const getDataDimensions = (
  data
) => getByPropsFrom(data, "structures", 0, "dimensions")

export const crItemId = (
  isCategory,
  items
) => `${isCategory ? "" : getValue(items[0])}.Q.${getValue(items[1])}.IX`
