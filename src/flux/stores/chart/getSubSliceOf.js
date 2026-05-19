import { getActiveContCheckBox } from '../contCheckBoxLogic';

export const getSubSliceOf = (
  slice,
  chartTypeOfSubSlice
) => {
  const activeContChb = getActiveContCheckBox()
  , chartSlice = slice[activeContChb?.chartType || chartTypeOfSubSlice];
  return [
    chartSlice,
    chartSlice?.configs || []
  ];
}
