"use strict";

exports.__esModule = true;
exports.default = void 0;
const YEAR_MAX = 12,
  BI_YEAR_MAX = 24,
  Q_YEAR_MAX = 4,
  M_YEAR_MAX = 3;
const _isEstat = loadId => loadId === 'EU_STAT';
const _crDateOption = function (caption, value) {
  if (value === void 0) {
    value = caption;
  }
  return {
    caption,
    value
  };
};
const _getDfDate = (dateOptions, dfIndex) => typeof dfIndex === 'number' ? (dateOptions[dfIndex] || {}).value || '' : '';
const _crDateConfig = function (dateOptions, mapDateDf) {
  if (dateOptions === void 0) {
    dateOptions = [];
  }
  return {
    dateOptions,
    dateDefault: _getDfDate(dateOptions, mapDateDf)
  };
};
const _addYearMonthsTo = (dateOptions, y, delimeter) => {
  let m = new Date().getUTCMonth(),
    _m,
    _caption;
  for (let i = 0; i < 12; i++) {
    m = m - 1;
    if (m > -1) {
      _m = m + 1 > 9 ? m + 1 : '0' + (m + 1);
      _caption = "" + y + delimeter + _m;
    } else {
      m = 11;
      y = y - 1;
      _caption = "" + y + delimeter + "12";
    }
    dateOptions.push(_crDateOption(_caption));
  }
};
const _addYearQuartesTo = (dateOptions, y, delimeter) => {
  const m = new Date().getUTCMonth(),
    _c = Math.floor((m + 1) / 3);
  let qNow = _c === 4 ? 3 : _c;
  for (let i = 0; i < 4; i++) {
    if (qNow < 1) {
      y = y - 1;
      qNow = 4;
    }
    dateOptions.push(_crDateOption("" + y + delimeter + qNow));
    qNow = qNow - 1;
  }
};
const _crYearMonthConfig = function (loadId, mapDateDf) {
  if (mapDateDf === void 0) {
    mapDateDf = 2;
  }
  const dateOptions = [],
    y = new Date().getUTCFullYear(),
    _delimeter = _isEstat(loadId) ? '-' : 'M';
  for (let i = 0; i < M_YEAR_MAX; i++) {
    _addYearMonthsTo(dateOptions, y - i, _delimeter);
  }
  return _crDateConfig(dateOptions, mapDateDf);
};
const _crYearQuarterConfig = function (loadId, mapDateDf, delimeter) {
  if (mapDateDf === void 0) {
    mapDateDf = 1;
  }
  const dateOptions = [],
    y = new Date().getUTCFullYear(),
    _delimeter = _isEstat(loadId) ? '-' + delimeter : delimeter;
  for (let i = 0; i < Q_YEAR_MAX; i++) {
    _addYearQuartesTo(dateOptions, y - i, _delimeter);
  }
  return _crDateConfig(dateOptions, mapDateDf);
};
const _crYearBiAnnualConfig = function (loadId, mapDateDf) {
  if (mapDateDf === void 0) {
    mapDateDf = 3;
  }
  const dateOptions = [],
    _delimeter = _isEstat(loadId) ? '-S' : 'S';
  let y = new Date().getUTCFullYear();
  for (let i = 0; i < BI_YEAR_MAX; i++) {
    dateOptions.push(_crDateOption("" + y + _delimeter + "2"), _crDateOption("" + y + _delimeter + "1"));
    y = y - 1;
  }
  return _crDateConfig(dateOptions, mapDateDf);
};
const _crYearConfig = function (loadId, mapDateDf) {
  if (mapDateDf === void 0) {
    mapDateDf = 1;
  }
  const dateOptions = [];
  let y = new Date().getUTCFullYear();
  for (let i = 0; i < YEAR_MAX; i++) {
    dateOptions.push(_crDateOption('' + y));
    y = y - 1;
  }
  return _crDateConfig(dateOptions, mapDateDf);
};
const _hmCr = {
  M: _crYearMonthConfig,
  Q: _crYearQuarterConfig,
  K: _crYearQuarterConfig,
  S: _crYearBiAnnualConfig,
  Y: _crYearConfig,
  EMPTY: _crDateConfig,
  DF: _crYearConfig
};
const crDateConfig = function (frequency, mapDateDf, loadId) {
  if (frequency === void 0) {
    frequency = 'M';
  }
  return (_hmCr[frequency] || _hmCr.DF)(loadId, mapDateDf, frequency);
};
var _default = crDateConfig;
exports.default = _default;
//# sourceMappingURL=crDateConfig.js.map