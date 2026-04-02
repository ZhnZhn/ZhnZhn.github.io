"use strict";

exports.__esModule = true;
exports.default = void 0;
var _tpFn = require("./tp/tpFn");
var _ChartFn = require("./ChartFn");
const _addCloseHandler = (id, point) => {
  setTimeout(() => (0, _tpFn.addHideHandler)(id, point), 1);
};
const _fFormatter = option => function () {
  const {
      fnTemplate,
      onAfterRender = _addCloseHandler,
      fnDateFormat = toWmdy,
      isWithColor,
      isWithValueText,
      isWithValue
    } = option,
    point = this,
    {
      series
    } = point,
    {
      zhValueText,
      name = 'Value'
    } = series.userOptions,
    date = fnDateFormat(point.x),
    color = isWithColor ? point.color || series.color : void 0,
    valueText = isWithValueText ? zhValueText || name : 'Value',
    value = isWithValue
    //? toNumberFormat(point.y)
    ? formatNumber(point.y) : null,
    id = (0, _ChartFn.crTpId)();
  onAfterRender(id, point);
  return fnTemplate({
    id,
    date,
    color,
    valueText,
    value,
    point
  });
};
var _default = exports.default = _fFormatter;
//# sourceMappingURL=crTooltipFormatter.js.map