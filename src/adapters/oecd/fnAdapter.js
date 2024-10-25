import { getByPropsFrom } from '../AdapterFn';

export const getJsonData = (
  json
) => (json || {}).data || {}

export const getDataSeries = (
  data
) => getByPropsFrom(data, "dataSets", 0, "series") || {}

export const getDataDimensions = (
  data
) => getByPropsFrom(data, "structures", 0, "dimensions")
