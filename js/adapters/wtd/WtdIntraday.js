"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _IntradayFns = _interopRequireDefault(require("../IntradayFns"));

var ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    volumeColumnPoint = _AdapterFn["default"].volumeColumnPoint,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend,
    valueMoving = _AdapterFn["default"].valueMoving;
var crMarkerColor = _IntradayFns["default"].crMarkerColor,
    crDataVm = _IntradayFns["default"].crDataVm;

var _crSeriaData = function _crSeriaData(json, option, config, chartId) {
  var _value = json.intraday,
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
      _dateMs,
      _strDate,
      _point,
      _open,
      _high,
      _low,
      _closeV,
      _close,
      _volume;

  for (i; i < _max; i++) {
    _strDate = _dateKeys[i];
    _point = _value[_strDate];
    _closeV = parseFloat(_point['close']);
    _close = parseFloat(_point['close']);
    _open = parseFloat(_point['open']);
    _high = parseFloat(_point['high']);
    _low = parseFloat(_point['low']);
    _volume = parseFloat(_point['volume']);
    _dateMs = ymdhmsToUTC(_strDate);

    _data.push((0, _extends2["default"])({
      x: _dateMs,
      y: _close
    }, crMarkerColor(_strDate)));

    _dataHigh.push([_dateMs, _high]);

    _dataLow.push([_dateMs, _low]);

    _dataOpen.push([_dateMs, _open]);

    _dataVolume.push([_dateMs, _volume]);

    _dataVolumeColumn.push(volumeColumnPoint({
      open: _open,
      close: _closeV,
      volume: _volume,
      date: _dateMs,
      option: {
        _high: _high,
        _low: _low
      }
    }));

    if (_minClose > _close) {
      _minClose = _close;
    }

    if (_maxClose < _close) {
      _maxClose = _close;
    }
  }

  _ChartConfig["default"].setStockSerias(config, _data, _dataHigh, _dataLow, _dataOpen, chartId);

  return {
    data: _data,
    minClose: _minClose,
    maxClose: _maxClose,
    dVolume: _dataVolume,
    dColumn: _dataVolumeColumn
  };
};

var _crZhConfig = function _crZhConfig(id, dataSource) {
  return {
    id: id,
    key: id,
    isWithoutAdd: true,
    legend: stockSeriesLegend(),
    dataSource: dataSource
  };
};

var _crIntradayConfigOption = function _crIntradayConfigOption(_ref) {
  var id = _ref.id,
      data = _ref.data,
      dataSource = _ref.dataSource;
  return {
    zhConfig: _crZhConfig(id, dataSource),
    valueMoving: valueMoving(data)
  };
};

var WtdIntraday = {
  crKey: function crKey(option) {
    var value = option.value,
        two = option.two;
    return value + " (" + two + "min)";
  },
  toConfig: function toConfig(json, option) {
    var _initialConfig = _ChartConfig["default"].fBaseAreaConfig(),
        _itemId = option._itemId,
        dataSource = option.dataSource,
        _crSeriaData2 = _crSeriaData(json, option, _initialConfig, _itemId),
        data = _crSeriaData2.data,
        minClose = _crSeriaData2.minClose,
        maxClose = _crSeriaData2.maxClose,
        dColumn = _crSeriaData2.dColumn,
        dVolume = _crSeriaData2.dVolume,
        _dataVm = crDataVm(data),
        config = (0, _ConfigBuilder["default"])().init(_initialConfig).add('chart', {
      spacingTop: 25,
      marginBottom: 20
    }).addCaption(_itemId).addTooltip(_Tooltip["default"].fnBasePointFormatterT).add(_crIntradayConfigOption({
      id: _itemId,
      data: _dataVm,
      dataSource: dataSource
    })).setMinMax(minClose, maxClose, false).addMiniVolume({
      id: _itemId,
      dVolume: dVolume,
      dColumn: dColumn,
      tooltipColumn: _Chart["default"].fTooltip(_Tooltip["default"].volumeDmyt)
    }).toConfig();

    return {
      config: config
    };
  }
};
var _default = WtdIntraday;
exports["default"] = _default;
//# sourceMappingURL=WtdIntraday.js.map