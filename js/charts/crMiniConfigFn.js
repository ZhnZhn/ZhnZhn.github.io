"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crMiniVolumeConfig = exports.crMiniNumberOfTradesConfig = exports.crMiniMomAthConfig = exports.crMiniMfiConfig = exports.crMiniHLConfig = exports.crMiniATHConfig = void 0;
var _seriaFn = require("../math/seriaFn");
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _indicatorBuilderFn = require("./indicatorBuilderFn");
var _Tooltip = require("./Tooltip");
var _Chart = require("./Chart");
var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));
const COLOR_MFI = "#90ed7d",
  COLOR_MOM = '#f7a35c',
  COLOR_CLOSE_OPEN = 'rgba(144, 237, 125, 0.75)',
  COLOR_HIGH_LOW = '#2d7474',
  COLOR_MEDIAN = 'darkcyan',
  COLOR_MEAN = '#f7a35c',
  CROSS_LABEL = {
    xDeltaCrossLabel: 4,
    yDeltaCrossLabel: -10
  };
const _crHighLowData = data => {
  const highData = [],
    lowData = [];
  let i;
  for (i = 0; i < data.length; i++) {
    const {
      x,
      high,
      low
    } = data[i];
    highData.push([x, high]);
    lowData.push([x, low]);
  }
  return [highData, lowData];
};
const _fCrSplineMiniConfig = (name, color) => _ref => {
  let {
    id,
    title,
    data
  } = _ref;
  return {
    btTitle: name,
    config: (0, _pipe.default)((0, _indicatorBuilderFn.crIndicatorConfig)({
      title: (0, _indicatorBuilderFn.crIndicatorTitle)(title || name),
      chartOption: CROSS_LABEL
    }), (0, _indicatorBuilderFn.fAssignToSeries)(0, {
      name,
      color,
      data,
      type: "spline",
      zhValueText: id,
      point: (0, _Chart.fEventsMouseOver)(_handleMouseOver.default)
    }))
  };
};
const crMiniMfiConfig = exports.crMiniMfiConfig = _fCrSplineMiniConfig("MFI", COLOR_MFI);
const _fCrSplineColumnMiniConfig = name => _ref2 => {
  let {
    btTitle = name,
    title,
    data,
    dColumn = [],
    tooltipColumn
  } = _ref2;
  const _title = title || btTitle,
    _hasColumn = dColumn.length !== 0,
    config = (0, _pipe.default)((0, _indicatorBuilderFn.crIndicatorConfig)({
      chartOption: CROSS_LABEL
    }), (0, _indicatorBuilderFn.fAssign)({
      title: (0, _indicatorBuilderFn.crIndicatorTitle)(_title),
      legend: (0, _indicatorBuilderFn.crLegendVolume)(_title)
    }), (0, _indicatorBuilderFn.fAssignToSeries)(0, {
      data,
      zhValueText: name,
      visible: !_hasColumn,
      name: "Spline",
      point: (0, _Chart.fEventsMouseOver)(_handleMouseOver.default)
    })),
    {
      series
    } = config;
  if (_hasColumn) {
    series.push({
      zhValueText: name,
      turboThreshold: 20000,
      type: "column",
      name: "Column",
      data: dColumn,
      borderWidth: 0,
      pointPlacement: 'on',
      groupPadding: 0.1,
      states: {
        hover: {
          enabled: true,
          brightness: 0.07
        }
      },
      tooltip: tooltipColumn || (0, _Chart.fTooltip)(_Tooltip.tooltipValueTdmyIf)
    });
    series.push((0, _indicatorBuilderFn.crIndicatorLineSeria)('Median', COLOR_MEDIAN, (0, _seriaFn.median)(data)));
    series.push((0, _indicatorBuilderFn.crIndicatorLineSeria)('Mean', COLOR_MEAN, (0, _seriaFn.mean)(data)));
  }
  return {
    btTitle,
    config
  };
};
const crMiniVolumeConfig = exports.crMiniVolumeConfig = _fCrSplineColumnMiniConfig("Volume");
const crMiniNumberOfTradesConfig = exports.crMiniNumberOfTradesConfig = _fCrSplineColumnMiniConfig("N of Trades");
const crMiniATHConfig = _ref3 => {
  let {
    btTitle = "ATH",
    data
  } = _ref3;
  const config = (0, _pipe.default)((0, _indicatorBuilderFn.crIndicatorConfig)({
    title: (0, _indicatorBuilderFn.crIndicatorTitle)('ATH')
  }), (0, _indicatorBuilderFn.fAddColumnSeria)({
    name: "ATH",
    borderWidth: 0,
    pointPlacement: 'on',
    minPointLength: 4,
    groupPadding: 0.1,
    data: data,
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipAth)
  }));
  return {
    btTitle,
    config
  };
};
exports.crMiniATHConfig = crMiniATHConfig;
const crMiniMomAthConfig = _ref4 => {
  let {
    dataMom,
    dataAth,
    dataSum
  } = _ref4;
  return (0, _pipe.default)((0, _indicatorBuilderFn.crIndicatorConfig)(), (0, _indicatorBuilderFn.fAssign)({
    title: (0, _indicatorBuilderFn.crIndicatorTitle)(),
    legend: (0, _indicatorBuilderFn.crLegendVolume)(),
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
        pointPlacement: 'on',
        pointPadding: 0,
        groupPadding: 0,
        turboThreshold: 20000,
        tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueDmy)
      }
    }
  }), (0, _indicatorBuilderFn.fAssignTo)('yAxis', {
    startOnTick: false,
    endOnTick: false,
    tickPixelInterval: 20
  }), (0, _indicatorBuilderFn.fAddColumnSeria)({
    zhValueText: "MOM(1)",
    name: "MOM(1)",
    color: COLOR_MOM,
    pointPadding: 0.3,
    data: dataMom
  }), (0, _indicatorBuilderFn.fAddColumnSeria)({
    name: "ATH",
    data: dataAth
  }), (0, _indicatorBuilderFn.fAddColumnSeria)({
    name: "Close-Open",
    color: COLOR_CLOSE_OPEN,
    visible: false,
    data: dataSum
  }));
};
exports.crMiniMomAthConfig = crMiniMomAthConfig;
const crMiniHLConfig = _ref5 => {
  let {
    btTitle = "Daily HighLow",
    data
  } = _ref5;
  const [highData, lowData] = _crHighLowData(data),
    config = (0, _pipe.default)((0, _indicatorBuilderFn.crIndicatorConfig)({
      title: (0, _indicatorBuilderFn.crIndicatorTitle)('HighLow')
    }), (0, _indicatorBuilderFn.fAssignToSeries)(0, {
      name: "H",
      type: "area",
      visible: true,
      color: COLOR_HIGH_LOW,
      fillColor: COLOR_HIGH_LOW,
      data: highData
    }), (0, _indicatorBuilderFn.fAssignToSeries)(1, {
      name: "L",
      type: "area",
      visible: true,
      color: COLOR_HIGH_LOW,
      fillColor: COLOR_HIGH_LOW,
      data: lowData,
      tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueTdmyIf)
    }));
  return {
    btTitle,
    config
  };
};
exports.crMiniHLConfig = crMiniHLConfig;
//# sourceMappingURL=crMiniConfigFn.js.map