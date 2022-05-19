"use strict";

exports.__esModule = true;
exports.stockVolumeTdmyIf = exports.stockAth = void 0;

var _tpFn = require("./tpFn");

const CL_TP_BODY = "tp__body",
      CL_TP_ROW = "tp__row";

const _crVolume = _ref => {
  let {
    date,
    id,
    value,
    point
  } = _ref;
  const {
    _open,
    _close,
    _low,
    _high
  } = point;
  return (0, _tpFn.crHeader)(date, id) + "\n  <div class=\"" + CL_TP_BODY + "\">\n    " + (0, _tpFn.crRow)('Volume', value) + "\n    <div class=\"" + CL_TP_ROW + "\">\n      " + (0, _tpFn.crNotEmptySpan)('Open', _open) + "\n      " + (0, _tpFn.crNotEmptySpan)('Close', _close) + "\n    </div>\n    <div class=\"" + CL_TP_ROW + "\">\n      " + (0, _tpFn.crNotEmptySpan)('Low', _low) + "\n      " + (0, _tpFn.crNotEmptySpan)('High', _high) + "\n    </div>\n  </div>";
};

const _crAtn = _ref2 => {
  let {
    date,
    id,
    value,
    point
  } = _ref2;
  const {
    color,
    y,
    close,
    open
  } = point;
  return (0, _tpFn.crHeader)(date, id) + "\n    <div class=\"" + CL_TP_BODY + "\">\n      " + (0, _tpFn.crRow)('ATH', y + '%', {
    color
  }) + "\n      " + (0, _tpFn.crRow)('Prev Close', close) + "\n      " + (0, _tpFn.crRow)('Next Open', open) + "\n    </div>";
};

const stockVolumeTdmyIf = {
  fnTemplate: _crVolume,
  fnDateFormat: _tpFn.toTdmyIf,
  isWithValue: true
};
exports.stockVolumeTdmyIf = stockVolumeTdmyIf;
const stockAth = {
  fnTemplate: _crAtn
};
exports.stockAth = stockAth;
//# sourceMappingURL=tpStock.js.map