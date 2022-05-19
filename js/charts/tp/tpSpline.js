"use strict";

exports.__esModule = true;
exports.splineValueTdmyIf = exports.splineValueDmy = void 0;

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
  return (0, _tpFn.crHeader)(date, id) + "\n  <div class=\"tp__body\">\n    " + (0, _tpFn.crRow)(valueText, value, {
    color,
    status
  }) + "\n  </div>";
};

const _splineOptions = {
  fnTemplate: _crValue,
  isWithColor: true,
  isWithValueText: true,
  isWithValue: true
};
const splineValueDmy = _splineOptions;
exports.splineValueDmy = splineValueDmy;
const splineValueTdmyIf = { ..._splineOptions,
  fnDateFormat: _tpFn.toTdmyIf
};
exports.splineValueTdmyIf = splineValueTdmyIf;
//# sourceMappingURL=tpSpline.js.map