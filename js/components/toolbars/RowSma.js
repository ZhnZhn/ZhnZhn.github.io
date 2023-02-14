"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fRowTaType = _interopRequireDefault(require("./fRowTaType1"));
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _helperFn = require("./helperFn");
const SMA_MONTH = '12',
  SMA_YEAR = '50';
const _crInitialSmaPeriod = config => (0, _helperFn.crInitialPeriod)(config, SMA_MONTH, SMA_YEAR);
const RowSma = (0, _fRowTaType.default)("SMA", _crInitialSmaPeriod, _IndicatorBuilder.addSmaTo);
var _default = RowSma;
exports.default = _default;
//# sourceMappingURL=RowSma.js.map