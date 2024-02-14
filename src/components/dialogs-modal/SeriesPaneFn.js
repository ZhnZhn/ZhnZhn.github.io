import { safeMap } from '../uiApi';

export const getUserMinMax = fromChart => {
  const { xAxis } = fromChart || {}
  , [ xAxis0 ] = xAxis || []
  , {
    dataMin, dataMax,
    userMin, userMax
  } = (xAxis0 && xAxis0.getExtremes()) || {};
  return [
    userMin || dataMin,
    userMax || dataMax
  ];
}

const _crOptionItem = (
  caption,
  value
) => ({
  caption,
  value
});

export const crYAxisOptions = (
  toChart
) => [
  _crOptionItem('withYAxis')
].concat(
  safeMap(
    toChart.yAxis,
    (yAxis, index) => _crOptionItem(`toYAxis${index+1}`, index)
  ) || []
)
