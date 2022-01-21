"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

var _Colors = require("./Colors");

const {
  crHeader,
  crRow,
  crSpan
} = _tpFn.default;
const FONT_STYLE = 'font-size:16px;font-weight:bold';

const _crExDividend = function (_ref) {
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
  return crHeader(date, id) + "\n  <div class=\"tp__body\">\n    " + crRow('Ex-Dividend', exValue, {
    color: _Colors.EX_DIVIDEND_COLOR
  }) + "\n    " + crRow('Close', price) + "\n  </div>";
};

const _crSplitRatio = function (_ref2) {
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
  return crHeader(date, id) + "\n  <div class=\"tp__body\">\n    " + crRow('Split Ratio', splitRatio, {
    color: _Colors.SPLIT_RATIO_COLOR
  }) + "\n    " + crRow('Close', price) + "\n  </div>";
};

const _crExValue = function (_ref3) {
  let {
    date,
    id,
    point
  } = _ref3;
  const {
    exValue
  } = point;
  return crHeader(date, id) + "\n  <div class=\"tp__body\">\n    " + crRow('Value', exValue) + "\n  </div>";
};

const _crEps = function (_ref4) {
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
  return crHeader(date, id) + "\n  <div class=\"tp_body\">\n    <div>\n      " + crSpan('', announceTime, {
    color: _Colors.YEAR_COLOR
  }) + "\n      " + crSpan('', fiscalPeriod) + "\n      " + crSpan('', fiscalEndDate) + "\n    </div>\n    <div style=" + FONT_STYLE + ">\n      " + crSpan('EPS', actualEPS) + "\n      " + crSpan('Est.', estimatedEPS) + "\n    </div>\n    <div style=" + FONT_STYLE + ">\n      " + crSpan('Supr.', EPSSurpriseDollar) + "\n      " + crSpan('NumbEst.', numberOfEstimates) + "\n    </div>\n  </div>";
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