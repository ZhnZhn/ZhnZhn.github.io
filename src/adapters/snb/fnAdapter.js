export const getTimeSeriesValues = json => (((json || {}).timeseries || [])[0] || {}).values
