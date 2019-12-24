"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _compose = _interopRequireDefault(require("../../utils/compose"));

var fnUtil = {
  compose: _compose["default"],
  toUTC: function toUTC(str) {
    if (str.indexOf('M') !== -1) {
      var arrDate = str.split('M'),
          _month = parseInt(arrDate[1], 10) - 1,
          _day = _month === 1 ? 28 : 30;

      return Date.UTC(arrDate[0], _month, _day);
    } else if (str.indexOf('Q') !== -1) {
      var _arrDate = str.split('Q'),
          _month2 = parseInt(_arrDate[1], 10) * 3 - 1;

      return Date.UTC(_arrDate[0], _month2, 30);
    } else if (str.indexOf('K') !== -1) {
      var _arrDate2 = str.split('K'),
          _month3 = parseInt(_arrDate2[1], 10) * 3 - 1;

      return Date.UTC(_arrDate2[0], _month3, 30);
    } else {
      return Date.UTC(str, 11, 31);
    }
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