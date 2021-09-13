"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _compose = _interopRequireDefault(require("../../utils/compose"));

const _toUTC = Date.UTC;

const _toDayUTC = str => {
  const _arrYear = str.split('M'),
        _arrMonth = _arrYear[1].split('D'),
        _month = parseInt(_arrMonth[0], 10) - 1;

  return _toUTC(_arrYear[0], _month, _arrMonth[1]);
};

const _fToUTC = monthPeriod => (delimeterChart, str) => {
  const arrDate = str.split(delimeterChart),
        _month = parseInt(arrDate[1], 10) * monthPeriod - 1,
        _day = _month === 1 ? 28 : 30;

  return _toUTC(arrDate[0], _month, _day);
},
      _toMonthUTC = _fToUTC(1),
      _toQuarterUTC = _fToUTC(3),
      _toHalfYearUTC = _fToUTC(6),
      _toYearUTC = (str, hasPerJanuary) => hasPerJanuary ? _toUTC(str, 0, 1) : _toUTC(str, 11, 31);

const _fIsInclude = str => token => str.indexOf(token) !== -1;

const fnUtil = {
  compose: _compose.default,
  toUTC: (str, hasPerJanuary) => {
    str = str.toUpperCase();

    const _isInclude = _fIsInclude(str);

    if (_isInclude('M')) {
      return _isInclude('D') ? _toDayUTC(str) : _toMonthUTC('M', str);
    }

    if (_isInclude('Q')) {
      return _toQuarterUTC('Q', str);
    }

    if (_isInclude('K')) {
      return _toQuarterUTC('K', str);
    }

    if (_isInclude('H')) {
      return _toHalfYearUTC('H', str);
    }

    return _toYearUTC(str, hasPerJanuary);
  },
  toYMD: str => {
    const ms = fnUtil.toUTC(str),
          d = new Date(ms);
    return d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2);
  }
};
var _default = fnUtil;
exports.default = _default;
//# sourceMappingURL=fnUtil.js.map