"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.toTdmyIf = exports.toTdmy = exports.toTd = exports.toDmy = exports.formatDate = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

const format = _highcharts.default.dateFormat,
      DMY_FORMAT = '%A, %b %d, %Y',
      TDMY_FORMAT = '%H:%M, %A, %b %d, %Y',
      TD_FORMAT = '%H:%M:%S %d-%m-%Y';
const formatDate = format;
exports.formatDate = formatDate;
const toDmy = format.bind(null, DMY_FORMAT);
exports.toDmy = toDmy;
const toTdmy = format.bind(null, TDMY_FORMAT);
exports.toTdmy = toTdmy;

const toTdmyIf = mls => format('%H:%M', mls) === '00:00' ? toDmy(mls) : toTdmy(mls);

exports.toTdmyIf = toTdmyIf;
const toTd = format.bind(null, TD_FORMAT);
exports.toTd = toTd;
//# sourceMappingURL=dateFormat.js.map