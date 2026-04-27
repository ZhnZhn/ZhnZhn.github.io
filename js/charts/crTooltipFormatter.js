"use strict";

exports.__esModule = true;
exports.default = void 0;
var _dateFormatFn = require("../utils/dateFormatFn");
var _numberFormatFn = require("../utils/numberFormatFn");
var _tpFn = require("./tp/tpFn");
var _ChartFn = require("./ChartFn");
const _addCloseHandler = (id, point) => {
  setTimeout(() => (0, _tpFn.addHideHandler)(id, point), 1);
};
const _formatValue = (point, value) => value != null && (point?.series?.name || '').slice(0, 4) === 'ROC(' ? `${value}%` : value;

// biome-ignore-start lint/complexity/noUselessThisAlias: minification and readibility
const _fFormatter = option => function () {
  const {
      fnTemplate,
      onAfterRender = _addCloseHandler,
      fnDateFormat = _dateFormatFn.toWmdy,
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
    value = isWithValue ? (0, _numberFormatFn.formatNumber)(point.y) : null,
    id = (0, _ChartFn.crTpId)();
  onAfterRender(id, point);
  return fnTemplate({
    id,
    date,
    color,
    valueText,
    value: _formatValue(point, value),
    point
  });
};
// biome-ignore-end lint/complexity/noUselessThisAlias: minification and readibility
var _default = exports.default = _fFormatter;
//# sourceMappingURL=crTooltipFormatter.js.map