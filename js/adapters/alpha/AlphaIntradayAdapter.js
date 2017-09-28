'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _IndicatorSma = require('../IndicatorSma');

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  TIME_START_DAY: '09:30:00',
  TIME_END_DAY: '16:00:00',

  START_DAY: "#90ed7d",
  END_DAY: "#f7a35c",
  CLOSE: "#2f7ed8",
  HIGH: "#4caf50",
  LOW: "#f44336",
  OPEN: "#90ed7d"
};

var _crZhConfig = function _crZhConfig(id) {
  return {
    id: id,
    key: id,
    isWithLegend: true,
    legend: _AdapterFn2.default.stockSeriesLegend(),
    dataSource: "Alpha Vantage"
  };
};

var _fMarker = function _fMarker(color) {
  return {
    radius: 3,
    enabled: true,
    fillColor: color
  };
};

var _fMarkerColor = function _fMarkerColor(date) {
  var marker = void 0,
      color = void 0;
  if (date.indexOf(C.TIME_START_DAY) !== -1) {
    marker = _fMarker(C.START_DAY);
    color = C.START_DAY;
  } else if (date.indexOf(C.TIME_END_DAY) !== -1) {
    marker = _fMarker(C.END_DAY);
    color = C.END_DAY;
  } else {
    marker = undefined;
    color = undefined;
  }
  return { marker: marker, color: color };
};

var _createSeriaData = function _createSeriaData(json, option, config, chartId) {
  var interval = option.interval,
      _propName = 'Time Series (' + interval + ')',
      _value = json[_propName],
      _dateKeys = _value ? Object.keys(_value).sort() : [];

  var i = 0,
      _max = _dateKeys.length,
      _data = [],
      _dataVolume = [],
      _dataVolumeColumn = [],
      _dataHigh = [],
      _dataLow = [],
      _dataOpen = [],
      _minClose = Number.POSITIVE_INFINITY,
      _maxClose = Number.NEGATIVE_INFINITY,
      _dateMs = void 0,
      _date = void 0,
      _point = void 0,
      _open = void 0,
      _high = void 0,
      _low = void 0,
      _close = void 0,
      _volume = void 0;
  for (i; i < _max; i++) {
    _date = _dateKeys[i];
    _point = _value[_date];
    _open = parseFloat(_point['1. open']);
    _high = parseFloat(_point['2. high']);
    _low = parseFloat(_point['3. low']);
    _close = parseFloat(_point['4. close']);
    _volume = parseFloat(_point['5. volume']);

    _dateMs = _AdapterFn2.default.ymdhmsToUTC(_date);
    _data.push((0, _extends3.default)({
      x: _dateMs, y: _close }, _fMarkerColor(_date)));

    _dataHigh.push([_dateMs, _high]);
    _dataLow.push([_dateMs, _low]);
    _dataOpen.push([_dateMs, _open]);

    _dataVolume.push([_dateMs, _volume]);
    _dataVolumeColumn.push(_AdapterFn2.default.volumeColumnPoint({
      open: _open, close: _close, volume: _volume,
      date: _dateMs,
      option: { _high: _high, _low: _low }
    }));

    if (_minClose > _close) {
      _minClose = _close;
    }
    if (_maxClose < _close) {
      _maxClose = _close;
    }
  }

  _ChartConfig2.default.setStockSerias(config, _data, _dataHigh, _dataLow, _dataOpen, chartId);
  _ChartConfig2.default.setMinMax(config, _minClose, _maxClose);

  Object.assign(config, {
    zhVolumeConfig: _ChartConfig2.default.fIndicatorVolumeConfig(option.value, _dataVolumeColumn, _dataVolume)
  });
  config.zhVolumeConfig.series[1].tooltip = _Chart2.default.fTooltip(_Tooltip2.default.fnVolumePointFormatterT);
};

var AlphaIntradayAdapter = {
  toConfig: function toConfig(json, option) {
    var baseConfig = _ChartConfig2.default.fBaseAreaConfig(),
        value = option.value,
        interval = option.interval,
        _chartId = value;


    _createSeriaData(json, option, baseConfig, _chartId);

    var config = (0, _ConfigBuilder2.default)().init(baseConfig).add('chart', { spacingTop: 25 }).addCaption(value, 'Time Series (' + interval + ')').addTooltip(_Tooltip2.default.fnBasePointFormatterT).add('zhConfig', _crZhConfig()).add('zhFnAddSeriesSma', _IndicatorSma.fnAddSeriesSma).add('zhFnRemoveSeries', _IndicatorSma.fnRemoveSeries).toConfig();

    return {
      config: config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {}
};

exports.default = AlphaIntradayAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\AlphaIntradayAdapter.js.map