"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crMomAthConfig = exports.crMiniVolumeConfig = exports.crMiniHLConfig = exports.crMiniATHConfig = exports.crMfiConfig = void 0;

var _dompurify = _interopRequireDefault(require("dompurify"));

var _Tooltip = require("./Tooltip");

var _Chart = require("./Chart");

var _seriaFn = require("../math/seriaFn");

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

var _Color = _interopRequireDefault(require("../constants/Color"));

const COLOR_MFI = "#90ed7d",
      COLOR_MOM = '#f7a35c',
      COLOR_CLOSE_OPEN = 'rgba(144, 237, 125, 0.75)',
      COLOR_HIGH_LOW = '#2d7474',
      COLOR_MEDIAN = 'darkcyan',
      COLOR_MEAN = '#f7a35c',
      DF_LEGEND_VOLUME_X = 84,
      CROSS_LABEL = {
  xDeltaCrossLabel: 4,
  yDeltaCrossLabel: -10
};
const _assign = Object.assign;

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

const _crTitle = text => ({
  text: _dompurify.default.sanitize(text || ''),
  style: {
    color: _Color.default.METRIC_TITLE,
    fontSize: '16px',
    fontWeight: 'bold'
  },
  floating: true,
  align: 'left',
  verticalAlign: 'top',
  x: 8,
  y: 15
});

const _crLegendVolume = function (titleOrX) {
  if (titleOrX === void 0) {
    titleOrX = DF_LEGEND_VOLUME_X;
  }

  const _x = typeof titleOrX === 'number' ? titleOrX : titleOrX.length * 10 + 8;

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
      color: _Color.default.CHART_TITLE,
      fontSize: '16px'
    },
    itemHoverStyle: {
      color: _Color.default.LEGEND_ITEM_HOVER
    },
    itemHiddenStyle: {
      color: _Color.default.LEGEND_ITEM_HIDDEN
    }
  };
};

const _crLineSeria = (name, color, data) => ({
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

const _crColumnSeria = option => _assign({
  type: "column",
  visible: true,
  tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueDmy)
}, option);

function _Builder(config) {
  if (!(this instanceof _Builder)) {
    return new _Builder(config);
  }

  this.config = config;
}

_Builder.prototype = _assign(_Builder.prototype, {
  assign(option) {
    _assign(this.config, option);

    return this;
  },

  assignTo(propName, option) {
    const _to = this.config[propName];

    if (!_to) {
      this.config[propName] = option;
    } else {
      _assign(_to, option);
    }

    return this;
  },

  assignToSeries(index, option) {
    this.config.series[index] = _assign({}, this.config.series[index], option);
    return this;
  },

  addColumnSeria(option) {
    const {
      config
    } = this,
          {
      series
    } = config,
          _seria = _crColumnSeria(option);

    if (!series[0].data) {
      _assign(series[0], _seria);
    } else {
      series.push(_seria);
    }

    return this;
  },

  toConfig() {
    return this.config;
  }

});

const _crConfig = function (_temp) {
  let {
    title,
    chartOption
  } = _temp === void 0 ? {} : _temp;
  return _Builder((0, _Chart.crAreaConfig)({
    title
  })).assignTo('navigation', {
    buttonOptions: {
      y: 20
    },
    menuStyle: {
      position: 'relative',
      top: '-24px',
      left: '28px'
    }
  }).assignTo('chart', {
    height: 160,
    spacingTop: 8,
    spacingBottom: 10,
    ...chartOption
  }).assignTo('yAxis', {
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

const crMfiConfig = (id, title, data) => _Builder(_crConfig({
  title: _crTitle(title),
  chartOption: CROSS_LABEL
})).assignToSeries(0, {
  name: "MFI",
  type: "spline",
  color: COLOR_MFI,
  zhValueText: id,
  data: data,
  point: (0, _Chart.fEventsMouseOver)(_handleMouseOver.default)
}).toConfig();

exports.crMfiConfig = crMfiConfig;

const crMiniVolumeConfig = _ref => {
  let {
    btTitle = 'Volume',
    title,
    dColumn = [],
    dVolume,
    tooltipColumn
  } = _ref;

  const _title = title || btTitle,
        _hasColumn = dColumn.length !== 0,
        config = _Builder(_crConfig({
    chartOption: CROSS_LABEL
  })).assign({
    title: _crTitle(_title),
    legend: _crLegendVolume(_title)
  }).assignToSeries(0, {
    zhValueText: "Volume",
    data: dVolume,
    visible: !_hasColumn,
    name: "Spline",
    point: (0, _Chart.fEventsMouseOver)(_handleMouseOver.default)
  }).toConfig(),
        {
    series
  } = config;

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
      tooltip: tooltipColumn || (0, _Chart.fTooltip)(_Tooltip.tooltipVolumeTdmyIf)
    });
    series.push(_crLineSeria('Median', COLOR_MEDIAN, (0, _seriaFn.median)(dVolume)));
    series.push(_crLineSeria('Mean', COLOR_MEAN, (0, _seriaFn.mean)(dVolume)));
  }

  return {
    btTitle,
    config
  };
};

exports.crMiniVolumeConfig = crMiniVolumeConfig;

const crMiniATHConfig = _ref2 => {
  let {
    btTitle = "ATH",
    data
  } = _ref2;

  const config = _Builder(_crConfig({
    title: _crTitle('ATH')
  })).addColumnSeria({
    name: "ATH",
    borderWidth: 0,
    pointPlacement: 'on',
    minPointLength: 4,
    groupPadding: 0.1,
    data: data,
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipAth)
  }).toConfig();

  return {
    btTitle,
    config
  };
};

exports.crMiniATHConfig = crMiniATHConfig;

const crMomAthConfig = _ref3 => {
  let {
    dataMom,
    dataAth,
    dataSum
  } = _ref3;
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
        tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueDmy)
      }
    }
  }).assignTo('yAxis', {
    startOnTick: false,
    endOnTick: false,
    tickPixelInterval: 20
  }).addColumnSeria({
    zhValueText: "MOM(1)",
    name: "MOM(1)",
    color: COLOR_MOM,
    pointPadding: 0.3,
    data: dataMom
  }).addColumnSeria({
    name: "ATH",
    data: dataAth
  }).addColumnSeria({
    name: "Close-Open",
    color: COLOR_CLOSE_OPEN,
    visible: false,
    data: dataSum
  }).toConfig();
};

exports.crMomAthConfig = crMomAthConfig;

const crMiniHLConfig = _ref4 => {
  let {
    btTitle = "Daily HighLow",
    data
  } = _ref4;

  const [highData, lowData] = _crHighLowData(data),
        config = _Builder(_crConfig({
    title: _crTitle('HighLow')
  })).assignToSeries(0, {
    name: "H",
    type: "area",
    visible: true,
    color: COLOR_HIGH_LOW,
    fillColor: COLOR_HIGH_LOW,
    data: highData
  }).assignToSeries(1, {
    name: "L",
    type: "area",
    visible: true,
    color: COLOR_HIGH_LOW,
    fillColor: COLOR_HIGH_LOW,
    data: lowData,
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueTdmyIf)
  }).toConfig();

  return {
    btTitle,
    config
  };
};

exports.crMiniHLConfig = crMiniHLConfig;
//# sourceMappingURL=IndicatorConfigFn.js.map