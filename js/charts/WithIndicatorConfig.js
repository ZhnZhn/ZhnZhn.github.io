"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var median = _seriaFn["default"].median,
    mean = _seriaFn["default"].mean;
var C = {
  MFI: "#90ed7d",
  MOM: '#f7a35c',
  CLOSE_OPEN: 'rgba(144, 237, 125, 0.75)',
  HIGH_LOW: '#2D7474',
  MEDIAN: 'darkcyan',
  MEAN: '#f7a35c',
  DF_LEGEND_VOLUME_X: 84,
  CROSS_LABEL: {
    xDeltaCrossLabel: 4,
    yDeltaCrossLabel: -10
  }
};
var _assign = Object.assign;

var _crTitle = function _crTitle(text) {
  if (text === void 0) {
    text = '';
  }

  return {
    text: _dompurify["default"].sanitize(text || ''),
    style: {
      color: _Color["default"].METRIC_TITLE,
      fontSize: '16px',
      fontWeight: 'bold'
    },
    floating: true,
    align: 'left',
    verticalAlign: 'top',
    x: 8,
    y: 15
  };
};

var _crLegendVolume = function _crLegendVolume(titleOrX) {
  if (titleOrX === void 0) {
    titleOrX = C.DF_LEGEND_VOLUME_X;
  }

  var _x = typeof titleOrX === 'number' ? titleOrX : titleOrX.length * 10 + 8;

  return {
    enabled: true,
    align: 'left',
    verticalAlign: 'top',
    x: _x,
    y: -8,
    floating: true,
    symbolHeight: 12,
    symbolWidth: 12,
    symbolRadius: 6,
    itemStyle: {
      color: _Color["default"].CHART_TITLE,
      fontSize: '16px'
    },
    itemHoverStyle: {
      color: _Color["default"].LEGEND_ITEM_HOVER
    },
    itemHiddenStyle: {
      color: _Color["default"].LEGEND_ITEM_HIDDEN
    }
  };
};

var _crLineSeria = function _crLineSeria(name, color, data) {
  return {
    zhValueText: name,
    type: "line",
    color: color,
    lineWidth: 2,
    data: data,
    name: name,
    visible: false,
    marker: {
      enabled: false
    }
  };
};

var _crColumnSeria = function _crColumnSeria(option) {
  return _assign({
    type: "column",
    visible: true,
    tooltip: _Chart["default"].fTooltip(_Tooltip["default"].vDmy)
  }, option);
};

function _Builder(config) {
  if (!(this instanceof _Builder)) {
    return new _Builder(config);
  }

  this.config = config;
}

_Builder.prototype = _assign(_Builder.prototype, {
  assign: function assign(option) {
    _assign(this.config, option);

    return this;
  },
  assignTo: function assignTo(propName, option) {
    var _to = this.config[propName];

    if (!_to) {
      this.config[propName] = option;
    } else {
      _assign(_to, option);
    }

    return this;
  },
  assignToSeries: function assignToSeries(index, option) {
    _assign(this.config.series[index], option);

    return this;
  },
  addColumnSeria: function addColumnSeria(option) {
    var config = this.config,
        series = config.series,
        _seria = _crColumnSeria(option);

    if (!series[0].data) {
      _assign(series[0], _seria);
    } else {
      series.push(_seria);
    }

    return this;
  },
  toConfig: function toConfig() {
    return this.config;
  }
});

var _crConfig = function _crConfig(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      title = _ref.title,
      _ref$chartOption = _ref.chartOption,
      chartOption = _ref$chartOption === void 0 ? {} : _ref$chartOption;

  return _Builder(_Chart["default"].crAreaConfig({
    title: title
  })).assignTo('navigation', {
    buttonOptions: {
      y: 20
    },
    menuStyle: {
      position: 'relative',
      top: '-24px',
      left: '28px'
    }
  }).assignTo('chart', (0, _extends2["default"])({
    height: 160,
    spacingTop: 8,
    spacingBottom: 10
  }, chartOption)).assignTo('yAxis', {
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
  }).toConfig();
};

var WithIndicatorConfig = {
  crMfiConfig: function crMfiConfig(id, title, data) {
    return _Builder(_crConfig({
      title: _crTitle(title),
      chartOption: C.CROSS_LABEL
    })).assignToSeries(0, {
      zhValueText: id,
      data: data,
      name: "MFI",
      type: "spline",
      color: C.MFI,
      point: _Chart["default"].fEventsMouseOver(_handleMouseOver["default"])
    }).toConfig();
  },
  crMiniVolumeConfig: function crMiniVolumeConfig(_ref2) {
    var _ref2$btTitle = _ref2.btTitle,
        btTitle = _ref2$btTitle === void 0 ? 'Volume' : _ref2$btTitle,
        title = _ref2.title,
        _ref2$dColumn = _ref2.dColumn,
        dColumn = _ref2$dColumn === void 0 ? [] : _ref2$dColumn,
        dVolume = _ref2.dVolume,
        tooltipColumn = _ref2.tooltipColumn;

    var _title = title || btTitle,
        _hasColumn = dColumn.length !== 0,
        config = _Builder(_crConfig({
      chartOption: C.CROSS_LABEL
    })).assign({
      title: _crTitle(_title),
      legend: _crLegendVolume(_title)
    }).assignToSeries(0, {
      zhValueText: "Volume",
      data: dVolume,
      visible: !_hasColumn,
      name: "Spline",
      point: _Chart["default"].fEventsMouseOver(_handleMouseOver["default"])
    }).toConfig(),
        series = config.series;

    if (_hasColumn) {
      series.push({
        zhValueText: "Volume",
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
        tooltip: tooltipColumn || _Chart["default"].fTooltip(_Tooltip["default"].volumeTdmyIf)
      });
      series.push(_crLineSeria('Median', C.MEDIAN, median(dVolume)));
      series.push(_crLineSeria('Mean', C.MEAN, mean(dVolume)));
    }

    return {
      btTitle: btTitle,
      config: config
    };
  },
  crMiniATHConfig: function crMiniATHConfig(_ref3) {
    var _ref3$btTitle = _ref3.btTitle,
        btTitle = _ref3$btTitle === void 0 ? "ATH" : _ref3$btTitle,
        data = _ref3.data;

    var config = _Builder(_crConfig({
      title: _crTitle('ATH')
    })).addColumnSeria({
      name: "ATH",
      borderWidth: 0,
      pointPlacement: 'on',
      minPointLength: 4,
      groupPadding: 0.1,
      data: data,
      tooltip: _Chart["default"].fTooltip(_Tooltip["default"].ath)
    }).toConfig();

    return {
      btTitle: btTitle,
      config: config
    };
  },
  crMomAthConfig: function crMomAthConfig(_ref4) {
    var dataMom = _ref4.dataMom,
        dataAth = _ref4.dataAth,
        dataSum = _ref4.dataSum;
    return _Builder(_crConfig()).assign({
      title: _crTitle(),
      legend: _crLegendVolume(),
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0,
          pointPlacement: 'on',
          pointPadding: 0,
          groupPadding: 0,
          turboThreshold: 20000,
          tooltip: _Chart["default"].fTooltip(_Tooltip["default"].vDmy)
        }
      }
    }).assignTo('yAxis', {
      startOnTick: false,
      endOnTick: false,
      tickPixelInterval: 20
    }).addColumnSeria({
      zhValueText: "MOM(1)",
      name: "MOM(1)",
      color: C.MOM,
      pointPadding: 0.3,
      data: dataMom
    }).addColumnSeria({
      name: "ATH",
      data: dataAth
    }).addColumnSeria({
      name: "Close-Open",
      color: C.CLOSE_OPEN,
      visible: false,
      data: dataSum
    }).toConfig();
  },
  crMiniHLConfig: function crMiniHLConfig(_ref5) {
    var _ref5$btTitle = _ref5.btTitle,
        btTitle = _ref5$btTitle === void 0 ? "Daily HighLow" : _ref5$btTitle,
        data = _ref5.data;

    var config = _Builder(_crConfig({
      title: _crTitle('HighLow')
    })).assignToSeries(0, {
      name: "HL",
      visible: true,
      type: "arearange",
      color: C.HIGH_LOW,
      data: data,
      tooltip: _Chart["default"].fTooltip(_Tooltip["default"].hl)
    }).toConfig();

    return {
      btTitle: btTitle,
      config: config
    };
  }
};
var _default = WithIndicatorConfig;
exports["default"] = _default;
//# sourceMappingURL=WithIndicatorConfig.js.map