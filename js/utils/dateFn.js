"use strict";

exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.monthIndex = exports.mlsToYmd = exports.mlsToDmy = exports.isYmdOrEmpty = exports.isYmd = exports.isDmyPeriod = exports.isDmy = exports.getYmdhmUTC = exports.getYear = exports.getYTDfromDmy = exports.getUTCTime = exports.getToDate = exports.getNumberOfDays = exports.getNextMonthDmy = exports.getFromDate = exports.getDaysFromYmd = exports.getDateFromVm = exports.getCurrentYear = exports.formatStrDate = exports.dmyToUTC = exports.addToDmy = exports.addDaysToYmd = void 0;
var _isTypeFn = require("./isTypeFn");
const MIN_YEAR = 1990;
const DF_FORECAST_DATE = 0;
const DAY_IN_MLS = 1000 * 60 * 60 * 24;
let _currentYear;
const _pad2 = n => n < 10 ? '0' + n : '' + n;
const _toIntMonth = str => (0, _isTypeFn.parseIntBy10)(str) - 1;
const _splitStrByDash = str => (0, _isTypeFn.isStr)(str) ? str.split('-') : [];
const _isLikelyQuarter = str => (0, _isTypeFn.isStr)(str) && str[0].toUpperCase() === 'Q';
const _notInIntervalStrict = (n, min, max) => (0, _isTypeFn.isNaN)(n) || n < min || n > max;
const _notInLengthMinMax = (str, length, min, max) => (0, _isTypeFn.isStr)(str) && str.length !== length || _notInIntervalStrict((0, _isTypeFn.parseIntBy10)(str), min, max);
const _isYmd = function (yStr, mStr, dStr, minYear, nForecastDate) {
  if (minYear === void 0) {
    minYear = MIN_YEAR;
  }
  if (nForecastDate === void 0) {
    nForecastDate = DF_FORECAST_DATE;
  }
  const _nowYear = new Date().getFullYear();
  return !(_notInLengthMinMax(yStr, 4, minYear, _nowYear + nForecastDate) || _notInLengthMinMax(mStr, 2, 1, 12) || _notInLengthMinMax(dStr, 2, 1, 31));
};
const _getTimeUTC = d => `${_pad2(d.getUTCHours())}:${_pad2(d.getUTCMinutes())}`;
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
const isYmd = (str, nForecastDate, minYear) => {
  if (!(0, _isTypeFn.isStr)(str)) {
    return false;
  }
  const _str = str.trim();
  if (_str.length !== 10) {
    return false;
  }
  const [y, m, d] = _str.split('-');
  return _isYmd(y, m, d, minYear, nForecastDate);
};
exports.isYmd = isYmd;
const isYmdOrEmpty = str => str === '' || isYmd(str);
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
const getYear = str => (0, _isTypeFn.isStr)(str) ? str.slice(0, 4) : '';
exports.getYear = getYear;
const getCurrentYear = () => _currentYear ? _currentYear : _currentYear = getYear(getFromDate(0));
exports.getCurrentYear = getCurrentYear;
const getYmdhmUTC = date => {
  const _d = date || new Date();
  return `${_getYmdUTC(_d, 0)} ${_getTimeUTC(_d)} UTC`;
};
exports.getYmdhmUTC = getYmdhmUTC;
const mlsToDmy = mlsUTC => {
  if (!((0, _isTypeFn.isTypeNumber)(mlsUTC) && isFinite(mlsUTC))) {
    return '';
  }
  const d = new Date(mlsUTC);
  if (d.toString() === 'Invalid Date') {
    return '';
  }
  return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
};
exports.mlsToDmy = mlsToDmy;
const mlsToYmd = mlsUTC => {
  const _dmy = mlsToDmy(mlsUTC);
  if (_dmy) {
    const [d, m, y] = _dmy.split('-');
    return `${y}-${m}-${d}`;
  }
  return '';
};
exports.mlsToYmd = mlsToYmd;
const dmyToUTC = str => {
  const [d, m, y] = _splitStrByDash(str);
  return _isYmd(y, m, d) ? Date.UTC(y, _toIntMonth(m), d) : NaN;
};
exports.dmyToUTC = dmyToUTC;
const isDmyPeriod = (from, to) => dmyToUTC(from) <= dmyToUTC(to);
exports.isDmyPeriod = isDmyPeriod;
const isDmy = (str, minYear) => {
  const [d, m, y] = _splitStrByDash(str);
  return _isYmd(y, m, d, minYear);
};
exports.isDmy = isDmy;
const getNumberOfDays = (year, month) => new Date(year, month, 0).getDate();
exports.getNumberOfDays = getNumberOfDays;
const getNextMonthDmy = dmy => {
  const _arr = dmy.split("-"),
    month = (0, _isTypeFn.parseIntBy10)(_arr[1]),
    year = (0, _isTypeFn.parseIntBy10)(_arr[2]);
  return month < 12 ? `${getNumberOfDays(year, month + 1)}-${_pad2(month + 1)}-${year}` : `31-01-${year + 1}`;
};
exports.getNextMonthDmy = getNextMonthDmy;
const ymdToUTC = function (dateStrOrNumberYYYY, option) {
  if (option === void 0) {
    option = {};
  }
  const _arr = _splitStrByDash(dateStrOrNumberYYYY),
    _len = _arr.length,
    [yearStr, mStr, dStr] = _arr;
  if (_len === 3) {
    return Date.UTC(yearStr, _toIntMonth(mStr), dStr);
  }
  if (_len === 2 && mStr !== '') {
    const _m = (0, _isTypeFn.parseIntBy10)(mStr);
    if (!(0, _isTypeFn.isNaN)(_m)) {
      const _d = getNumberOfDays(yearStr, _m);
      return Date.UTC(yearStr, _m - 1, _d);
      // YYYY-Q format
    } else if (_isLikelyQuarter(_arr[1])) {
      const _q = (0, _isTypeFn.parseIntBy10)(_arr[1][1]);
      if ((0, _isTypeFn.isNaN)(_q)) {
        return _q;
      }
      const _d = getNumberOfDays(_arr[0], _q * 3);
      return Date.UTC(_arr[0], _q * 3 - 1, _d);
    } else {
      return _m;
    }
  }
  if (_len === 1) {
    const {
        y = 0
      } = option,
      _y = (0, _isTypeFn.parseIntBy10)(yearStr) - y;
    return !(0, _isTypeFn.isNaN)(_y) ? Date.UTC(_y, 11, 31) : _y;
  }
  return (0, _isTypeFn.isTypeNumber)(dateStrOrNumberYYYY) ? Date.UTC(dateStrOrNumberYYYY, 11, 31) : Date.UTC(yearStr, _toIntMonth(mStr), dStr);
};
exports.ymdToUTC = ymdToUTC;
const MLS_IN_DAY = 24 * 60 * 60 * 1000;
const addDaysToYmd = (ymd, numberOfDays) => isYmd(ymd) ? mlsToYmd(ymdToUTC(ymd) + numberOfDays * MLS_IN_DAY) : '';
exports.addDaysToYmd = addDaysToYmd;
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
  if (!(0, _isTypeFn.isInt)(ms)) {
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
  if (!(0, _isTypeFn.isInt)(month)) {
    return new Date(dmyToUTC(dmy));
  }
  const _to = new Date(dmyToUTC(dmy));
  return new Date(_to.setUTCMonth(_to.getUTCMonth() + month));
};
exports.addToDmy = addToDmy;
const getYTDfromDmy = dmy => {
  const _year = dmy.split('-')[2];
  return dmyToUTC(`01-01-${_year}`);
};
exports.getYTDfromDmy = getYTDfromDmy;
const getDaysFromYmd = ymd => {
  const _fromMls = ymdToUTC(ymd);
  return Math.ceil((new Date().getTime() - _fromMls) / DAY_IN_MLS);
};
exports.getDaysFromYmd = getDaysFromYmd;
const monthIndex = str => {
  if (!(0, _isTypeFn.isStr)(str)) {
    return -1;
  }
  const _monthIndex = MONTH_HP[String(str).toLowerCase()];
  return (0, _isTypeFn.isUndef)(_monthIndex) ? -1 : _monthIndex;
};
exports.monthIndex = monthIndex;
const _getStr = date => date || '',
  _getDateTokens = date => _getStr(date).split('-'),
  _isYearly = date => _getStr(date).slice(0, 5) === '31-12',
  _getDateAnnual = (date, dateTo) => _isYearly(date) && _isYearly(dateTo) ? _getStr(date).slice(6, 10) : '',
  _isEndOfMonthDay = strDay => strDay === '30' || strDay === '31',
  _getDateQuarterly = (date, dateTo) => {
    const [d1, m1, y1] = _getDateTokens(date),
      [d2, m2, y2] = _getDateTokens(dateTo),
      _intM1 = (0, _isTypeFn.parseIntBy10)(m1),
      _mDiff = _intM1 - (0, _isTypeFn.parseIntBy10)(m2),
      _yDiff = (0, _isTypeFn.parseIntBy10)(y1) - (0, _isTypeFn.parseIntBy10)(y2);
    return _intM1 % 3 === 0 && _isEndOfMonthDay(d1) && _isEndOfMonthDay(d2) && (_mDiff === 3 && _yDiff === 0 || _mDiff === -9 && _yDiff === 1) ? `Q${m1 / 3} ${y1}` : '';
  };
const getDateFromVm = _ref => {
  let {
    date,
    dateTo
  } = _ref;
  return _getDateAnnual(date, dateTo) || _getDateQuarterly(date, dateTo) || date;
};
exports.getDateFromVm = getDateFromVm;
const _toMmYyyy = (strDate, delimeter) => strDate.slice(5) + delimeter + strDate.slice(0, 4);
const formatStrDate = strDate => {
  const _strDate = _getStr(strDate);
  return _strDate[5] === 'Q' ? _toMmYyyy(_strDate, ' ') : _strDate.length === 7 && _strDate[4] === '-' ? _toMmYyyy(_strDate, '-') : _strDate;
};
exports.formatStrDate = formatStrDate;
//# sourceMappingURL=dateFn.js.map