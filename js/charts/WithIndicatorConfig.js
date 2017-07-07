'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _configCrossLabel = function _configCrossLabel(chart, option) {
  Object.assign(chart, {
    xDeltaCrossLabel: 4,
    yDeltaCrossLabel: -10
  }, option);
};

var _legendVolume = {
  enabled: true,
  align: 'left',
  verticalAlign: 'top',
  x: 124,
  y: -8,
  floating: true,

  symbolHeight: 12,
  symbolWidth: 12,
  symbolRadius: 6,

  itemStyle: {
    color: _Color2.default.CHART_TITLE,
    fontSize: '16px'
  },
  itemHoverStyle: {
    color: _Color2.default.LEGEND_ITEM_HOVER
  },
  itemHiddenStyle: {
    color: _Color2.default.LEGEND_ITEM_HIDDEN
  }
};

var WithIndicatorConfig = {
  fBaseIndicatorConfig: function fBaseIndicatorConfig() {
    var config = _Chart2.default.fBaseConfig(),
        chart = config.chart,
        yAxis = config.yAxis;


    config.navigation = {
      buttonOptions: {
        y: 20
      },
      menuStyle: {
        position: 'relative',
        top: '-24px',
        left: '28px'
      }
    };
    Object.assign(chart, {
      height: 160,
      spacingTop: 8,
      spacingBottom: 10
    });
    Object.assign(yAxis, {
      startOnTick: true,
      endOnTick: true,
      tickPixelInterval: 60
    });
    return config;
  },
  fIndicatorMfiConfig: function fIndicatorMfiConfig(id, parentId, title, data) {
    var config = this.fBaseIndicatorConfig();
    config.title = _Chart2.default.fTitleIndicator(title);
    _configCrossLabel(config.chart);
    Object.assign(config.series[0], {
      zhSeriaId: parentId + '_' + id,
      zhValueText: id,
      data: data,
      name: "Spline",
      type: "spline",
      color: "#90ed7d",
      point: _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint)
    });
    return config;
  },
  fIndicatorVolumeConfig: function fIndicatorVolumeConfig(chartId, dataColumn, data) {
    var config = this.fBaseIndicatorConfig();
    Object.assign(config, {
      title: _Chart2.default.fTitleIndicator('Volume Chart:'),
      legend: _legendVolume
    });
    _configCrossLabel(config.chart);
    Object.assign(config.yAxis, {
      endOnTick: false,
      tickPixelInterval: 40
    });
    Object.assign(config.series[0], {
      zhSeriaId: chartId + '_VolumeArea',
      zhValueText: "Volume",
      data: data,
      name: "Spline",
      point: _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint)
    });
    config.series.push({
      zhSeriaId: chartId + '_VolumeColumn',
      zhValueText: "Volume",
      turboThreshold: 20000,
      type: "column",
      name: "Column",
      data: dataColumn,

      visible: false,
      borderWidth: 0,
      pointPlacement: 'on',
      groupPadding: 0.1,
      states: {
        hover: {
          enabled: true,
          brightness: 0.07
        }
      },
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnVolumePointFormatter)
    });

    return config;
  },
  fIndicatorATHConfig: function fIndicatorATHConfig(chartId, data) {
    var config = this.fBaseIndicatorConfig();
    config.title = _Chart2.default.fTitleIndicator('ATH Chart');

    Object.assign(config.series[0], {
      zhSeriaId: chartId + "_ATH",
      zhValueText: "ATH",
      name: "ATH",
      visible: true,
      type: "column",
      borderWidth: 0,
      pointPlacement: 'on',
      minPointLength: 4,
      groupPadding: 0.1,
      data: data,
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnATHPointFormatter)
    });

    return config;
  },
  fIndicatorHighLowConfig: function fIndicatorHighLowConfig(chartId, data) {
    var config = this.fBaseIndicatorConfig();
    config.title = _Chart2.default.fTitleIndicator('HighLow Chart');

    Object.assign(config.series[0], {
      zhSeriaId: chartId + '_HL',
      zhValueText: "HL",
      name: "HL",
      visible: true,
      type: "arearange",
      color: '#2D7474',
      data: data,
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnHighLowPointFormatter)
    });

    return config;
  }
};

exports.default = WithIndicatorConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\WithIndicatorConfig.js.map