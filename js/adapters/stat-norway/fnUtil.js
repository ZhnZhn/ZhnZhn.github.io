"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _compose = _interopRequireDefault(require("../../utils/compose"));

var _toMonthUTC = function _toMonthUTC(str) {
  var arrDate = str.split('M'),
      _month = parseInt(arrDate[1], 10) - 1,
      _day = _month === 1 ? 28 : 30;

  return Date.UTC(arrDate[0], _month, _day);
};

var _toQuarterUTC = function _toQuarterUTC(quaterChart, str) {
  var arrDate = str.split(quaterChart),
      _month = parseInt(arrDate[1], 10) * 3 - 1;

  return Date.UTC(arrDate[0], _month, 30);
};

var _toYearUTC = function _toYearUTC(str) {
  return Date.UTC(str, 11, 31);
};

var fnUtil = {
  compose: _compose["default"],
  toUTC: function toUTC(str) {
    str = str.toUpperCase();

    if (str.indexOf('M') !== -1) {
      return _toMonthUTC(str);
    }

    if (str.indexOf('Q') !== -1) {
      return _toQuarterUTC('Q', str);
    }

    if (str.indexOf('K') !== -1) {
      return _toQuarterUTC('K', str);
    }

    return _toYearUTC(str);
  },
  toYMD: function toYMD(str) {
    var ms = fnUtil.toUTC(str),
        d = new Date(ms);
    return d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2);
  }
};
var _default = fnUtil;
exports["default"] = _default;
//# sourceMappingURL=fnUtil.js.map