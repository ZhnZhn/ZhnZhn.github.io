"use strict";

exports.__esModule = true;
exports.sparkTreeMap = exports.sparkStackedArea = void 0;
var _reactDom = require("react-dom");
var _formatNumberFn = require("../../utils/formatNumberFn");
var _SparkFactory = require("../../components/factories/SparkFactory");
var _Color = require("../../constants/Color");
var _tpFn = require("./tpFn");
const SPARKLINES_SUFFIX_ID = 'sparklines',
  SPARKLINES_BAR_SUFFIX_ID = 'sparklines_bar',
  WIDTH_CHAR = 10,
  WIDTH_VALUE = 54,
  WIDTH_TOTAL = 50,
  WIDTH_SPARK = 20 + 80 + 16;
const _calcWidthSparkType4 = (value, total) => {
  const _width1 = WIDTH_VALUE + value.length * WIDTH_CHAR,
    _width2 = WIDTH_TOTAL + total.length * WIDTH_CHAR,
    width = _width1 > _width2 ? _width1 : _width2,
    fullWidth = width + WIDTH_SPARK;
  return [fullWidth, width];
};
const _crTooltipSparkType4 = _ref => {
  let {
    fullWidth,
    width,
    year,
    value,
    total,
    percent,
    id
  } = _ref;
  const _style = `style="float:left;padding-right:10px;width:${width}px;"`;
  return `<div class="tp__body">
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div ${_style}>
      ${(0, _tpFn.crRow)('Year', year, {
    color: _Color.COLOR_DATE
  })}
      ${(0, _tpFn.crRow)('Value', value)}
    </div>
    <div id="${id}_${SPARKLINES_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div ${_style}>
      ${(0, _tpFn.crRow)('Total', total)}
      ${(0, _tpFn.crRow)('Percent', percent)}
    </div>
    <div id="${id}_${SPARKLINES_BAR_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>`;
};
const _crSparkData = point => {
  const {
    sparkvalues,
    sparkpercent
  } = point;
  let sparkLinesData = [],
    sparkBarsData = [],
    pointIndex;
  if (sparkvalues) {
    sparkLinesData = sparkvalues;
    sparkBarsData = sparkpercent;
    pointIndex = sparkvalues.length === 0 ? 0 : sparkvalues.length - 1;
  } else {
    const seriesData = point.series.data;
    seriesData.forEach(item => {
      sparkLinesData.push(item.y);
      sparkBarsData.push(item.percentage);
    });
    pointIndex = point.index;
  }
  return {
    sparkLinesData,
    sparkBarsData,
    pointIndex
  };
};
const _onAfterRender = function (id, point) {
  setTimeout(function () {
    (0, _tpFn.addHideHandler)(id, point);
    const {
        sparkLinesData,
        sparkBarsData,
        pointIndex
      } = _crSparkData(point),
      sparklines = (0, _SparkFactory.crSparkLines)(sparkLinesData, pointIndex),
      sparkbars = (0, _SparkFactory.crSparkBars)(sparkBarsData, pointIndex);
    (0, _reactDom.render)(sparklines, document.getElementById(`${id}_${SPARKLINES_SUFFIX_ID}`));
    (0, _reactDom.render)(sparkbars, document.getElementById(`${id}_${SPARKLINES_BAR_SUFFIX_ID}`));
  }, 1);
};
const _crStackedArea = _ref2 => {
  let {
    id,
    value,
    point
  } = _ref2;
  const {
      nameFull,
      category,
      percent = '0.0',
      total = 0
    } = point,
    _total = (0, _formatNumberFn.formatNumber)(total),
    [fullWidth, width] = _calcWidthSparkType4(value, _total);
  return (0, _tpFn.crHeader)(nameFull, id) + _crTooltipSparkType4({
    id,
    fullWidth,
    width,
    value,
    percent,
    year: category,
    total: _total
  });
};
const _crTreeMap = _ref3 => {
  let {
    id,
    point
  } = _ref3;
  const {
      nameFull,
      year,
      value = '0.0',
      percent = '0.0',
      total = 0
    } = point,
    _value = (0, _formatNumberFn.formatNumber)(value),
    _total = (0, _formatNumberFn.formatNumber)(total),
    [fullWidth, width] = _calcWidthSparkType4(_value, _total);
  return (0, _tpFn.crHeader)(nameFull, id) + _crTooltipSparkType4({
    id,
    fullWidth,
    width,
    year,
    percent,
    value: _value,
    total: _total
  });
};
const sparkStackedArea = exports.sparkStackedArea = {
  fnTemplate: _crStackedArea,
  onAfterRender: _onAfterRender,
  isWithValue: true
};
const sparkTreeMap = exports.sparkTreeMap = {
  fnTemplate: _crTreeMap,
  onAfterRender: _onAfterRender,
  isWithValue: true
};
//# sourceMappingURL=tpSpark.js.map