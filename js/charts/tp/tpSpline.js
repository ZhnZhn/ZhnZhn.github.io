"use strict";

exports.__esModule = true;
exports.default = void 0;

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
const tpSpline = {
  vDmy: _splineOptions,
  vTdmy: { ..._splineOptions,
    fnDateFormat: _tpFn.toTdmy
  },
  vTdmyIf: { ..._splineOptions,
    fnDateFormat: _tpFn.toTdmyIf
  }
};
var _default = tpSpline;
exports.default = _default;
//# sourceMappingURL=tpSpline.js.map