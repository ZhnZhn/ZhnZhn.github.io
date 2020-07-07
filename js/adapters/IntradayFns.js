"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    crVolumePoint = _AdapterFn["default"].crVolumePoint;
var C = {
  TIME_START_DAY: '09:30:00',
  TIME_CLOSE_DAY: '16:00:00',
  START_DAY: "#90ed7d",
  CLOSE_DAY: "#f7a35c"
};

var _crMarker = function _crMarker(color) {
  return {
    radius: 3,
    enabled: true,
    fillColor: color
  };
};

var IntradayFns = {
  crMarkerColor: function crMarkerColor(strDate) {
    var marker, color;

    if (strDate.indexOf(C.TIME_START_DAY) !== -1) {
      marker = _crMarker(C.START_DAY);
      color = C.START_DAY;
    } else if (strDate.indexOf(C.TIME_CLOSE_DAY) !== -1) {
      marker = _crMarker(C.CLOSE_DAY);
      color = C.CLOSE_DAY;
    }

    return {
      marker: marker,
      color: color
    };
  },
  crSeriesData: function crSeriesData(objValues, option, chartId) {
    var _dateKeys = objValues ? Object.keys(objValues).sort() : [],
        data = [],
        dH = [],
        dL = [],
        dO = [],
        dVolume = [],
        dColumn = [];

    var i = 0,
        _max = _dateKeys.length,
        minClose = Number.POSITIVE_INFINITY,
        maxClose = Number.NEGATIVE_INFINITY,
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
      _point = objValues[_strDate];
      _closeV = parseFloat(_point['close']);
      _close = parseFloat(_point['close']);
      _open = parseFloat(_point['open']);
      _high = parseFloat(_point['high']);
      _low = parseFloat(_point['low']);
      _volume = parseFloat(_point['volume']);
      _dateMs = ymdhmsToUTC(_strDate);
      data.push((0, _extends2["default"])({
        x: _dateMs,
        y: _close
      }, IntradayFns.crMarkerColor(_strDate)));
      dH.push([_dateMs, _high]);
      dL.push([_dateMs, _low]);
      dO.push([_dateMs, _open]);
      dVolume.push([_dateMs, _volume]);
      dColumn.push(crVolumePoint({
        open: _open,
        close: _closeV,
        volume: _volume,
        date: _dateMs,
        option: {
          _high: _high,
          _low: _low
        }
      }));

      if (minClose > _close) {
        minClose = _close;
      }

      if (maxClose < _close) {
        maxClose = _close;
      }
    }

    return {
      data: data,
      dH: dH,
      dL: dL,
      dO: dO,
      minClose: minClose,
      maxClose: maxClose,
      dVolume: dVolume,
      dColumn: dColumn
    };
  },
  crDataVm: function crDataVm(data) {
    var _max = data.length - 1;

    var i = _max;

    for (i; i > -1; i--) {
      if (data[i].color === C.START_DAY) {
        return [data[i], data[_max]];
      }
    }

    return [];
  },
  //AV Intraday
  crDataDaily: function crDataDaily(data) {
    return data.filter(function (p) {
      return p.color === C.CLOSE_DAY;
    });
  }
};
var _default = IntradayFns;
exports["default"] = _default;
//# sourceMappingURL=IntradayFns.js.map