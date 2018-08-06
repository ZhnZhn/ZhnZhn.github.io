'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _handleMouseOver = require('./handleMouseOver');

var _handleMouseOver2 = _interopRequireDefault(_handleMouseOver);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  MFI: "#90ed7d",

  MOM: '#f7a35c',
  CLOSE_OPEN: 'rgba(144, 237, 125, 0.75)',

  HIGH_LOW: '#2D7474'
};

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

var _addColumnSeria = function _addColumnSeria(config, option) {
  var series = config.series,
      _seria = Object.assign({
    type: "column",
    visible: true,
    tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnBasePointFormatter)
  }, option);

  if (!series[0].data) {
    Object.assign(config.series[0], _seria);
  } else {
    series.push(_seria);
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
      tickPixelInterval: 60,
      offset: 4,
      lineWidth: 0,
      tickLength: 0,
      labels: {
        x: 8,
        y: 5
      }
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
      name: "MFI",
      type: "spline",
      color: C.MFI,
      point: _Chart2.default.fEventsMouseOver(_handleMouseOver2.default)
    });
    return config;
  },
  fMiniVolumeConfig: function fMiniVolumeConfig(_ref) {
    var _ref$btTitle = _ref.btTitle,
        btTitle = _ref$btTitle === undefined ? 'Volume' : _ref$btTitle,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? 'id' : _ref$id,
        _ref$dColumn = _ref.dColumn,
        dColumn = _ref$dColumn === undefined ? [] : _ref$dColumn,
        dVolume = _ref.dVolume,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title,
        tooltipColumn = _ref.tooltipColumn;

    var config = this.fBaseIndicatorConfig();
    Object.assign(config, {
      title: _Chart2.default.fTitleIndicator('Volume: ' + title),
      legend: _legendVolume
    });
    _configCrossLabel(config.chart);
    Object.assign(config.yAxis, {
      endOnTick: false,
      tickPixelInterval: 40
    });
    Object.assign(config.series[0], {
      zhSeriaId: id + '_VolumeArea',
      zhValueText: "Volume",
      data: dVolume,
      name: "Spline",
      point: _Chart2.default.fEventsMouseOver(_handleMouseOver2.default)
    });
    if (dColumn.length !== 0) {
      config.series.push({
        zhSeriaId: id + '_VolumeColumn',
        zhValueText: "Volume",
        turboThreshold: 20000,
        type: "column",
        name: "Column",
        data: dColumn,
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
        tooltip: tooltipColumn || _Chart2.default.fTooltip(_Tooltip2.default.volume)
      });
    }

    return {
      btTitle: btTitle, config: config
    };
  },
  fMiniATHConfig: function fMiniATHConfig(_ref2) {
    var _ref2$btTitle = _ref2.btTitle,
        btTitle = _ref2$btTitle === undefined ? "ATH" : _ref2$btTitle,
        id = _ref2.id,
        data = _ref2.data;

    var config = this.fBaseIndicatorConfig();
    config.title = _Chart2.default.fTitleIndicator('ATH');

    _addColumnSeria(config, {
      zhSeriaId: id + "_ATH",
      name: "ATH",
      borderWidth: 0,
      pointPlacement: 'on',
      minPointLength: 4,
      groupPadding: 0.1,
      data: data,
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.ath)
    });

    return { btTitle: btTitle, config: config };
  },
  fnMomAthConfig: function fnMomAthConfig(dataMom, dataAth, dataSum, id) {
    var config = this.fBaseIndicatorConfig();
    Object.assign(config, {
      title: _Chart2.default.fTitleIndicator(''),
      legend: _legendVolume,
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0,
          pointPlacement: 'on',
          pointPadding: 0,
          groupPadding: 0,
          turboThreshold: 20000,
          tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnBasePointFormatter)
        }
      }
    });
    _addColumnSeria(config, {
      zhSeriaId: id + "_MOM",
      zhValueText: "MOM(1)",
      name: "MOM(1)",
      color: C.MOM,
      pointPadding: 0.3,
      data: dataMom
    });
    _addColumnSeria(config, {
      zhSeriaId: id + "_ATH",
      name: "ATH",
      data: dataAth
    });
    _addColumnSeria(config, {
      zhSeriaId: id + "_CLOSE_OPEN",
      name: "Close-Open",
      color: C.CLOSE_OPEN,
      visible: false,
      data: dataSum
    });

    Object.assign(config.yAxis, {
      startOnTick: false,
      endOnTick: false,
      tickPixelInterval: 20
    });
    return config;
  },
  fMiniHLConfig: function fMiniHLConfig(_ref3) {
    var _ref3$btTitle = _ref3.btTitle,
        btTitle = _ref3$btTitle === undefined ? "Daily HighLow" : _ref3$btTitle,
        _ref3$id = _ref3.id,
        id = _ref3$id === undefined ? 'id' : _ref3$id,
        data = _ref3.data;

    var config = this.fBaseIndicatorConfig();
    config.title = _Chart2.default.fTitleIndicator('HighLow');

    Object.assign(config.series[0], {
      zhSeriaId: id + '_HL',
      name: "HL",
      visible: true,
      type: "arearange",
      color: C.HIGH_LOW,
      data: data,
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.hl)
    });

    return { btTitle: btTitle, config: config };
  }
};

exports.default = WithIndicatorConfig;
//# sourceMappingURL=WithIndicatorConfig.js.map