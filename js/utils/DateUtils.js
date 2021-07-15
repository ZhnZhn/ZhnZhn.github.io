"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var MIN_YEAR = 1990;
var DAY_IN_MLS = 1000 * 60 * 60 * 24;

var _currentYear;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _isNaN = Number.isNaN;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var _pad2 = function _pad2(n) {
  return n < 10 ? '0' + n : '' + n;
};

var _toIntMonth = function _toIntMonth(str) {
  return parseInt(str, 10) - 1;
};

var _splitDateStr = function _splitDateStr(str) {
  return (str || '').toString().split('-');
};

var _isLikelyQuarter = function _isLikelyQuarter(str) {
  return _isStr(str) && str[0].toUpperCase() === 'Q';
};

var _notInIntervalStrict = function _notInIntervalStrict(n, min, max) {
  return _isNaN(n) || n < min || n > max;
};

var _notInLengthMinMax = function _notInLengthMinMax(str, length, min, max) {
  return _isStr(str) && str.length !== length || _notInIntervalStrict(parseInt(str, 10), min, max) ? true : false;
};

var _isYmd = function _isYmd(yStr, mStr, dStr, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$nForecastDate = _ref.nForecastDate,
      nForecastDate = _ref$nForecastDate === void 0 ? 0 : _ref$nForecastDate,
      _ref$minYear = _ref.minYear,
      minYear = _ref$minYear === void 0 ? MIN_YEAR : _ref$minYear;

  var _nowYear = new Date().getFullYear();

  if (_notInLengthMinMax(yStr, 4, minYear, _nowYear + nForecastDate) || _notInLengthMinMax(mStr, 2, 1, 12) || _notInLengthMinMax(dStr, 2, 1, 31)) {
    return false;
  }

  return true;
};

var _getDaysInYm = function _getDaysInYm(y, m) {
  return new Date(y, m, 0).getDate();
};

var _getTimeUTC = function _getTimeUTC(d) {
  return _pad2(d.getUTCHours()) + ":" + _pad2(d.getUTCMinutes());
};

var _getYmdUTC = function _getYmdUTC(d, yearMinus) {
  return d.getUTCFullYear() - yearMinus + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2);
};

var MONTH_HP = {
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
var DateUtils = {
  //YYYY-MM-DD valid format
  isYmd: function isYmd(str, nForecastDate, minYear) {
    if (nForecastDate === void 0) {
      nForecastDate = 0;
    }

    if (minYear === void 0) {
      minYear = MIN_YEAR;
    }

    if (!_isStr(str)) {
      return false;
    }

    var _str = str.trim();

    if (_str.length !== 10) {
      return false;
    }

    var _str$split = _str.split('-'),
        y = _str$split[0],
        m = _str$split[1],
        d = _str$split[2];

    return _isYmd(y, m, d, {
      nForecastDate: nForecastDate,
      minYear: minYear
    });
  },
  isYmdOrEmpty: function isYmdOrEmpty(str) {
    return str === '' ? true : DateUtils.isYmd(str);
  },
  getFromDate: function getFromDate(yearMinus) {
    if (yearMinus === void 0) {
      yearMinus = 2;
    }

    var dNow = new Date();
    return _getYmdUTC(dNow, yearMinus);
  },
  getToDate: function getToDate() {
    return DateUtils.getFromDate(0);
  },
  //YYYY-MM-DD
  getYear: function getYear(str) {
    return (str || '').split('-')[0];
  },
  getCurrentYear: function getCurrentYear() {
    return _currentYear ? _currentYear : _currentYear = DateUtils.getYear(DateUtils.getFromDate(0));
  },
  getYmdhmUTC: function getYmdhmUTC(date) {
    var _d = date || new Date();

    return _getYmdUTC(_d, 0) + " " + _getTimeUTC(_d) + " UTC";
  },
  mlsToDmy: function mlsToDmy(mlsUTC) {
    if (!(_isNumber(mlsUTC) && isFinite(mlsUTC))) {
      return '';
    }

    var d = new Date(mlsUTC);

    if (d.toString() === 'Invalid Date') {
      return '';
    }

    return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
  },
  dmyToUTC: function dmyToUTC(str) {
    var _splitDateStr2 = _splitDateStr(str),
        d = _splitDateStr2[0],
        m = _splitDateStr2[1],
        y = _splitDateStr2[2];

    return _isYmd(y, m, d) ? Date.UTC(y, _toIntMonth(m), d) : NaN;
  },
  isDmyPeriod: function isDmyPeriod(from, to) {
    return DateUtils.dmyToUTC(from) <= DateUtils.dmyToUTC(to);
  },
  isDmy: function isDmy(str, minYear) {
    if (minYear === void 0) {
      minYear = MIN_YEAR;
    }

    var _splitDateStr3 = _splitDateStr(str),
        d = _splitDateStr3[0],
        m = _splitDateStr3[1],
        y = _splitDateStr3[2];

    return _isYmd(y, m, d, {
      minYear: minYear
    });
  },
  ymdToUTC: function ymdToUTC(dateStr, option) {
    if (option === void 0) {
      option = {};
    }

    var _arr = _splitDateStr(dateStr),
        _len = _arr.length,
        yearStr = _arr[0],
        mStr = _arr[1],
        dStr = _arr[2];

    if (_len === 3) {
      return Date.UTC(yearStr, _toIntMonth(mStr), dStr);
    }

    if (_len === 2 && mStr !== '') {
      var _m = parseInt(mStr, 10);

      if (!_isNaN(_m)) {
        var _d = _getDaysInYm(yearStr, _m);

        return Date.UTC(yearStr, _m - 1, _d); // YYYY-Q format
      } else if (_isLikelyQuarter(_arr[1])) {
        var _q = parseInt(_arr[1][1], 10);

        if (_isNaN(_q)) {
          return _q;
        }

        var _d2 = _getDaysInYm(_arr[0], _q * 3);

        return Date.UTC(_arr[0], _q * 3 - 1, _d2);
      } else {
        return _m;
      }
    }

    if (_len === 1) {
      var _option = option,
          _option$y = _option.y,
          y = _option$y === void 0 ? 0 : _option$y,
          _y = parseInt(yearStr, 10) - y;

      return !_isNaN(_y) ? Date.UTC(_y, 11, 31) : _y;
    }

    return Date.UTC(yearStr, _toIntMonth(mStr), dStr);
  },
  ymdhmsToUTC: function ymdhmsToUTC(dateStr, dtDelimeter) {
    if (dtDelimeter === void 0) {
      dtDelimeter = ' ';
    }

    var _split = (dateStr || '').split(dtDelimeter),
        ymdStr = _split[0],
        _split$ = _split[1],
        hmsStr = _split$ === void 0 ? '' : _split$,
        _ymdStr$split = ymdStr.split('-'),
        yearStr = _ymdStr$split[0],
        monthStr = _ymdStr$split[1],
        dayStr = _ymdStr$split[2],
        _hmsStr$split = hmsStr.split(':'),
        _hmsStr$split$ = _hmsStr$split[0],
        hourStr = _hmsStr$split$ === void 0 ? '' : _hmsStr$split$,
        _hmsStr$split$2 = _hmsStr$split[1],
        minuteStr = _hmsStr$split$2 === void 0 ? '' : _hmsStr$split$2,
        _hmsStr$split$3 = _hmsStr$split[2],
        secondStr = _hmsStr$split$3 === void 0 ? '' : _hmsStr$split$3;

    return Date.UTC(yearStr, _toIntMonth(monthStr), dayStr, hourStr, minuteStr, secondStr);
  },
  getUTCTime: function getUTCTime(ms) {
    if (!Number.isInteger(ms)) {
      return '';
    }

    var _d = new Date(ms);

    return _getTimeUTC(_d);
  },
  addToDmy: function addToDmy(dmy, month) {
    if (!DateUtils.isDmy(dmy)) {
      return new Date(0);
    }

    if (!Number.isInteger(month)) {
      return new Date(DateUtils.dmyToUTC(dmy));
    }

    var _to = new Date(DateUtils.dmyToUTC(dmy));

    return new Date(_to.setUTCMonth(_to.getUTCMonth() + month));
  },
  getYTDfromDmy: function getYTDfromDmy(dmy) {
    var _year = dmy.split('-')[2];
    return DateUtils.dmyToUTC("01-01-" + _year);
  },
  getDaysFromYmd: function getDaysFromYmd(ymd) {
    var _fromMls = DateUtils.ymdToUTC(ymd);

    return Math.ceil((new Date().getTime() - _fromMls) / DAY_IN_MLS);
  },
  monthIndex: function monthIndex(str) {
    if (!_isStr(str)) {
      return -1;
    }

    var _monthIndex = MONTH_HP[String(str).toLowerCase()];
    return _isUndef(_monthIndex) ? -1 : _monthIndex;
  }
};
var _default = DateUtils;
exports["default"] = _default;
//# sourceMappingURL=DateUtils.js.map