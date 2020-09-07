"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _isSupportOptions = _interopRequireDefault(require("../../utils/isSupportOptions"));

var _ChartFn = _interopRequireDefault(require("../ChartFn"));

var crTpId = _ChartFn["default"].crTpId,
    toNumberFormat = _ChartFn["default"].toNumberFormat,
    toNumberFormatAll = _ChartFn["default"].toNumberFormatAll,
    toDmy = _ChartFn["default"].toDmy,
    toTdmy = _ChartFn["default"].toTdmy;
var C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
};
var TITLE_STYLE = "style=\"color:" + C.TITLE_C + ";\"";
var FONT_STYLE = 'font-size:16px;font-weight:bold;';
var STATUS_STYLE = 'padding-left:4px;';

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

var _crSpanStyle = function _crSpanStyle(color, tailStyle) {
  if (tailStyle === void 0) {
    tailStyle = '';
  }

  return "style=\"color:" + color + ";" + FONT_STYLE + tailStyle + "\"";
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
        color = _ref$color === void 0 ? C.VALUE_C : _ref$color,
        status = _ref.status;

    var _vStyle = _crSpanStyle(color),
        _t = t ? t + ": " : '',
        _v = v !== null ? v : '',
        _statusSpan = status ? "<span " + _crSpanStyle(color, STATUS_STYLE) + ">(" + status + ")</span>" : '';

    return "\n    <span " + TITLE_STYLE + ">" + _t + "</span>\n    <span " + _vStyle + ">" + _v + "</span>" + _statusSpan;
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
  toDmy: toDmy,
  toTdmy: toTdmy,
  //toTdmyIf,
  addHideHandler: function addHideHandler(id, point, fn) {
    _addClickOnceById(id, _fHideTooltip(point, fn));
  },
  getStatus: function getStatus(point) {
    var index = point.index,
        _point$series = point.series,
        series = _point$series === void 0 ? {} : _point$series,
        _series$userOptions = series.userOptions,
        userOptions = _series$userOptions === void 0 ? {} : _series$userOptions,
        _userOptions$data = userOptions.data,
        data = _userOptions$data === void 0 ? [] : _userOptions$data,
        _p = data[index] || [],
        _status = _p[2];

    return _status && _status !== ':' ? _status : void 0;
  }
};
var _default = tpFn;
exports["default"] = _default;
//# sourceMappingURL=tpFn.js.map