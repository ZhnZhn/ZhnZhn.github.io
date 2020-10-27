"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _toOptions = function _toOptions(params) {
  var _options = {};
  params.forEach(function (value, key) {
    _options[key] = _dompurify["default"].sanitize(value);
  });
  return _options;
};

var _crOptions = function _crOptions(params) {
  var _options = _toOptions(params),
      v = _options.v,
      bT = _options.bT,
      cT = _options.cT,
      cN = _options.cN,
      fD = _options.fD,
      tD = _options.tD;

  return (0, _extends2["default"])({}, _options, {
    title: v,
    key: v,
    value: v,
    browserType: bT,
    chartType: cT,
    columnName: cN,
    fromDate: fD,
    toDate: tD || _DateUtils["default"].getToDate()
  });
};

var LocationQuery = {
  toOptions: _crOptions
};
var _default = LocationQuery;
exports["default"] = _default;
//# sourceMappingURL=LocationQuery.js.map