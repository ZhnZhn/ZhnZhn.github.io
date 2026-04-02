export const getSeriesId = (
  options
) => options.items[0].v

export const getObservationsData = (
  json,
  _options
) => (json || {}).observations
