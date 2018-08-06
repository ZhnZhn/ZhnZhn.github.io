'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tpFn = require('./tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

var _tpConfig = require('./tpConfig');

var _tpConfig2 = _interopRequireDefault(_tpConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crHeader = _tpFn2.default.crHeader,
    crRow = _tpFn2.default.crRow,
    crSpan = _tpFn2.default.crSpan;


var FONT_STYLE = 'font-size:16px;font-weight:bold';

var _crExDividend = function _crExDividend(_ref) {
  var date = _ref.date,
      id = _ref.id,
      valueText = _ref.valueText,
      value = _ref.value,
      point = _ref.point;
  var exValue = point.exValue,
      price = point.price;

  return crHeader(date, id) + '\n  <div class="tp__body">\n    ' + crRow('Ex-Dividend', exValue, { color: '#90ed7d' }) + '\n    ' + crRow('Close', price) + '\n  </div>';
};

var _crSplitRatio = function _crSplitRatio(_ref2) {
  var date = _ref2.date,
      id = _ref2.id,
      valueText = _ref2.valueText,
      value = _ref2.value,
      point = _ref2.point;
  var splitRatio = point.splitRatio,
      price = point.price;

  return crHeader(date, id) + '\n  <div class="tp__body">\n    ' + crRow('Split Ratio', splitRatio, { color: '#ED5813' }) + '\n    ' + crRow('Close', price) + '\n  </div>';
};

var _crExValue = function _crExValue(_ref3) {
  var date = _ref3.date,
      id = _ref3.id,
      point = _ref3.point;
  var exValue = point.exValue;

  return crHeader(date, id) + '\n  <div class="tp__body">\n    ' + crRow('Value', exValue) + '\n  </div>';
};

var _crEps = function _crEps(_ref4) {
  var date = _ref4.date,
      id = _ref4.id,
      point = _ref4.point;
  var announceTime = point.announceTime,
      fiscalPeriod = point.fiscalPeriod,
      fiscalEndDate = point.fiscalEndDate,
      actualEPS = point.actualEPS,
      estimatedEPS = point.estimatedEPS,
      numberOfEstimates = point.numberOfEstimates,
      EPSSurpriseDollar = point.EPSSurpriseDollar;

  return crHeader(date, id) + '\n  <div class="tp_body">\n    <div>\n      ' + crSpan('', announceTime, { color: _tpConfig2.default.YEAR_C }) + '\n      ' + crSpan('', fiscalPeriod) + '\n      ' + crSpan('', fiscalEndDate) + '\n    </div>\n    <div style=' + FONT_STYLE + '>\n      ' + crSpan('EPS', actualEPS) + '\n      ' + crSpan('Est.', estimatedEPS) + '\n    </div>\n    <div style=' + FONT_STYLE + '>\n      ' + crSpan('Supr.', EPSSurpriseDollar) + '\n      ' + crSpan('NumbEst.', numberOfEstimates) + '\n    </div>\n  </div>';
};

var tpScatter = {
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

exports.default = tpScatter;
//# sourceMappingURL=tpScatter.js.map