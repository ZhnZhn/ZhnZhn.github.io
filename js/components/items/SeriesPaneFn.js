"use strict";

exports.__esModule = true;
exports.getUserMinMax = exports.crYAxisOptions = void 0;
const getUserMinMax = fromChart => {
  const {
      xAxis
    } = fromChart || {},
    [xAxis0] = xAxis || [],
    {
      dataMin,
      dataMax,
      userMin,
      userMax
    } = xAxis0 && xAxis0.getExtremes() || {};
  return [userMin || dataMin, userMax || dataMax];
};
exports.getUserMinMax = getUserMinMax;
const _crOptionItem = (caption, value) => ({
  caption,
  value
});
const crYAxisOptions = toChart => [_crOptionItem('withYAxis')].concat((toChart.yAxis || []).map((yAxis, index) => _crOptionItem("toYAxis" + (index + 1), index)));
exports.crYAxisOptions = crYAxisOptions;
//# sourceMappingURL=SeriesPaneFn.js.map