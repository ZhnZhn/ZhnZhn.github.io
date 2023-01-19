"use strict";

exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.monthIndex = exports.mlsToDmy = exports.isYmdOrEmpty = exports.isYmd = exports.isDmyPeriod = exports.isDmy = exports.getYmdhmUTC = exports.getYear = exports.getYTDfromDmy = exports.getUTCTime = exports.getToDate = exports.getFromDate = exports.getDaysFromYmd = exports.getCurrentYear = exports.dmyToUTC = exports.addToDmy = void 0;
const MIN_YEAR = 1990;
const DAY_IN_MLS = 1000 * 60 * 60 * 24;
let _currentYear;
const _isNumber = n => typeof n === 'number';
const _isNaN = Number.isNaN;
const _isStr = str => typeof str === 'string';
const _isUndef = v => typeof v === 'undefined';
const _pad2 = n => n < 10 ? '0' + n : '' + n;
const _toIntMonth = str => parseInt(str, 10) - 1;
const _splitDateStr = str => (str || '').toString().split('-');
const _isLikelyQuarter = str => _isStr(str) && str[0].toUpperCase() === 'Q';
const _notInIntervalStrict = (n, min, max) => _isNaN(n) || n < min || n > max;
const _notInLengthMinMax = (str, length, min, max) => _isStr(str) && str.length !== length || _notInIntervalStrict(parseInt(str, 10), min, max) ? true : false;
const _isYmd = function (yStr, mStr, dStr, _temp) {
  let {
    nForecastDate = 0,
    minYear = MIN_YEAR
  } = _temp === void 0 ? {} : _temp;
  const _nowYear = new Date().getFullYear();
  if (_notInLengthMinMax(yStr, 4, minYear, _nowYear + nForecastDate) || _notInLengthMinMax(mStr, 2, 1, 12) || _notInLengthMinMax(dStr, 2, 1, 31)) {
    return false;
  }
  return true;
};
const _getDaysInYm = (y, m) => new Date(y, m, 0).getDate();
const _getTimeUTC = d => _pad2(d.getUTCHours()) + ":" + _pad2(d.getUTCMinutes());
const _getYmdUTC = (d, yearMinus) => d.getUTCFullYear() - yearMinus + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2);
const MONTH_HP = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

//YYYY-MM-DD valid format
const isYmd = function (str, nForecastDate, minYear) {
  if (nForecastDate === void 0) {
    nForecastDate = 0;
  }
  if (minYear === void 0) {
    minYear = MIN_YEAR;
  }
  if (!_isStr(str)) {
    return false;
  }
  const _str = str.trim();
  if (_str.length !== 10) {
    return false;
  }
  const [y, m, d] = _str.split('-');
  return _isYmd(y, m, d, {
    nForecastDate,
    minYear
  });
};
exports.isYmd = isYmd;
const isYmdOrEmpty = str => str === '' ? true : isYmd(str);
exports.isYmdOrEmpty = isYmdOrEmpty;
const getFromDate = function (yearMinus) {
  if (yearMinus === void 0) {
    yearMinus = 2;
  }
  const dNow = new Date();
  return _getYmdUTC(dNow, yearMinus);
};
exports.getFromDate = getFromDate;
const getToDate = () => getFromDate(0);

//YYYY-MM-DD
exports.getToDate = getToDate;
const getYear = str => (str || '').split('-')[0];
exports.getYear = getYear;
const getCurrentYear = () => _currentYear ? _currentYear : _currentYear = getYear(getFromDate(0));
exports.getCurrentYear = getCurrentYear;
const getYmdhmUTC = date => {
  const _d = date || new Date();
  return _getYmdUTC(_d, 0) + " " + _getTimeUTC(_d) + " UTC";
};
exports.getYmdhmUTC = getYmdhmUTC;
const mlsToDmy = mlsUTC => {
  if (!(_isNumber(mlsUTC) && isFinite(mlsUTC))) {
    return '';
  }
  const d = new Date(mlsUTC);
  if (d.toString() === 'Invalid Date') {
    return '';
  }
  return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
};
exports.mlsToDmy = mlsToDmy;
const dmyToUTC = str => {
  const [d, m, y] = _splitDateStr(str);
  return _isYmd(y, m, d) ? Date.UTC(y, _toIntMonth(m), d) : NaN;
};
exports.dmyToUTC = dmyToUTC;
const isDmyPeriod = (from, to) => dmyToUTC(from) <= dmyToUTC(to);
exports.isDmyPeriod = isDmyPeriod;
const isDmy = function (str, minYear) {
  if (minYear === void 0) {
    minYear = MIN_YEAR;
  }
  const [d, m, y] = _splitDateStr(str);
  return _isYmd(y, m, d, {
    minYear
  });
};
exports.isDmy = isDmy;
const ymdToUTC = function (dateStr, option) {
  if (option === void 0) {
    option = {};
  }
  const _arr = _splitDateStr(dateStr),
    _len = _arr.length,
    [yearStr, mStr, dStr] = _arr;
  if (_len === 3) {
    return Date.UTC(yearStr, _toIntMonth(mStr), dStr);
  }
  if (_len === 2 && mStr !== '') {
    const _m = parseInt(mStr, 10);
    if (!_isNaN(_m)) {
      const _d = _getDaysInYm(yearStr, _m);
      return Date.UTC(yearStr, _m - 1, _d);
      // YYYY-Q format
    } else if (_isLikelyQuarter(_arr[1])) {
      const _q = parseInt(_arr[1][1], 10);
      if (_isNaN(_q)) {
        return _q;
      }
      const _d = _getDaysInYm(_arr[0], _q * 3);
      return Date.UTC(_arr[0], _q * 3 - 1, _d);
    } else {
      return _m;
    }
  }
  if (_len === 1) {
    const {
        y = 0
      } = option,
      _y = parseInt(yearStr, 10) - y;
    return !_isNaN(_y) ? Date.UTC(_y, 11, 31) : _y;
  }
  return Date.UTC(yearStr, _toIntMonth(mStr), dStr);
};
exports.ymdToUTC = ymdToUTC;
const ymdhmsToUTC = function (dateStr, dtDelimeter) {
  if (dtDelimeter === void 0) {
    dtDelimeter = ' ';
  }
  const [ymdStr, hmsStr = ''] = (dateStr || '').split(dtDelimeter),
    [yearStr, monthStr, dayStr] = ymdStr.split('-'),
    [hourStr = '', minuteStr = '', secondStr = ''] = hmsStr.split(':');
  return Date.UTC(yearStr, _toIntMonth(monthStr), dayStr, hourStr, minuteStr, secondStr);
};
exports.ymdhmsToUTC = ymdhmsToUTC;
const getUTCTime = ms => {
  if (!Number.isInteger(ms)) {
    return '';
  }
  const _d = new Date(ms);
  return _getTimeUTC(_d);
};
exports.getUTCTime = getUTCTime;
const addToDmy = (dmy, month) => {
  if (!isDmy(dmy)) {
    return new Date(0);
  }
  if (!Number.isInteger(month)) {
    return new Date(dmyToUTC(dmy));
  }
  const _to = new Date(dmyToUTC(dmy));
  return new Date(_to.setUTCMonth(_to.getUTCMonth() + month));
};
exports.addToDmy = addToDmy;
const getYTDfromDmy = dmy => {
  const _year = dmy.split('-')[2];
  return dmyToUTC("01-01-" + _year);
};
exports.getYTDfromDmy = getYTDfromDmy;
const getDaysFromYmd = ymd => {
  const _fromMls = ymdToUTC(ymd);
  return Math.ceil((new Date().getTime() - _fromMls) / DAY_IN_MLS);
};
exports.getDaysFromYmd = getDaysFromYmd;
const monthIndex = str => {
  if (!_isStr(str)) {
    return -1;
  }
  const _monthIndex = MONTH_HP[String(str).toLowerCase()];
  return _isUndef(_monthIndex) ? -1 : _monthIndex;
};
exports.monthIndex = monthIndex;
//# sourceMappingURL=dateFn.js.map