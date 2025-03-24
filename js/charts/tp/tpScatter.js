"use strict";

exports.__esModule = true;
exports.scatterExValue = exports.scatterExDividend = void 0;
var _tpFn = require("./tpFn");
var _Colors = require("./Colors");
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
    color: _Colors.EX_DIVIDEND_COLOR
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