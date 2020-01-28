"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var MIN_YEAR = 1990;

var _isNaN = Number.isNaN || isNaN;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _pad2 = function _pad2(n) {
  return n < 10 ? '0' + n : '' + n;
};

var _isLikelyQuarter = function _isLikelyQuarter(str) {
  return _isStr(str) && str[0].toUpperCase() === 'Q';
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

    if (typeof str !== 'string') {
      return false;
    }

    var _str = str.trim();

    if (_str.length !== 10) {
      return false;
    } // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'


    var m = _str.match(/(\d{4})-(\d{2})-(\d{2})/); // STR IS NOT FIT m IS NOT OBJECT


    if (m === null || typeof m !== 'object' || m.length !== 4) {
      return false;
    }

    var thisYear = new Date().getFullYear(); // YEAR CHECK

    if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear + nForecastDate) {
      return false;
    } // MONTH CHECK


    if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
      return false;
    } // DAY CHECK


    if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
      return false;
    }

    return true;
  },
  isYmdOrEmpty: function isYmdOrEmpty(str) {
    return str === '' ? true : DateUtils.isYmd(str);
  },
  getFromDate: function getFromDate(yearMinus) {
    if (yearMinus === void 0) {
      yearMinus = 2;
    }

    var dNow = new Date();
    return dNow.getUTCFullYear() - yearMinus + "-" + ("0" + (dNow.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + dNow.getUTCDate()).slice(-2);
  },
  getToDate: function getToDate() {
    return DateUtils.getFromDate(0);
  },
  mlsToDmy: function mlsToDmy(mlsUTC) {
    if (typeof mlsUTC !== 'number' || !isFinite(mlsUTC)) {
      return '';
    }

    var d = new Date(mlsUTC);

    if (d.toString() === 'Invalid Date') {
      return '';
    }

    return ("0" + d.getUTCDate()).slice(-2) + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + d.getUTCFullYear();
  },
  dmyToUTC: function dmyToUTC(str) {
    var _str = str || '',
        _str$toString$split = _str.toString().split('-'),
        _str$toString$split$ = _str$toString$split[0],
        d = _str$toString$split$ === void 0 ? 10 : _str$toString$split$,
        _str$toString$split$2 = _str$toString$split[1],
        m = _str$toString$split$2 === void 0 ? 10 : _str$toString$split$2,
        _str$toString$split$3 = _str$toString$split[2],
        y = _str$toString$split$3 === void 0 ? 1970 : _str$toString$split$3;

    if (DateUtils.isYmd(y + "-" + m + "-" + d)) {
      return Date.UTC(y, parseInt(m, 10) - 1, d);
    } else {
      return 0;
    }
  },
  dmyToMls: function dmyToMls(str) {
    var _str = str || '',
        _str$toString$split2 = _str.toString().split('-'),
        d = _str$toString$split2[0],
        m = _str$toString$split2[1],
        y = _str$toString$split2[2];

    return Date.UTC(y, parseInt(m, 10) - 1, d);
  },
  isDmyPeriod: function isDmyPeriod(from, to) {
    return DateUtils.dmyToMls(from) <= DateUtils.dmyToMls(to);
  },
  isDmy: function isDmy(str, minYear) {
    if (minYear === void 0) {
      minYear = MIN_YEAR;
    }

    var _str = str || '',
        _str$toString$split3 = _str.toString().split('-'),
        _str$toString$split3$ = _str$toString$split3[0],
        d = _str$toString$split3$ === void 0 ? 10 : _str$toString$split3$,
        _str$toString$split3$2 = _str$toString$split3[1],
        m = _str$toString$split3$2 === void 0 ? 10 : _str$toString$split3$2,
        _str$toString$split3$3 = _str$toString$split3[2],
        y = _str$toString$split3$3 === void 0 ? minYear - 1 : _str$toString$split3$3;

    return DateUtils.isYmd(y + "-" + m + "-" + d, 0, minYear);
  },
  ymdToUTC: function ymdToUTC(dateStr) {
    var _arr = dateStr.split('-'),
        _len = _arr.length;

    if (_len === 3) {
      return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _arr[2]);
    } else if (_len === 2 && _arr[1] !== '') {
      var _m = parseInt(_arr[1], 10);

      if (!_isNaN(_m)) {
        var _d = new Date(_arr[0], _m, 0).getDate();

        return Date.UTC(_arr[0], _m - 1, _d); // YYYY-Q format
      } else if (_isLikelyQuarter(_arr[1])) {
        var _q = parseInt(_arr[1][1], 10);

        return !_isNaN(_q) ? Date.UTC(_arr[0], _q * 3 - 1, 30) : _q;
      } else {
        return _m;
      }
    } else if (_len === 1) {
      return Date.UTC(_arr[0], 11, 31);
    }
  },
  ymdtToUTC: function ymdtToUTC(dateStr) {
    var _arr = dateStr.split('-'),
        _d = _arr[2].split(' ')[0];

    return Date.UTC(_arr[0], parseInt(_arr[1], 10) - 1, _d);
  },
  ymdhmsToUTC: function ymdhmsToUTC(dateStr) {
    var _dtArr = dateStr.split(' '),
        _ymdArr = _dtArr[0].split('-'),
        _hmsArr = _dtArr[1].split(':');

    return Date.UTC(_ymdArr[0], parseInt(_ymdArr[1], 10) - 1, _ymdArr[2], _hmsArr[0], _hmsArr[1], _hmsArr[2]);
  },
  getUTCTime: function getUTCTime(ms) {
    if (!Number.isInteger(ms)) {
      return '';
    }

    var _d = new Date(ms);

    return _pad2(_d.getUTCHours()) + ":" + _pad2(_d.getUTCMinutes());
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
  }
};
var _default = DateUtils;
exports["default"] = _default;
//# sourceMappingURL=DateUtils.js.map