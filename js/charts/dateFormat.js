"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var format = _highcharts["default"].dateFormat,
    DMY_FORMAT = '%A, %b %d, %Y',
    TDMY_FORMAT = '%H:%M, %A, %b %d, %Y',
    TD_FORMAT = '%H:%M:%S %d-%m-%Y';
var dateFormat = {
  toDmy: format.bind(null, DMY_FORMAT),
  toTdmy: format.bind(null, TDMY_FORMAT),
  toTdmyIf: function toTdmyIf(mls) {
    return format('%H:%M', mls) === '00:00' ? dateFormat.toDmy(mls) : dateFormat.toTdmy(mls);
  },
  toTd: format.bind(null, TD_FORMAT)
};
var _default = dateFormat;
exports["default"] = _default;
//# sourceMappingURL=dateFormat.js.map