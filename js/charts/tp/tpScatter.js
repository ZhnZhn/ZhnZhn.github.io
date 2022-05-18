"use strict";

exports.__esModule = true;
exports.default = void 0;

var _tpFn = require("./tpFn");

var _Colors = require("./Colors");

const FONT_STYLE = 'font-size:16px;font-weight:bold';

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

const _crEps = _ref4 => {
  let {
    date,
    id,
    point
  } = _ref4;
  const {
    announceTime,
    fiscalPeriod,
    fiscalEndDate,
    actualEPS,
    estimatedEPS,
    numberOfEstimates,
    EPSSurpriseDollar
  } = point;
  return (0, _tpFn.crHeader)(date, id) + "\n  <div class=\"tp_body\">\n    <div>\n      " + (0, _tpFn.crSpan)('', announceTime, {
    color: _Colors.YEAR_COLOR
  }) + "\n      " + (0, _tpFn.crSpan)('', fiscalPeriod) + "\n      " + (0, _tpFn.crSpan)('', fiscalEndDate) + "\n    </div>\n    <div style=" + FONT_STYLE + ">\n      " + (0, _tpFn.crSpan)('EPS', actualEPS) + "\n      " + (0, _tpFn.crSpan)('Est.', estimatedEPS) + "\n    </div>\n    <div style=" + FONT_STYLE + ">\n      " + (0, _tpFn.crSpan)('Supr.', EPSSurpriseDollar) + "\n      " + (0, _tpFn.crSpan)('NumbEst.', numberOfEstimates) + "\n    </div>\n  </div>";
};

const tpScatter = {
  exDividend: {
    fnTemplate: _crExDividend
  },
  splitRatio: {
    fnTemplate: _crSplitRatio
  },
  exValue: {
    fnTemplate: _crExValue
  },
  eps: {
    fnTemplate: _crEps
  }
};
var _default = tpScatter;
exports.default = _default;
//# sourceMappingURL=tpScatter.js.map