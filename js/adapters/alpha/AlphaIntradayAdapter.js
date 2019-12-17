"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    volumeColumnPoint = _AdapterFn["default"].volumeColumnPoint;
var crIntradayConfigOption = _fnAdapter["default"].crIntradayConfigOption; //const DAILY = 'Daily';

var INTRADAY = 'INTRADAY';
var DAILY_ADJUSTED = 'DAILY_ADJUSTED';
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
  var marker, color;

  if (date.indexOf(C.TIME_START_DAY) !== -1) {
    marker = _fMarker(C.START_DAY);
    color = C.START_DAY;
  } else if (date.indexOf(C.TIME_CLOSE_DAY) !== -1) {
    marker = _fMarker(C.CLOSE_DAY);
    color = C.CLOSE_DAY;
  }

  return {
    marker: marker,
    color: color
  };
};

var _crSeriaOptions = function _crSeriaOptions(_ref) {
  var dfT = _ref.dfT,
      hasFilterZero = _ref.hasFilterZero,
      hasDividend = _ref.hasDividend;

  var _isIntraday = dfT === INTRADAY;

  var _isAdjusted = dfT === DAILY_ADJUSTED;

  return {
    notFilterZero: !hasFilterZero,
    isDividend: _isAdjusted && hasDividend,
    toUTC: _isIntraday ? ymdhmsToUTC : ymdToUTC,
    pnClose: _isAdjusted ? '5. adjusted close' : '4. close',
    pnVolume: _isAdjusted ? '6. volume' : '5. volume'
  };
};

var PN_DIVIDENT = '7. dividend amount';
var PN_ADJ_CLOSE = '5. adjusted close';

var _addDividendPointTo = function _addDividendPointTo(arr, dateMs, p) {
  var _exValue = p[PN_DIVIDENT] && parseFloat(p[PN_DIVIDENT]);

  if (_exValue) {
    arr.push((0, _extends2["default"])({}, _ChartConfig["default"].fMarkerExDividend(), {}, {
      x: dateMs,
      exValue: _exValue,
      price: parseFloat(p[PN_ADJ_CLOSE])
    }));
  }
};

var _notZeros = function _notZeros(v1, v2) {
  return v1 !== 0 && v2 !== 0;
};

var _crSeriaData = function _crSeriaData(json, option, config, chartId) {
  var interval = option.interval,
      _propName = "Time Series (" + interval + ")",
      _value = json[_propName],
      _dateKeys = _value ? Object.keys(_value).sort() : [],
      _data = [],
      _dataDividend = [],
      _dataVolume = [],
      _dataVolumeColumn = [],
      _dataHigh = [],
      _dataLow = [],
      _dataOpen = [],
      _crSeriaOptions2 = _crSeriaOptions(option),
      notFilterZero = _crSeriaOptions2.notFilterZero,
      isDividend = _crSeriaOptions2.isDividend,
      toUTC = _crSeriaOptions2.toUTC,
      pnClose = _crSeriaOptions2.pnClose,
      pnVolume = _crSeriaOptions2.pnVolume;

  var i = 0,
      _max = _dateKeys.length,
      _minClose = Number.POSITIVE_INFINITY,
      _maxClose = Number.NEGATIVE_INFINITY,
      _dateMs,
      _date,
      _point,
      _open,
      _high,
      _low,
      _closeV,
      _close,
      _volume;

  for (i; i < _max; i++) {
    _date = _dateKeys[i];
    _point = _value[_date];
    _closeV = parseFloat(_point['4. close']);
    _close = parseFloat(_point[pnClose]);

    if (notFilterZero || _notZeros(_closeV, _close)) {
      _open = parseFloat(_point['1. open']);
      _high = parseFloat(_point['2. high']);
      _low = parseFloat(_point['3. low']);
      _volume = parseFloat(_point[pnVolume]);
      _dateMs = toUTC(_date);

      _data.push((0, _extends2["default"])({
        x: _dateMs,
        y: _close
      }, _fMarkerColor(_date)));

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

      if (isDividend) {
        _addDividendPointTo(_dataDividend, _dateMs, _point);
      }

      if (_minClose > _close) {
        _minClose = _close;
      }

      if (_maxClose < _close) {
        _maxClose = _close;
      }
    }
  }

  _ChartConfig["default"].setStockSerias(config, _data, _dataHigh, _dataLow, _dataOpen, chartId);

  return {
    data: _data,
    dataDividend: _dataDividend,
    minClose: _minClose,
    maxClose: _maxClose,
    dVolume: _dataVolume,
    dColumn: _dataVolumeColumn
  };
};

var _toDataDaily = function _toDataDaily(data) {
  return data.filter(function (p) {
    return p.color === C.CLOSE_DAY;
  });
};

var _crChartOptions = function _crChartOptions(dfT, data) {
  var _isIntraday = dfT === INTRADAY;

  return {
    dataDaily: _isIntraday ? _toDataDaily(data) : data,
    seriaTooltip: _isIntraday ? _Tooltip["default"].fnBasePointFormatterT : _Tooltip["default"].fnBasePointFormatter,
    volumeTooltip: _isIntraday ? _Tooltip["default"].volumeDmyt : _Tooltip["default"].volume
  };
};

var AlphaIntradayAdapter = {
  toConfig: function toConfig(json, option) {
    var baseConfig = _ChartConfig["default"].fBaseAreaConfig(),
        value = option.value,
        interval = option.interval,
        dfT = option.dfT,
        dataSource = option.dataSource,
        _chartId = value,
        _crSeriaData2 = _crSeriaData(json, option, baseConfig, _chartId),
        data = _crSeriaData2.data,
        minClose = _crSeriaData2.minClose,
        maxClose = _crSeriaData2.maxClose,
        dataDividend = _crSeriaData2.dataDividend,
        dColumn = _crSeriaData2.dColumn,
        dVolume = _crSeriaData2.dVolume,
        _crChartOptions2 = _crChartOptions(dfT, data),
        dataDaily = _crChartOptions2.dataDaily,
        seriaTooltip = _crChartOptions2.seriaTooltip,
        volumeTooltip = _crChartOptions2.volumeTooltip;

    option.minY = minClose;
    option.maxY = maxClose;
    var config = (0, _ConfigBuilder["default"])().init(baseConfig).add('chart', {
      spacingTop: 25
    }).addCaption(value, "Time Series (" + interval + ")").addTooltip(seriaTooltip).add((0, _extends2["default"])({}, crIntradayConfigOption({
      id: _chartId,
      data: dataDaily,
      dataSource: dataSource
    }))).addMinMax(dataDaily, option).addDividend({
      dataDividend: dataDividend,
      minClose: minClose,
      maxClose: maxClose
    }).addMiniVolume({
      id: _chartId,
      dVolume: dVolume,
      dColumn: dColumn,
      tooltipColumn: _Chart["default"].fTooltip(volumeTooltip)
    }).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    throw new Error('ZH_1000');
  }
};
var _default = AlphaIntradayAdapter;
exports["default"] = _default;
//# sourceMappingURL=AlphaIntradayAdapter.js.map