"use strict";

exports.__esModule = true;
exports["default"] = void 0;
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