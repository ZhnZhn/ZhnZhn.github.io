"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toYMD = exports.toUTC = exports.compose = void 0;
var _compose2 = _interopRequireDefault(require("../../utils/compose"));
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
  _toYearUTC = (str, hasPerJanuary) => hasPerJanuary ? _toUTC(str, 0, 1) : _toUTC(str, 11, 31),
  _fIsInclude = str => token => str.indexOf(token) !== -1;
const compose = exports.compose = _compose2.default;
const _hmMonth = {
  JANUARY: '01',
  FEBRUARY: '02',
  MARCH: '03',
  APRIL: '04',
  MAY: '05',
  JUNE: '06',
  JULY: '07',
  AUGUST: '08',
  SEPTEMBER: '09',
  OCTOBER: '10',
  NOVEMBER: '11',
  DECEMBER: '12'
};
const toUTC = (str, hasPerJanuary) => {
  str = str.toUpperCase().trim();
  //YYYY MONTH (SIR)
  const [_year, _month] = str.split(' '),
    _m = _month && _hmMonth[_month];
  if (_m) {
    return _toMonthUTC('M', _year + "M" + _m);
  }
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
  return _isInclude('/') // FSO 2000/01 case
  ? _toYearUTC(str.slice(0, 4)) : _toYearUTC(str, hasPerJanuary);
};
exports.toUTC = toUTC;
const toYMD = str => {
  const ms = toUTC(str),
    d = new Date(ms);
  return d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + d.getUTCDate()).slice(-2);
};
exports.toYMD = toYMD;
//# sourceMappingURL=fnUtil.js.map