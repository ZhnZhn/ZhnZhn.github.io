'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fnUtil = {
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
  }
};

exports.default = fnUtil;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\fnUtil.js.map