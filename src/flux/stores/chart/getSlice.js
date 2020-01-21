
const getSlice = (slice, chartType) => {
  const { activeContChb } = slice
  , _cT = activeContChb
     ? activeContChb.chartType || chartType
     : chartType
  , chartSlice = slice[_cT]
  , { configs=[] } = chartSlice || {};
  return { chartSlice, configs };
};

export default getSlice
