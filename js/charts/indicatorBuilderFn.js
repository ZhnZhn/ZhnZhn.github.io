"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fAssignToSeries = exports.fAssignTo = exports.fAssign = exports.fAddColumnSeria = exports.crLegendVolume = exports.crIndicatorTitle = exports.crIndicatorLineSeria = exports.crIndicatorConfig = void 0;
var _domFn = require("../utils/domFn");
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _Chart = require("./Chart");
var _Tooltip = require("./Tooltip");
var _Color = require("../constants/Color");
const DF_LEGEND_VOLUME_X = 84;
const _assign = Object.assign;
const _crColumnSeria = option => _assign({
  type: "column",
  visible: true,
  tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueDmy)
}, option);
const crIndicatorTitle = text => ({
  text: (0, _domFn.domSanitize)(text),
  style: {
    color: _Color.COLOR_METRIC_TITLE,
    fontSize: '16px',
    fontWeight: 'bold'
  },
  floating: true,
  align: 'left',
  verticalAlign: 'top',
  x: 8,
  y: 15
});
exports.crIndicatorTitle = crIndicatorTitle;
const _crLegendVolumeX = titleOrX => typeof titleOrX === 'number' ? titleOrX : titleOrX.length * 10 + 8;
const crLegendVolume = function (titleOrX) {
  if (titleOrX === void 0) {
    titleOrX = DF_LEGEND_VOLUME_X;
  }
  return {
    enabled: true,
    align: 'left',
    verticalAlign: 'top',
    x: _crLegendVolumeX(titleOrX),
    y: -8,
    floating: true,
    symbolHeight: 12,
    symbolWidth: 12,
    symbolRadius: 6,
    itemStyle: {
      color: _Color.COLOR_CHART_TITLE,
      fontSize: '16px'
    },
    itemHoverStyle: {
      color: _Color.COLOR_LEGEND_ITEM_HOVER
    },
    itemHiddenStyle: {
      color: _Color.COLOR_LEGEND_ITEM_HIDDEN
    }
  };
};
exports.crLegendVolume = crLegendVolume;
const crIndicatorLineSeria = (name, color, data) => ({
  name,
  color,
  data,
  zhValueText: name,
  type: "line",
  lineWidth: 2,
  visible: false,
  marker: {
    enabled: false
  }
});
exports.crIndicatorLineSeria = crIndicatorLineSeria;
const fAssign = option => config => _assign(config, option);
exports.fAssign = fAssign;
const fAssignTo = (propName, option) => config => {
  const _to = config[propName];
  if (!_to) {
    config[propName] = option;
  } else {
    _assign(_to, option);
  }
  return config;
};
exports.fAssignTo = fAssignTo;
const fAssignToSeries = (index, option) => config => {
  config.series[index] = _assign({}, config.series[index], option);
  return config;
};
exports.fAssignToSeries = fAssignToSeries;
const fAddColumnSeria = option => config => {
  const {
      series
    } = config,
    _seria = _crColumnSeria(option);
  if (!series[0].data) {
    _assign(series[0], _seria);
  } else {
    series.push(_seria);
  }
  return config;
};
exports.fAddColumnSeria = fAddColumnSeria;
const crIndicatorConfig = function (_temp) {
  let {
    title,
    chartOption
  } = _temp === void 0 ? {} : _temp;
  return (0, _pipe.default)((0, _Chart.crAreaConfig)({
    title
  }), fAssignTo('navigation', {
    buttonOptions: {
      y: 20
    },
    menuStyle: {
      position: 'relative',
      top: '-24px',
      left: '28px'
    }
  }), fAssignTo('chart', {
    height: 160,
    spacingTop: 8,
    spacingBottom: 10,
    ...chartOption
  }), fAssignTo('xAxis', {
    labels: {
      y: 16
    }
  }), fAssignTo('yAxis', {
    startOnTick: true,
    endOnTick: true,
    tickPixelInterval: 60,
    offset: 4,
    lineWidth: 0,
    labels: {
      x: 8,
      y: 5
    }
  }));
};
exports.crIndicatorConfig = crIndicatorConfig;
//# sourceMappingURL=indicatorBuilderFn.js.map