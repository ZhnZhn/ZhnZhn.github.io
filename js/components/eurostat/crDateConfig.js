'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nowDate = function _nowDate() {
  return new Date();
};

var _getDfDate = function _getDfDate(dateOptions, dfIndex) {
  return (dateOptions[dfIndex] || {}).value;
};

var _addYearMonthsTo = function _addYearMonthsTo(dateOptions, y) {
  var m = _nowDate().getUTCMonth(),
      _m = void 0,
      _caption = void 0,
      i = void 0;
  for (i = 0; i < 12; i++) {
    m = m - 1;
    if (m > -1) {
      _m = m + 1 > 9 ? m + 1 : '0' + (m + 1);
      _caption = y + 'M' + _m;
    } else {
      m = 11;
      y = y - 1;
      _caption = y + 'M12';
    }
    dateOptions.push({
      caption: _caption,
      value: _caption
    });
  }
};

var _addYearQuartesTo = function _addYearQuartesTo(dateOptions, y, delimeter) {
  var m = _nowDate().getUTCMonth(),
      _c = Math.floor((m + 1) / 3);
  var qNow = _c === 4 ? 3 : _c;

  var i = void 0;
  for (i = 0; i < 4; i++) {
    if (qNow < 1) {
      y = y - 1;qNow = 4;
    }
    dateOptions.push({
      caption: '' + y + delimeter + qNow,
      value: '' + y + delimeter + qNow
    });
    qNow = qNow - 1;
  }
};

var _yearMonthConfig = function _yearMonthConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var dateOptions = [],
      y = _nowDate().getUTCFullYear();
  _addYearMonthsTo(dateOptions, y);
  _addYearMonthsTo(dateOptions, y - 1);
  var dateDefault = _getDfDate(dateOptions, mapDateDf);

  return { dateOptions: dateOptions, dateDefault: dateDefault };
};

var _yearQuarterConfig = function _yearQuarterConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Q';

  var dateOptions = [],
      y = _nowDate().getUTCFullYear();

  _addYearQuartesTo(dateOptions, y, delimeter);
  _addYearQuartesTo(dateOptions, y - 1, delimeter);

  var dateDefault = _getDfDate(dateOptions, mapDateDf);

  return { dateOptions: dateOptions, dateDefault: dateDefault };
};

var _yearBiAnnualConfig = function _yearBiAnnualConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

  var dateOptions = [];
  var y = _nowDate().getUTCFullYear(),
      i = 0;
  for (; i < 4; i++) {
    dateOptions.push({ caption: y + 'S2', value: y + 'S2' }, { caption: y + 'S1', value: y + 'S1' });
    y = y - 1;
  }
  return {
    dateOptions: dateOptions,
    dateDefault: _getDfDate(dateOptions, mapDateDf)
  };
};

var _yearConfig = function _yearConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var dateOptions = [],
      dNow = _nowDate();

  var y = dNow.getUTCFullYear(),
      i = void 0;
  for (i = 0; i < 8; i++) {
    dateOptions.push({
      caption: '' + y,
      value: '' + y
    });
    y = y - 1;
  }
  var dateDefault = _getDfDate(dateOptions, mapDateDf);

  return { dateOptions: dateOptions, dateDefault: dateDefault };
};

var PLACEHOLDER = 'Before Select Metric';
var _emptyConfig = function _emptyConfig() {
  return {
    dateDefault: PLACEHOLDER,
    dateOptions: []
  };
};

var crDateConfig = function crDateConfig() {
  var frequency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'M';
  var mapDateDf = arguments[1];

  switch (frequency) {
    case 'M':
      return _yearMonthConfig(mapDateDf);
    case 'Q':case 'K':
      return _yearQuarterConfig(mapDateDf, frequency);
    case 'S':
      return _yearBiAnnualConfig();
    case 'Y':
      return _yearConfig(mapDateDf);
    case 'EMPTY':
      return _emptyConfig();
    default:
      return _yearConfig(mapDateDf);
  }
};

exports.default = crDateConfig;
//# sourceMappingURL=crDateConfig.js.map