"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _dompurify = _interopRequireDefault(require("dompurify"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _renamePropName = function _renamePropName(_ref) {
  var bT = _ref.bT,
      cT = _ref.cT,
      v = _ref.v,
      cN = _ref.cN,
      fD = _ref.fD,
      tD = _ref.tD;

  var _v = _dompurify["default"].sanitize(v);

  return {
    title: _v,
    key: _v,
    value: _v,
    browserType: bT,
    chartType: cT,
    columnName: cN,
    fromDate: fD,
    toDate: tD || _DateUtils["default"].getToDate()
  };
};

var _crOptions = function _crOptions(obj) {
  return Object.assign(_renamePropName(obj), obj);
};

var LocationQuery = {
  toOptions: _crOptions
};
var _default = LocationQuery;
exports["default"] = _default;
//# sourceMappingURL=LocationQuery.js.map