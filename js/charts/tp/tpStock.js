"use strict";

exports.__esModule = true;
exports.stockAth = void 0;
var _tpFn = require("./tpFn");
const CL_TP_BODY = "tp__body";
const _crAtn = _ref => {
  let {
    date,
    id,
    value,
    point
  } = _ref;
  const {
    color,
    y,
    close,
    open
  } = point;
  return `${(0, _tpFn.crHeader)(date, id)}
    <div class="${CL_TP_BODY}">
      ${(0, _tpFn.crRow)('ATH', y + '%', {
    color
  })}
      ${(0, _tpFn.crRow)('Prev Close', close)}
      ${(0, _tpFn.crRow)('Next Open', open)}
    </div>`;
};
const stockAth = exports.stockAth = {
  fnTemplate: _crAtn
};
//# sourceMappingURL=tpStock.js.map