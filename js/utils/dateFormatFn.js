"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toWmdy = exports.toTdmyIf = exports.toTdSafe = exports.toDmy = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _bindTo = require("./bindTo");
var _isTypeFn = require("./isTypeFn");
const formatDate = _highcharts.default.dateFormat,
  WMDY_FORMAT_CONFIG = '%A, %b %d, %Y',
  TDMY_FORMAT_CONFIG = `%H:%M, ${WMDY_FORMAT_CONFIG}`,
  DMY_FORMAT_CONFIG = '%d-%m-%Y',
  TD_FORMAT_CONFIG = `%H:%M:%S ${DMY_FORMAT_CONFIG}`;
const toWmdy = exports.toWmdy = (0, _bindTo.bindTo)(formatDate, WMDY_FORMAT_CONFIG);
const toTdmy = (0, _bindTo.bindTo)(formatDate, TDMY_FORMAT_CONFIG);
const toTdmyIf = mls => {
  let _strDate = toTdmy(mls);
  return _strDate.slice(0, 5) === "00:00" ? _strDate.slice(7) : _strDate;
};
exports.toTdmyIf = toTdmyIf;
const toDmy = exports.toDmy = (0, _bindTo.bindTo)(formatDate, DMY_FORMAT_CONFIG);
const toTd = (0, _bindTo.bindTo)(formatDate, TD_FORMAT_CONFIG);
const toTdSafe = mls => (0, _isTypeFn.isNumber)(mls) ? toTd(mls) : '';
exports.toTdSafe = toTdSafe;
//# sourceMappingURL=dateFormatFn.js.map