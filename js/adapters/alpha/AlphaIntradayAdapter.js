"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _IntradayFns = _interopRequireDefault(require("../IntradayFns"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    volumeColumnPoint = _AdapterFn["default"].volumeColumnPoint,
    crSeria = _AdapterFn["default"].crSeria;
var crMarkerColor = _IntradayFns["default"].crMarkerColor,
    crDataDaily = _IntradayFns["default"].crDataDaily;
var crIntradayConfigOption = _fnAdapter["default"].crIntradayConfigOption; //const DAILY = 'Daily';

var INTRADAY = 'INTRADAY';
var DAILY_ADJUSTED = 'DAILY_ADJUSTED';

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
    arr.push((0, _extends2["default"])({}, _ChartConfig["default"].crMarkerExDividend(), {}, {
      x: dateMs,
      exValue: _exValue,
      price: parseFloat(p[PN_ADJ_CLOSE])
    }));
  }
};

var _notZeros = function _notZeros(v1, v2) {
  return v1 !== 0 && v2 !== 0;
};

var _getObjValues = function _getObjValues(json, option) {
  var interval = option.interval,
      _propName = "Time Series (" + interval + ")";

  return json[_propName];
};

var _crSeriaData = function _crSeriaData(objValues, option) {
  var _dateKeys = objValues ? Object.keys(objValues).sort() : [],
      data = [],
      dH = [],
      dL = [],
      dO = [],
      dataDividend = [],
      dVolume = [],
      dColumn = [],
      _crSeriaOptions2 = _crSeriaOptions(option),
      notFilterZero = _crSeriaOptions2.notFilterZero,
      isDividend = _crSeriaOptions2.isDividend,
      toUTC = _crSeriaOptions2.toUTC,
      pnClose = _crSeriaOptions2.pnClose,
      pnVolume = _crSeriaOptions2.pnVolume;

  var i = 0,
      _max = _dateKeys.length,
      minClose = Number.POSITIVE_INFINITY,
      maxClose = Number.NEGATIVE_INFINITY,
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
    _point = objValues[_date];
    _closeV = parseFloat(_point['4. close']);
    _close = parseFloat(_point[pnClose]);

    if (notFilterZero || _notZeros(_closeV, _close)) {
      _open = parseFloat(_point['1. open']);
      _high = parseFloat(_point['2. high']);
      _low = parseFloat(_point['3. low']);
      _volume = parseFloat(_point[pnVolume]);
      _dateMs = toUTC(_date);
      data.push((0, _extends2["default"])({
        x: _dateMs,
        y: _close
      }, crMarkerColor(_date)));
      dH.push([_dateMs, _high]);
      dL.push([_dateMs, _low]);
      dO.push([_dateMs, _open]);
      dVolume.push([_dateMs, _volume]);
      dColumn.push(volumeColumnPoint({
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
        _addDividendPointTo(dataDividend, _dateMs, _point);
      }

      if (minClose > _close) {
        minClose = _close;
      }

      if (maxClose < _close) {
        maxClose = _close;
      }
    }
  }

  return {
    data: data,
    dH: dH,
    dL: dL,
    dO: dO,
    dataDividend: dataDividend,
    minClose: minClose,
    maxClose: maxClose,
    dVolume: dVolume,
    dColumn: dColumn
  };
};

var _crChartOptions = function _crChartOptions(dfT, data) {
  var _isIntraday = dfT === INTRADAY;

  return {
    dataDaily: _isIntraday ? crDataDaily(data) : data,
    seriaTooltip: _isIntraday ? _Tooltip["default"].fnBasePointFormatterT : _Tooltip["default"].fnBasePointFormatter,
    volumeTooltip: _isIntraday ? _Tooltip["default"].volumeDmyt : _Tooltip["default"].volume
  };
};

var AlphaIntradayAdapter = {
  toConfig: function toConfig(json, option) {
    var _chartId = option.value,
        interval = option.interval,
        dfT = option.dfT,
        dataSource = option.dataSource,
        _objValues = _getObjValues(json, option),
        _crSeriaData2 = _crSeriaData(_objValues, option),
        data = _crSeriaData2.data,
        dH = _crSeriaData2.dH,
        dL = _crSeriaData2.dL,
        dO = _crSeriaData2.dO,
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
    var config = (0, _ConfigBuilder["default"])().areaConfig().add('chart', {
      spacingTop: 25
    }).addCaption(_chartId, "Time Series (" + interval + ")").addTooltip(seriaTooltip).addMinMax(dataDaily, option).setStockSerias(_chartId, data, dH, dL, dO).addDividend({
      dataDividend: dataDividend,
      minClose: minClose,
      maxClose: maxClose
    }).addMiniVolume({
      id: _chartId,
      dVolume: dVolume,
      dColumn: dColumn,
      tooltipColumn: _Chart["default"].fTooltip(volumeTooltip)
    }).add((0, _extends2["default"])({}, crIntradayConfigOption({
      id: _chartId,
      data: dataDaily,
      dataSource: dataSource
    }, option))).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return crSeria({
      adapter: AlphaIntradayAdapter,
      json: json,
      option: option,
      type: 'spline'
    });
  }
};
var _default = AlphaIntradayAdapter;
exports["default"] = _default;
//# sourceMappingURL=AlphaIntradayAdapter.js.map