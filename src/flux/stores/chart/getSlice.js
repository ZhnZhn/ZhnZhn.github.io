import { getActiveContCheckBox } from '../contCheckBoxLogic';

const getSlice = (
  slice,
  chartType
) => {
  const activeContChb = getActiveContCheckBox()
  , _cT = activeContChb
     ? activeContChb.chartType || chartType
     : chartType
  , chartSlice = slice[_cT]
  , { configs=[] } = chartSlice || {};
  return { chartSlice, configs };
};

export default getSlice
