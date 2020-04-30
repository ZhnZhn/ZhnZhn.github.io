"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _isSupportOptions = _interopRequireDefault(require("../../utils/isSupportOptions"));

var _ChartFn = _interopRequireDefault(require("../ChartFn"));

var crTpId = _ChartFn["default"].crTpId,
    toNumberFormat = _ChartFn["default"].toNumberFormat,
    toNumberFormatAll = _ChartFn["default"].toNumberFormatAll,
    toDateFormatDMY = _ChartFn["default"].toDateFormatDMY,
    toDateFormatDMYT = _ChartFn["default"].toDateFormatDMYT;
var C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
};
var TITLE_STYLE = "style=\"color:" + C.TITLE_C + ";\"";
var FONT_STYLE = 'font-size:16px;font-weight:bold';

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _fHideTooltip = function _fHideTooltip(point, fn) {
  if (point === void 0) {
    point = {};
  }

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
    node.addEventListener('click', listener, _isSupportOptions["default"] ? {
      once: true
    } : false);
  }
};

var _isValueEmpty = function _isValueEmpty(v) {
  return v === 'NoData' || v === '' || v == null;
};

var tpFn = {
  crSpan: function crSpan(t, v, _temp) {
    if (t === void 0) {
      t = '';
    }

    if (v === void 0) {
      v = '';
    }

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? C.VALUE_C : _ref$color;

    var _vStyle = "style=\"color:" + color + ";" + FONT_STYLE + "\"",
        _t = t ? t + ": " : '',
        _v = v !== null ? v : '';

    return "\n    <span " + TITLE_STYLE + ">" + _t + "</span>\n    <span " + _vStyle + ">" + _v + "</span>";
  },
  crNotEmptySpan: function crNotEmptySpan(title, v) {
    return _isValueEmpty(v) ? '' : tpFn.crSpan(title, v);
  },
  crRow: function crRow(t, v, option) {
    if (t === void 0) {
      t = '';
    }

    if (v === void 0) {
      v = '';
    }

    return "<div>" + tpFn.crSpan(t, v, option) + "</div>";
  },
  crHeader: function crHeader(date, id, cssClass) {
    if (date === void 0) {
      date = '&nbsp;';
    }

    if (cssClass === void 0) {
      cssClass = '';
    }

    return "<div id=\"" + id + "\" class=\"tp__header not-selected " + cssClass + "\">\n      <span class=\"tp__header__caption\">" + date + "</span>\n      <span class=\"tp__header__close\">X</span>\n    </div>";
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
var _default = tpFn;
exports["default"] = _default;
//# sourceMappingURL=tpFn.js.map