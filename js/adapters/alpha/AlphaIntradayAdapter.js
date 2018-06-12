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

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdhmsToUTC = _AdapterFn2.default.ymdhmsToUTC,
    volumeColumnPoint = _AdapterFn2.default.volumeColumnPoint;
var crIntradayConfigOption = _fnAdapter2.default.crIntradayConfigOption;


var C = {
  TIME_START_DAY: '09:30:00',
  TIME_CLOSE_DAY: '16:00:00',

  START_DAY: "#90ed7d",
  CLOSE_DAY: "#f7a35c",
  CLOSE: "#2f7ed8",
  HIGH: "#4caf50",
  LOW: "#f44336",
  OPEN: "#90ed7d"
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
  } else if (date.indexOf(C.TIME_CLOSE_DAY) !== -1) {
    marker = _fMarker(C.CLOSE_DAY);
    color = C.CLOSE_DAY;
  }
  return { marker: marker, color: color };
};

var _crSeriaData = function _crSeriaData(json, option, config, chartId) {
  var interval = option.interval,
      _propName = 'Time Series (' + interval + ')',
      _value = json[_propName],
      _dateKeys = _value ? Object.keys(_value).sort() : [],
      _data = [],
      _dataVolume = [],
      _dataVolumeColumn = [],
      _dataHigh = [],
      _dataLow = [],
      _dataOpen = [];

  var i = 0,
      _max = _dateKeys.length,
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

    _dateMs = ymdhmsToUTC(_date);
    _data.push((0, _extends3.default)({
      x: _dateMs, y: _close }, _fMarkerColor(_date)));

    _dataHigh.push([_dateMs, _high]);
    _dataLow.push([_dateMs, _low]);
    _dataOpen.push([_dateMs, _open]);

    _dataVolume.push([_dateMs, _volume]);
    _dataVolumeColumn.push(volumeColumnPoint({
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

  return {
    data: _data,
    dVolume: _dataVolume,
    dColumn: _dataVolumeColumn
  };
};

var _toDataDaily = function _toDataDaily(data) {
  return data.filter(function (p) {
    return p.color === C.CLOSE_DAY;
  });
};

var AlphaIntradayAdapter = {
  toConfig: function toConfig(json, option) {
    var baseConfig = _ChartConfig2.default.fBaseAreaConfig(),
        value = option.value,
        interval = option.interval,
        _chartId = value,
        _crSeriaData2 = _crSeriaData(json, option, baseConfig, _chartId),
        data = _crSeriaData2.data,
        dColumn = _crSeriaData2.dColumn,
        dVolume = _crSeriaData2.dVolume,
        _dataDaily = _toDataDaily(data);


    var config = (0, _ConfigBuilder2.default)().init(baseConfig).add('chart', { spacingTop: 25 }).addCaption(value, 'Time Series (' + interval + ')').addTooltip(_Tooltip2.default.fnBasePointFormatterT).add((0, _extends3.default)({}, crIntradayConfigOption({
      id: _chartId,
      data: _dataDaily
    }))).addMiniVolume({
      id: _chartId,
      dVolume: dVolume, dColumn: dColumn,
      tooltipColumn: _Chart2.default.fTooltip(_Tooltip2.default.fnVolumePointFormatterT)
    }).toConfig();

    return {
      config: config,
      isDrawDeltaExtrems: false,
      isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {
    throw new Error('ZH_1000');
  }
};

exports.default = AlphaIntradayAdapter;
//# sourceMappingURL=AlphaIntradayAdapter.js.map