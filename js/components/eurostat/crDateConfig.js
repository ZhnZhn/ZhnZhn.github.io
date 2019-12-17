"use strict";

exports.__esModule = true;
exports["default"] = void 0;
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
      _m,
      _caption,
      i;

  for (i = 0; i < 12; i++) {
    m = m - 1;

    if (m > -1) {
      _m = m + 1 > 9 ? m + 1 : '0' + (m + 1);
      _caption = y + "M" + _m;
    } else {
      m = 11;
      y = y - 1;
      _caption = y + "M12";
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
  var i;

  for (i = 0; i < 4; i++) {
    if (qNow < 1) {
      y = y - 1;
      qNow = 4;
    }

    dateOptions.push({
      caption: "" + y + delimeter + qNow,
      value: "" + y + delimeter + qNow
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

var _yearMonthConfig = function _yearMonthConfig(mapDateDf) {
  if (mapDateDf === void 0) {
    mapDateDf = 2;
  }

  var dateOptions = [],
      y = new Date().getUTCFullYear();

  for (var i = 0; i < C.M_YEAR_MAX; i++) {
    _addYearMonthsTo(dateOptions, y - i);
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

var _yearQuarterConfig = function _yearQuarterConfig(mapDateDf, delimeter) {
  if (mapDateDf === void 0) {
    mapDateDf = 1;
  }

  if (delimeter === void 0) {
    delimeter = 'Q';
  }

  var dateOptions = [],
      y = new Date().getUTCFullYear();

  for (var i = 0; i < C.Q_YEAR_MAX; i++) {
    _addYearQuartesTo(dateOptions, y - i, delimeter);
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

var _yearBiAnnualConfig = function _yearBiAnnualConfig(mapDateDf) {
  if (mapDateDf === void 0) {
    mapDateDf = 3;
  }

  var dateOptions = [];
  var y = new Date().getUTCFullYear();

  for (var i = 0; i < C.BI_YEAR_MAX; i++) {
    dateOptions.push({
      caption: y + "S2",
      value: y + "S2"
    }, {
      caption: y + "S1",
      value: y + "S1"
    });
    y = y - 1;
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

var _yearConfig = function _yearConfig(mapDateDf) {
  if (mapDateDf === void 0) {
    mapDateDf = 1;
  }

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

var crDateConfig = function crDateConfig(frequency, mapDateDf) {
  if (frequency === void 0) {
    frequency = 'M';
  }

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

var _default = crDateConfig;
exports["default"] = _default;
//# sourceMappingURL=crDateConfig.js.map