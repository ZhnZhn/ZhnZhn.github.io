"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toTdmyIf = exports.toTdmy = exports.toTd = exports.toDmy = exports.formatDate = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _bindTo = require("../utils/bindTo");
const formatDate = exports.formatDate = _highcharts.default.dateFormat;
const DMY_FORMAT_CONFIG = '%A, %b %d, %Y',
  TDMY_FORMAT_CONFIG = '%H:%M, %A, %b %d, %Y',
  TD_FORMAT_CONFIG = '%H:%M:%S %d-%m-%Y';
const toDmy = exports.toDmy = (0, _bindTo.bindTo)(formatDate, DMY_FORMAT_CONFIG);
const toTdmy = exports.toTdmy = (0, _bindTo.bindTo)(formatDate, TDMY_FORMAT_CONFIG);
const toTdmyIf = mls => formatDate('%H:%M', mls) === '00:00' ? toDmy(mls) : toTdmy(mls);
exports.toTdmyIf = toTdmyIf;
const toTd = exports.toTd = (0, _bindTo.bindTo)(formatDate, TD_FORMAT_CONFIG);
//# sourceMappingURL=dateFormat.js.map