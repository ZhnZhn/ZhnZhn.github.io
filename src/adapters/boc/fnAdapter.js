export const getSeriesId = (
  options
) => options.items[0].v

export const getObservationsData = (
  json,
  options
) => (json || {}).observations
