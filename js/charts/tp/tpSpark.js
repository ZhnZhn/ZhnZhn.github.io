'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _SparkFactory = require('../../components/factories/SparkFactory');

var _SparkFactory2 = _interopRequireDefault(_SparkFactory);

var _tpFn = require('./tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

var _tpConfig = require('./tpConfig');

var _tpConfig2 = _interopRequireDefault(_tpConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crHeader = _tpFn2.default.crHeader,
    crRow = _tpFn2.default.crRow,
    toNumberFormat = _tpFn2.default.toNumberFormat,
    fHide = _tpFn2.default.fHide;


var SPARKLINES_SUFFIX_ID = 'sparklines',
    SPARKLINES_BAR_SUFFIX_ID = 'sparklines_bar',
    WIDTH_CHAR = 10,
    WIDTH_VALUE = 54,
    WIDTH_TOTAL = 50,
    WIDTH_SPARK = 20 + 80 + 16;

var _fnCalcWidthSparkType4 = function _fnCalcWidthSparkType4(value, total) {
  var _width1 = WIDTH_VALUE + value.length * WIDTH_CHAR,
      _width2 = WIDTH_TOTAL + total.length * WIDTH_CHAR,
      width = _width1 > _width2 ? _width1 : _width2,
      fullWidth = width + WIDTH_SPARK;
  return { fullWidth: fullWidth, width: width };
};

var _fnTooltipSparkType4 = function _fnTooltipSparkType4(_ref) {
  var fullWidth = _ref.fullWidth,
      width = _ref.width,
      year = _ref.year,
      value = _ref.value,
      total = _ref.total,
      percent = _ref.percent,
      id = _ref.id;

  var _style = 'style="float:left;padding-right:10px;width:' + width + 'px;"';
  return '<div class="tp__body">\n  <div class="tp__body__part1" style="width:' + fullWidth + 'px;" >\n    <div ' + _style + '>\n      ' + crRow('Year', year, { color: _tpConfig2.default.YEAR_C }) + '\n      ' + crRow('Value', value) + '\n    </div>\n    <div id="' + id + '_' + SPARKLINES_SUFFIX_ID + '" class="tp__body__sparklines">\n    </div>\n  </div>\n  <div class="tp__body__part1" style="width:' + fullWidth + 'px;" >\n    <div ' + _style + '>\n      ' + crRow('Total', total) + '\n      ' + crRow('Percent', percent) + '\n    </div>\n    <div id="' + id + '_' + SPARKLINES_BAR_SUFFIX_ID + '" class="tp__body__sparklines">\n    </div>\n  </div>';
};

var _addHideHandler = function _addHideHandler(id, point) {
  var _n = document.getElementById(id);
  if (_n) {
    _n.addEventListener('click', fHide(id, point));
  }
};

var _crSparkData = function _crSparkData(point) {
  var sparkvalues = point.sparkvalues,
      sparkpercent = point.sparkpercent;

  var sparkLinesData = [],
      sparkBarsData = [],
      pointIndex = void 0;

  if (sparkvalues) {
    sparkLinesData = sparkvalues;
    sparkBarsData = sparkpercent;
    pointIndex = sparkvalues.length !== 0 ? sparkvalues.length - 1 : 0;
  } else {
    var seriesData = point.series.data;
    seriesData.forEach(function (item, itemIndex) {
      sparkLinesData.push(item.y);
      sparkBarsData.push(item.percentage);
    });
    pointIndex = point.index;
  }
  return { sparkLinesData: sparkLinesData, sparkBarsData: sparkBarsData, pointIndex: pointIndex };
};

var _onAfterRender = function _onAfterRender(id, point) {
  setTimeout(function () {
    _addHideHandler(id, point);

    var _crSparkData2 = _crSparkData(point),
        sparkLinesData = _crSparkData2.sparkLinesData,
        sparkBarsData = _crSparkData2.sparkBarsData,
        pointIndex = _crSparkData2.pointIndex,
        sparklines = _SparkFactory2.default.createSparklines(sparkLinesData, pointIndex),
        sparkbars = _SparkFactory2.default.createSparkbars(sparkBarsData, pointIndex);

    (0, _reactDom.render)(sparklines, document.getElementById(id + '_' + SPARKLINES_SUFFIX_ID));
    (0, _reactDom.render)(sparkbars, document.getElementById(id + '_' + SPARKLINES_BAR_SUFFIX_ID));
  }, 1);
};

var _crStackedArea = function _crStackedArea(_ref2) {
  var id = _ref2.id,
      value = _ref2.value,
      point = _ref2.point;

  var nameFull = point.nameFull,
      category = point.category,
      _point$percent = point.percent,
      percent = _point$percent === undefined ? '0.0' : _point$percent,
      _point$total = point.total,
      total = _point$total === undefined ? 0 : _point$total,
      _total = toNumberFormat(total),
      _fnCalcWidthSparkType = _fnCalcWidthSparkType4(value, _total),
      fullWidth = _fnCalcWidthSparkType.fullWidth,
      width = _fnCalcWidthSparkType.width;

  return crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth: fullWidth, width: width, year: category, value: value, total: _total, percent: percent, id: id
  });
};

var _crTreeMap = function _crTreeMap(_ref3) {
  var id = _ref3.id,
      point = _ref3.point;

  var nameFull = point.nameFull,
      year = point.year,
      _point$value = point.value,
      value = _point$value === undefined ? '0.0' : _point$value,
      _point$percent2 = point.percent,
      percent = _point$percent2 === undefined ? '0.0' : _point$percent2,
      _point$total2 = point.total,
      total = _point$total2 === undefined ? 0 : _point$total2,
      _value = toNumberFormat(value),
      _total = toNumberFormat(total),
      _fnCalcWidthSparkType2 = _fnCalcWidthSparkType4(_value, _total),
      fullWidth = _fnCalcWidthSparkType2.fullWidth,
      width = _fnCalcWidthSparkType2.width;

  return crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth: fullWidth, width: width, year: year, value: _value, total: _total, percent: percent, id: id
  });
};

var tpSpark = {
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

exports.default = tpSpark;
//# sourceMappingURL=tpSpark.js.map