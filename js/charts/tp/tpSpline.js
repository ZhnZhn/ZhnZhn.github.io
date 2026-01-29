"use strict";

exports.__esModule = true;
exports.splineValueTdmyIf = exports.splineValueDmy = void 0;
var _dateFormatFn = require("../../utils/dateFormatFn");
var _tpFn = require("./tpFn");
const _crValue = _ref => {
  let {
    date,
    id,
    color,
    valueText = 'Value',
    value,
    point
  } = _ref;
  const status = (0, _tpFn.getStatus)(point);
  return `${(0, _tpFn.crHeader)(date, id)}
  <div class="tp__body">
    ${(0, _tpFn.crRow)(valueText, value, {
    color,
    status
  })}
  </div>`;
};
const _splineOptions = {
  fnTemplate: _crValue,
  isWithColor: true,
  isWithValueText: true,
  isWithValue: true
};
const splineValueDmy = exports.splineValueDmy = _splineOptions;
const splineValueTdmyIf = exports.splineValueTdmyIf = {
  ..._splineOptions,
  fnDateFormat: _dateFormatFn.toTdmyIf
};
//# sourceMappingURL=tpSpline.js.map