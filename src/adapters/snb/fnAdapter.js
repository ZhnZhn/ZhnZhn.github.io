export const DATA_SNB_URL = "https://data.snb.ch"
export const getTimeSeriesValues = json => (((json || {}).timeseries || [])[0] || {}).values
