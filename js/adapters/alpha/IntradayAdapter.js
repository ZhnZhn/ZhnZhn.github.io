"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _IntradayFns = _interopRequireDefault(require("../IntradayFns"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    crMarkerColor = _IntradayFns["default"].crMarkerColor,
    crDataDaily = _IntradayFns["default"].crDataDaily,
    crIntradayConfigOption = _fnAdapter["default"].crIntradayConfigOption; //const DAILY = 'Daily';

var INTRADAY = 'INTRADAY';
var DAILY_ADJUSTED = 'DAILY_ADJUSTED';
var _keys = Object.keys;

var _crSeriaOptions = function _crSeriaOptions(_ref) {
  var dfT = _ref.dfT,
      isFilterZero = _ref.isFilterZero;

  var _isAdjusted = dfT === DAILY_ADJUSTED;

  return {
    notFilterZero: !isFilterZero,
    isDividend: _isAdjusted,
    toUTC: ymdhmsToUTC,
    pnClose: _isAdjusted ? '5. adjusted close' : '4. close',
    pnVolume: _isAdjusted ? '6. volume' : '5. volume'
  };
};

var PN_DIVIDENT = '7. dividend amount';
var PN_ADJ_CLOSE = '5. adjusted close';

var _addDividendPointTo = function _addDividendPointTo(arr, dateMs, p) {
  var _exValue = p[PN_DIVIDENT] && parseFloat(p[PN_DIVIDENT]);

  if (_exValue) {
    arr.push((0, _extends2["default"])({}, _ChartConfig["default"].crMarkerExDividend(), {
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
      _suffix = interval,
      _propName = "Time Series (" + _suffix + ")";

  return json[_propName];
};

var _crSeriaData = function _crSeriaData(objValues, option) {
  var _dateKeys = objValues ? _keys(objValues).sort() : [],
      dC = [],
      dH = [],
      dL = [],
      dO = [],
      dDividend = [],
      dVc = [],
      dV = [],
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
      dC.push((0, _extends2["default"])({
        x: _dateMs,
        y: _close
      }, crMarkerColor(_date)));
      dH.push([_dateMs, _high]);
      dL.push([_dateMs, _low]);
      dO.push([_dateMs, _open]);
      dV.push([_dateMs, _volume]);
      dVc.push(crVolumePoint({
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
        _addDividendPointTo(dDividend, _dateMs, _point);
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
    dC: dC,
    dH: dH,
    dL: dL,
    dO: dO,
    dDividend: dDividend,
    minClose: minClose,
    maxClose: maxClose,
    dVc: dVc,
    dV: dV
  };
};

var _crDataDaily = function _crDataDaily(dfT, data) {
  return dfT === INTRADAY ? crDataDaily(data) : data;
};

var IntradayAdapter = {
  crKey: function crKey(_ref2) {
    var _itemKey = _ref2._itemKey;
    return _itemKey;
  },
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        title = option.title,
        dfFn = option.dfFn,
        dataSource = option.dataSource,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        dfT = dfFn.replace('TIME_SERIES_', ''),
        _objValues = _getObjValues(json, option),
        _crSeriaData2 = _crSeriaData(_objValues, option),
        dC = _crSeriaData2.dC,
        dH = _crSeriaData2.dH,
        dL = _crSeriaData2.dL,
        dO = _crSeriaData2.dO,
        minClose = _crSeriaData2.minClose,
        maxClose = _crSeriaData2.maxClose,
        dDividend = _crSeriaData2.dDividend,
        dVc = _crSeriaData2.dVc,
        dV = _crSeriaData2.dV,
        dataDaily = _crDataDaily(dfT, dC);

    var config = (0, _ConfigBuilder["default"])().stockConfig(_itemKey, {
      dC: dC,
      dO: dO,
      dH: dH,
      dL: dL,
      minClose: minClose,
      maxClose: maxClose,
      dVc: dVc,
      dV: dV,
      isNotZoomToMinMax: isNotZoomToMinMax,
      isDrawDeltaExtrems: isDrawDeltaExtrems,
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth
    }).addCaption(title).add(crIntradayConfigOption({
      id: _itemKey,
      data: dataDaily,
      dataSource: dataSource
    }, option)).addDividend({
      dDividend: dDividend,
      minClose: minClose,
      maxClose: maxClose
    }).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return _ConfigBuilder["default"].crSeria({
      adapter: IntradayAdapter,
      json: json,
      option: option,
      type: 'line'
    });
  }
};
var _default = IntradayAdapter;
exports["default"] = _default;
//# sourceMappingURL=IntradayAdapter.js.map