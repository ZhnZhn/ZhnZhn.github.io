"use strict";

exports.__esModule = true;
exports.tooltipValueTdmyIf = exports.tooltipValueDmy = exports.tooltipTreeMap = exports.tooltipSparkTreeMap = exports.tooltipSparkStackedArea = exports.tooltipExValue = exports.tooltipExDividend = exports.tooltipDonut = exports.tooltipCategorySimple = exports.tooltipCategory = exports.tooltipAth = void 0;
var _formatNumberFn = require("../utils/formatNumberFn");
var _dateFormatFn = require("../utils/dateFormatFn");
var _tpSpline = require("./tp/tpSpline");
var _tpCategory = require("./tp/tpCategory");
var _tpScatter = require("./tp/tpScatter");
var _tpStock = require("./tp/tpStock");
var _tpSpark = require("./tp/tpSpark");
var _tpTreeMap = require("./tp/tpTreeMap");
var _tpDonut = require("./tp/tpDonut");
var _tpFn = require("./tp/tpFn");
var _ChartFn = require("./ChartFn");
const _addCloseHandler = (id, point) => {
  setTimeout(() => (0, _tpFn.addHideHandler)(id, point), 1);
};
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
    value = isWithValue
    //? toNumberFormat(point.y)
    ? (0, _formatNumberFn.formatNumber)(point.y) : null,
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
const tooltipValueDmy = exports.tooltipValueDmy = _fFormatter({
  ..._tpSpline.splineValueDmy
});
const tooltipValueTdmyIf = exports.tooltipValueTdmyIf = _fFormatter({
  ..._tpSpline.splineValueTdmyIf
});
const tooltipCategorySimple = exports.tooltipCategorySimple = _fFormatter({
  ..._tpCategory.categorySimple
});
const tooltipCategory = exports.tooltipCategory = _fFormatter({
  ..._tpCategory.categoryRemove
});
const tooltipExDividend = exports.tooltipExDividend = _fFormatter({
  ..._tpScatter.scatterExDividend
});
const tooltipExValue = exports.tooltipExValue = _fFormatter({
  ..._tpScatter.scatterExValue
});
const tooltipAth = exports.tooltipAth = _fFormatter({
  ..._tpStock.stockAth
});
const tooltipDonut = exports.tooltipDonut = _fFormatter({
  ..._tpDonut.donutValue
});
const tooltipSparkStackedArea = exports.tooltipSparkStackedArea = _fFormatter({
  ..._tpSpark.sparkStackedArea
});
const tooltipSparkTreeMap = exports.tooltipSparkTreeMap = _fFormatter({
  ..._tpSpark.sparkTreeMap
});
const tooltipTreeMap = exports.tooltipTreeMap = _fFormatter({
  ..._tpTreeMap.treeMapValue
});
//# sourceMappingURL=Tooltip.js.map