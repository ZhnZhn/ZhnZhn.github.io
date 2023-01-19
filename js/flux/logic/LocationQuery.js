"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));
var _dateFn = require("../../utils/dateFn");
const _toOptions = params => {
  const _options = Object.create(null);
  params.forEach((value, key) => {
    _options[key] = (0, _domSanitize.default)(value);
  });
  return _options;
};
const crOptions = params => {
  const _options = _toOptions(params),
    {
      v,
      bT,
      cT,
      cN,
      fD,
      tD
    } = _options;
  return {
    ..._options,
    title: v,
    key: v,
    value: v,
    browserType: bT,
    chartType: cT,
    columnName: cN,
    fromDate: fD,
    toDate: tD || (0, _dateFn.getToDate)()
  };
};
const LocationQuery = {
  crOptions
};
var _default = LocationQuery;
exports.default = _default;
//# sourceMappingURL=LocationQuery.js.map