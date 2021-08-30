"use strict";

exports.__esModule = true;
exports.default = void 0;
const C = {
  YEAR_MAX: 12,
  BI_YEAR_MAX: 24,
  Q_YEAR_MAX: 4,
  M_YEAR_MAX: 3
};

const _crDateOption = (caption, value = caption) => ({
  caption,
  value
});

const _getDfDate = (dateOptions, dfIndex) => {
  return typeof dfIndex === 'number' ? (dateOptions[dfIndex] || {}).value || '' : '';
};

const _crDateConfig = (dateOptions = [], mapDateDf) => ({
  dateOptions,
  dateDefault: _getDfDate(dateOptions, mapDateDf)
});

const _addYearMonthsTo = (dateOptions, y) => {
  let m = new Date().getUTCMonth(),
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

    dateOptions.push(_crDateOption(_caption));
  }
};

const _addYearQuartesTo = (dateOptions, y, delimeter) => {
  const m = new Date().getUTCMonth(),
        _c = Math.floor((m + 1) / 3);

  let qNow = _c === 4 ? 3 : _c;
  let i;

  for (i = 0; i < 4; i++) {
    if (qNow < 1) {
      y = y - 1;
      qNow = 4;
    }

    dateOptions.push(_crDateOption("" + y + delimeter + qNow));
    qNow = qNow - 1;
  }
};

const _crYearMonthConfig = (mapDateDf = 2) => {
  const dateOptions = [],
        y = new Date().getUTCFullYear();

  for (let i = 0; i < C.M_YEAR_MAX; i++) {
    _addYearMonthsTo(dateOptions, y - i);
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

const _crYearQuarterConfig = (mapDateDf = 1, delimeter) => {
  const dateOptions = [],
        y = new Date().getUTCFullYear();

  for (let i = 0; i < C.Q_YEAR_MAX; i++) {
    _addYearQuartesTo(dateOptions, y - i, delimeter);
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

const _crYearBiAnnualConfig = (mapDateDf = 3) => {
  const dateOptions = [];
  let y = new Date().getUTCFullYear();

  for (let i = 0; i < C.BI_YEAR_MAX; i++) {
    dateOptions.push(_crDateOption(y + "S2"), _crDateOption(y + "S1"));
    y = y - 1;
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

const _crYearConfig = function (mapDateDf = 1) {
  const dateOptions = [];
  let y = new Date().getUTCFullYear();

  for (let i = 0; i < C.YEAR_MAX; i++) {
    dateOptions.push(_crDateOption('' + y));
    y = y - 1;
  }

  return _crDateConfig(dateOptions, mapDateDf);
};

const crDateConfig = (frequency = 'M', mapDateDf) => {
  switch (frequency) {
    case 'M':
      return _crYearMonthConfig(mapDateDf);

    case 'Q':
    case 'K':
      return _crYearQuarterConfig(mapDateDf, frequency);

    case 'S':
      return _crYearBiAnnualConfig(mapDateDf);

    case 'Y':
      return _crYearConfig(mapDateDf);

    case 'EMPTY':
      return _crDateConfig();

    default:
      return _crYearConfig(mapDateDf);
  }
};

var _default = crDateConfig;
exports.default = _default;
//# sourceMappingURL=crDateConfig.js.map