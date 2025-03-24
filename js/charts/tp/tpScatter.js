"use strict";

exports.__esModule = true;
exports.scatterExValue = exports.scatterExDividend = void 0;
var _Color = require("../../constants/Color");
var _tpFn = require("./tpFn");
const _crExDividend = _ref => {
  let {
    date,
    id,
    valueText,
    value,
    point
  } = _ref;
  const {
    exValue,
    price
  } = point;
  return `${(0, _tpFn.crHeader)(date, id)}
  <div class="tp__body">
    ${(0, _tpFn.crRow)('Ex-Dividend', exValue, {
    color: _Color.COLOR_EX_DIVIDEND
  })}
    ${(0, _tpFn.crRow)('Close', price)}
  </div>`;
};
const _crExValue = _ref2 => {
  let {
    date,
    id,
    point
  } = _ref2;
  const {
    exValue
  } = point;
  return `${(0, _tpFn.crHeader)(date, id)}
  <div class="tp__body">
    ${(0, _tpFn.crRow)('Value', exValue)}
  </div>`;
};
const scatterExDividend = exports.scatterExDividend = {
  fnTemplate: _crExDividend
};
const scatterExValue = exports.scatterExValue = {
  fnTemplate: _crExValue
};
//# sourceMappingURL=tpScatter.js.map