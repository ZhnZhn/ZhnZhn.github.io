"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fRowTaType = _interopRequireDefault(require("./fRowTaType1"));
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _helperFn = require("./helperFn");
const RSI_MONTH = '14',
  RSI_YEAR = '30';
const _crInitialRsiPeriod = config => (0, _helperFn.crInitialPeriod)(config, RSI_MONTH, RSI_YEAR);
const RowRsi = (0, _fRowTaType.default)("RSI", _crInitialRsiPeriod, _IndicatorBuilder.addRsiTo);
var _default = RowRsi;
exports.default = _default;
//# sourceMappingURL=RowRsi.js.map