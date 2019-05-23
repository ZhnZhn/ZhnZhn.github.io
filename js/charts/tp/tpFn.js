'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSupportOptions = require('../../utils/isSupportOptions');

var _isSupportOptions2 = _interopRequireDefault(_isSupportOptions);

var _ChartFn = require('../ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crTpId = _ChartFn2.default.crTpId,
    toNumberFormat = _ChartFn2.default.toNumberFormat,
    toNumberFormatAll = _ChartFn2.default.toNumberFormatAll,
    toDateFormatDMY = _ChartFn2.default.toDateFormatDMY,
    toDateFormatDMYT = _ChartFn2.default.toDateFormatDMYT;


var C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
};

var TITLE_STYLE = 'style="color:' + C.TITLE_C + ';"';
var FONT_STYLE = 'font-size:16px;font-weight:bold';

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _fHideTooltip = function _fHideTooltip() {
  var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];
  return function () {
    if (point.series) {
      point.series.chart.zhTooltip.hide();
    }
    if (_isFn(fn)) {
      fn(point);
    }
  };
};
var _addClickOnceById = function _addClickOnceById(id, listener) {
  var node = document.getElementById(id);
  if (node) {
    node.addEventListener('click', listener, _isSupportOptions2.default ? { once: true } : false);
  }
};

var tpFn = {
  crSpan: function crSpan() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$color = _ref.color,
        color = _ref$color === undefined ? C.VALUE_C : _ref$color;

    var _vStyle = 'style="color:' + color + ';' + FONT_STYLE + '"',
        _t = t ? t + ': ' : '',
        _v = v !== null ? v : '';
    return '\n    <span ' + TITLE_STYLE + '>' + _t + '</span>\n    <span ' + _vStyle + '>' + _v + '</span>';
  },
  crRow: function crRow() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var option = arguments[2];

    return '<div>' + tpFn.crSpan(t, v, option) + '</div>';
  },

  crHeader: function crHeader() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '&nbsp;';
    var id = arguments[1];
    var cssClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return '<div id="' + id + '" class="tp__header not-selected ' + cssClass + '">\n      <span class="tp__header__caption">' + date + '</span>\n      <span class="tp__header__close">X</span>\n    </div>';
  },

  crTpId: crTpId,
  toNumberFormat: toNumberFormat,
  toNumberFormatAll: toNumberFormatAll,
  toDateFormatDMY: toDateFormatDMY,
  toDateFormatDMYT: toDateFormatDMYT,

  addHideHandler: function addHideHandler(id, point, fn) {
    _addClickOnceById(id, _fHideTooltip(point, fn));
  }

};

exports.default = tpFn;
//# sourceMappingURL=tpFn.js.map