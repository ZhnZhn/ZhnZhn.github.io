"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _reactDom = require("react-dom");

var _SparkFactory = _interopRequireDefault(require("../../components/factories/SparkFactory"));

var _tpFn = _interopRequireDefault(require("./tpFn"));

var _Colors = require("./Colors");

const {
  crHeader,
  crRow,
  toNumberFormat,
  addHideHandler
} = _tpFn.default;
const SPARKLINES_SUFFIX_ID = 'sparklines',
      SPARKLINES_BAR_SUFFIX_ID = 'sparklines_bar',
      WIDTH_CHAR = 10,
      WIDTH_VALUE = 54,
      WIDTH_TOTAL = 50,
      WIDTH_SPARK = 20 + 80 + 16;

const _fnCalcWidthSparkType4 = function (value, total) {
  const _width1 = WIDTH_VALUE + value.length * WIDTH_CHAR,
        _width2 = WIDTH_TOTAL + total.length * WIDTH_CHAR,
        width = _width1 > _width2 ? _width1 : _width2,
        fullWidth = width + WIDTH_SPARK;

  return {
    fullWidth,
    width
  };
};

const _fnTooltipSparkType4 = function (_ref) {
  let {
    fullWidth,
    width,
    year,
    value,
    total,
    percent,
    id
  } = _ref;

  const _style = "style=\"float:left;padding-right:10px;width:" + width + "px;\"";

  return "<div class=\"tp__body\">\n  <div class=\"tp__body__part1\" style=\"width:" + fullWidth + "px;\" >\n    <div " + _style + ">\n      " + crRow('Year', year, {
    color: _Colors.YEAR_COLOR
  }) + "\n      " + crRow('Value', value) + "\n    </div>\n    <div id=\"" + id + "_" + SPARKLINES_SUFFIX_ID + "\" class=\"tp__body__sparklines\">\n    </div>\n  </div>\n  <div class=\"tp__body__part1\" style=\"width:" + fullWidth + "px;\" >\n    <div " + _style + ">\n      " + crRow('Total', total) + "\n      " + crRow('Percent', percent) + "\n    </div>\n    <div id=\"" + id + "_" + SPARKLINES_BAR_SUFFIX_ID + "\" class=\"tp__body__sparklines\">\n    </div>\n  </div>";
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
    pointIndex = sparkvalues.length !== 0 ? sparkvalues.length - 1 : 0;
  } else {
    const seriesData = point.series.data;
    seriesData.forEach((item, itemIndex) => {
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
    addHideHandler(id, point);

    const {
      sparkLinesData,
      sparkBarsData,
      pointIndex
    } = _crSparkData(point),
          sparklines = _SparkFactory.default.createSparklines(sparkLinesData, pointIndex),
          sparkbars = _SparkFactory.default.createSparkbars(sparkBarsData, pointIndex);

    (0, _reactDom.render)(sparklines, document.getElementById(id + "_" + SPARKLINES_SUFFIX_ID));
    (0, _reactDom.render)(sparkbars, document.getElementById(id + "_" + SPARKLINES_BAR_SUFFIX_ID));
  }, 1);
};

const _crStackedArea = function (_ref2) {
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
        _total = toNumberFormat(total),
        {
    fullWidth,
    width
  } = _fnCalcWidthSparkType4(value, _total);

  return crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth,
    width,
    year: category,
    value,
    total: _total,
    percent,
    id
  });
};

const _crTreeMap = function (_ref3) {
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
        _value = toNumberFormat(value),
        _total = toNumberFormat(total),
        {
    fullWidth,
    width
  } = _fnCalcWidthSparkType4(_value, _total);

  return crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth,
    width,
    year,
    value: _value,
    total: _total,
    percent,
    id
  });
};

const tpSpark = {
  stackedArea: {
    fnTemplate: _crStackedArea,
    onAfterRender: _onAfterRender,
    isWithValue: true
  },
  treeMap: {
    fnTemplate: _crTreeMap,
    onAfterRender: _onAfterRender,
    isWithValue: true
  }
};
var _default = tpSpark;
exports.default = _default;
//# sourceMappingURL=tpSpark.js.map