"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

const {
  crHeader,
  crRow,
  crNotEmptySpan,
  toTdmy,
  toTdmyIf
} = _tpFn.default;
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
  return crHeader(date, id) + "\n  <div class=\"" + CL_TP_BODY + "\">\n    " + crRow('Volume', value) + "\n    <div class=\"" + CL_TP_ROW + "\">\n      " + crNotEmptySpan('Open', _open) + "\n      " + crNotEmptySpan('Close', _close) + "\n    </div>\n    <div class=\"" + CL_TP_ROW + "\">\n      " + crNotEmptySpan('Low', _low) + "\n      " + crNotEmptySpan('High', _high) + "\n    </div>\n  </div>";
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
  return crHeader(date, id) + "\n    <div class=\"" + CL_TP_BODY + "\">\n      " + crRow('ATH', y + '%', {
    color
  }) + "\n      " + crRow('Prev Close', close) + "\n      " + crRow('Next Open', open) + "\n    </div>";
};

const tpStock = {
  volume: {
    fnTemplate: _crVolume,
    isWithValue: true
  },
  volumeTdmy: {
    fnTemplate: _crVolume,
    fnDateFormat: toTdmy,
    isWithValue: true
  },
  volumeTdmyIf: {
    fnTemplate: _crVolume,
    fnDateFormat: toTdmyIf,
    isWithValue: true
  },
  ath: {
    fnTemplate: _crAtn
  }
};
var _default = tpStock;
exports.default = _default;
//# sourceMappingURL=tpStock.js.map