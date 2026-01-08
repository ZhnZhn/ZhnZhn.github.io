import { getActiveContCheckBox } from '../contCheckBoxLogic';

export const getSubSliceOf = (
  slice,
  chartTypeOfSubSlice
) => {
  const activeContChb = getActiveContCheckBox()
  , chartSlice = slice[(activeContChb && activeContChb.chartType)
    || chartTypeOfSubSlice];
  return [
    chartSlice,
    (chartSlice || {}).configs || []
  ];
}
