'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  DF_PLACEHOLDER: 'Before Select Metric',
  YEAR_MAX: 12,
  BI_YEAR_MAX: 24,
  Q_YEAR_MAX: 4,
  M_YEAR_MAX: 3
};

var _getDfDate = function _getDfDate(dateOptions, dfIndex) {
  return (dateOptions[dfIndex] || {}).value;
};

var _addYearMonthsTo = function _addYearMonthsTo(dateOptions, y) {
  var m = new Date().getUTCMonth(),
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
  var m = new Date().getUTCMonth(),
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

var _crDateConfig = function _crDateConfig(dateOptions, mapDateDf) {
  return {
    dateOptions: dateOptions,
    dateDefault: _getDfDate(dateOptions, mapDateDf)
  };
};

var _yearMonthConfig = function _yearMonthConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var dateOptions = [],
      y = new Date().getUTCFullYear();
  for (var i = 0; i < C.M_YEAR_MAX; i++) {
    _addYearMonthsTo(dateOptions, y - i);
  }
  return _crDateConfig(dateOptions, mapDateDf);
};

var _yearQuarterConfig = function _yearQuarterConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Q';

  var dateOptions = [],
      y = new Date().getUTCFullYear();
  for (var i = 0; i < C.Q_YEAR_MAX; i++) {
    _addYearQuartesTo(dateOptions, y - i, delimeter);
  }
  return _crDateConfig(dateOptions, mapDateDf);
};

var _yearBiAnnualConfig = function _yearBiAnnualConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

  var dateOptions = [];
  var y = new Date().getUTCFullYear();
  for (var i = 0; i < C.BI_YEAR_MAX; i++) {
    dateOptions.push({ caption: y + 'S2', value: y + 'S2' }, { caption: y + 'S1', value: y + 'S1' });
    y = y - 1;
  }
  return _crDateConfig(dateOptions, mapDateDf);
};

var _yearConfig = function _yearConfig() {
  var mapDateDf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var dateOptions = [];
  var y = new Date().getUTCFullYear();
  for (var i = 0; i < C.YEAR_MAX; i++) {
    dateOptions.push({
      caption: '' + y,
      value: '' + y
    });
    y = y - 1;
  }
  return _crDateConfig(dateOptions, mapDateDf);
};

var _emptyConfig = function _emptyConfig() {
  return {
    dateDefault: C.DF_PLACEHOLDER,
    dateOptions: []
  };
};

var crDateConfig = function crDateConfig() {
  var frequency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'M';
  var mapDateDf = arguments[1];

  switch (frequency) {
    case 'M':
      return _yearMonthConfig(mapDateDf);
    case 'Q':
    case 'K':
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