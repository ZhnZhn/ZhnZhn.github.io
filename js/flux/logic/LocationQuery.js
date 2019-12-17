"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _renamePropName = function _renamePropName(obj) {
  var bT = obj.bT,
      cT = obj.cT,
      v = obj.v,
      cN = obj.cN,
      fD = obj.fD,
      tD = obj.tD;
  return {
    browserType: bT,
    chartType: cT,
    value: v,
    columnName: cN,
    fromDate: fD,
    toDate: tD
  };
};

var _crOptions = function _crOptions(obj) {
  var options = _renamePropName(obj);

  var toDate = options.toDate,
      value = options.value;
  return Object.assign({}, options, obj, {
    toDate: toDate || _DateUtils["default"].getToDate(),
    title: value,
    key: value
  });
};

var LocationQuery = {
  toOptions: function toOptions(obj) {
    var options = _crOptions(obj);

    return options;
  }
};
var _default = LocationQuery;
exports["default"] = _default;
//# sourceMappingURL=LocationQuery.js.map