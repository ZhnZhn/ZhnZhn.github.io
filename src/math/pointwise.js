
export const pointwise = (
  mathOperation,
  ...serieses
) => {
  let result = []
  , _getSeriesValuesByIndex = (i) => serieses
       .map(seria => seria[i])
  , _len = serieses[0].length
  , i;
  for (i = 0; i < _len; i++) {
    result.push(
      mathOperation(..._getSeriesValuesByIndex(i))
    );
  }
  return result;
}
