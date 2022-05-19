"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.toTdmyIf = exports.toNumberFormat = exports.toDmy = exports.getStatus = exports.crTpId = exports.crSpan = exports.crRow = exports.crNotEmptySpan = exports.crHeader = exports.addHideHandler = void 0;

var _ChartFn = require("../ChartFn");

exports.crTpId = _ChartFn.crTpId;
exports.toNumberFormat = _ChartFn.toNumberFormat;
exports.toNumberFormatAll = _ChartFn.toNumberFormatAll;
exports.toDmy = _ChartFn.toDmy;
exports.toTdmyIf = _ChartFn.toTdmyIf;

var _isSupportOptions = _interopRequireDefault(require("../../utils/isSupportOptions"));

var _Colors = require("./Colors");

const CL_TP_HEADER = "tp__header not-selected",
      CL_TP_CAPTION = "tp__header__caption text-clip",
      CL_TP_BT_CLOSE = "tp__header__close",
      CL_TP_ROW = "tp__row",
      TITLE_STYLE = "style=\"color:" + _Colors.TITLE_COLOR + ";\"",
      FONT_STYLE = 'font-size:16px;font-weight:bold;',
      VALUE_STYLE = 'padding-right:5px;',
      STATUS_STYLE = 'padding-left:4px;';

const _isFn = fn => typeof fn === 'function';

const _fHideTooltip = function (point, fn) {
  if (point === void 0) {
    point = {};
  }

  return () => {
    if (point.series) {
      point.series.chart.zhTooltip.hide();
    }

    if (_isFn(fn)) {
      fn(point);
    }
  };
};

const _addClickOnceById = (id, listener) => {
  const node = document.getElementById(id);

  if (node) {
    node.addEventListener('click', listener, _isSupportOptions.default ? {
      once: true
    } : false);
  }
};

const _isValueEmpty = v => v === 'NoData' || v === '' || v == null;

const _crSpanStyle = function (color, tailStyle) {
  if (tailStyle === void 0) {
    tailStyle = '';
  }

  return "style=\"color:" + color + ";" + FONT_STYLE + tailStyle + "\"";
};

const crSpan = function (t, v, _temp) {
  if (v === void 0) {
    v = '';
  }

  let {
    color = _Colors.VALUE_COLOR,
    status
  } = _temp === void 0 ? {} : _temp;

  const _vStyle = _crSpanStyle(color, VALUE_STYLE),
        _t = t ? t + ": " : '',
        _v = v !== null ? v : '',
        _statusSpan = status ? "<span " + _crSpanStyle(color, STATUS_STYLE) + ">(" + status + ")</span>" : '';

  return "\n  <span " + TITLE_STYLE + ">" + _t + "</span>\n  <span " + _vStyle + ">" + _v + "</span>" + _statusSpan;
};

exports.crSpan = crSpan;

const crNotEmptySpan = (title, v) => _isValueEmpty(v) ? '' : crSpan(title, (0, _ChartFn.toNumberFormatAll)(v));

exports.crNotEmptySpan = crNotEmptySpan;

const crRow = function (t, v, option) {
  if (t === void 0) {
    t = '';
  }

  if (v === void 0) {
    v = '';
  }

  return "<div class=\"" + CL_TP_ROW + "\">" + crSpan(t, v, option) + "</div>";
};

exports.crRow = crRow;

const crHeader = function (date, id, cssClass) {
  if (date === void 0) {
    date = '&nbsp;';
  }

  if (cssClass === void 0) {
    cssClass = '';
  }

  return "<div id=\"" + id + "\" class=\"" + CL_TP_HEADER + " " + cssClass + "\">\n      <span class=\"" + CL_TP_CAPTION + "\">" + date + "</span>\n      <span class=\"" + CL_TP_BT_CLOSE + "\">X</span>\n    </div>";
};

exports.crHeader = crHeader;

const addHideHandler = (id, point, fn) => {
  _addClickOnceById(id, _fHideTooltip(point, fn));
};

exports.addHideHandler = addHideHandler;

const getStatus = point => {
  const {
    index,
    series
  } = point,
        {
    userOptions
  } = series || {},
        {
    data
  } = userOptions || {},
        _p = (data || [])[index] || [],
        _status = _p[2];

  return _status && _status !== ':' ? _status : void 0;
};

exports.getStatus = getStatus;
//# sourceMappingURL=tpFn.js.map