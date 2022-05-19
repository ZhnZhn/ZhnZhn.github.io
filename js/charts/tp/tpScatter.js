"use strict";

exports.__esModule = true;
exports.scatterSplitRatio = exports.scatterExValue = exports.scatterExDividend = void 0;

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
  return (0, _tpFn.crHeader)(date, id) + "\n  <div class=\"tp__body\">\n    " + (0, _tpFn.crRow)('Ex-Dividend', exValue, {
    color: _Colors.EX_DIVIDEND_COLOR
  }) + "\n    " + (0, _tpFn.crRow)('Close', price) + "\n  </div>";
};

const _crSplitRatio = _ref2 => {
  let {
    date,
    id,
    valueText,
    value,
    point
  } = _ref2;
  const {
    splitRatio,
    price
  } = point;
  return (0, _tpFn.crHeader)(date, id) + "\n  <div class=\"tp__body\">\n    " + (0, _tpFn.crRow)('Split Ratio', splitRatio, {
    color: _Colors.SPLIT_RATIO_COLOR
  }) + "\n    " + (0, _tpFn.crRow)('Close', price) + "\n  </div>";
};

const _crExValue = _ref3 => {
  let {
    date,
    id,
    point
  } = _ref3;
  const {
    exValue
  } = point;
  return (0, _tpFn.crHeader)(date, id) + "\n  <div class=\"tp__body\">\n    " + (0, _tpFn.crRow)('Value', exValue) + "\n  </div>";
};

const scatterExDividend = {
  fnTemplate: _crExDividend
};
exports.scatterExDividend = scatterExDividend;
const scatterSplitRatio = {
  fnTemplate: _crSplitRatio
};
exports.scatterSplitRatio = scatterSplitRatio;
const scatterExValue = {
  fnTemplate: _crExValue
};
exports.scatterExValue = scatterExValue;
//# sourceMappingURL=tpScatter.js.map