"use strict";

exports.__esModule = true;
exports.crInitialPeriod = void 0;
const _isArray = Array.isArray,
  _getSeriaData = config => (((config || {}).series || [])[0] || {}).data;
const crInitialPeriod = function (config, MONTH, YEAR, yearLength) {
  if (yearLength === void 0) {
    yearLength = 150;
  }
  const _d = _getSeriaData(config);
  return !_isArray(_d) ? '0' : _d.length > yearLength ? YEAR : MONTH;
};
exports.crInitialPeriod = crInitialPeriod;
//# sourceMappingURL=helperFn.js.map