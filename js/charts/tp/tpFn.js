"use strict";

exports.__esModule = true;
exports.getStatus = exports.crSpan = exports.crRow = exports.crNotEmptySpan = exports.crHeader = exports.addHideHandler = void 0;
var _Color = require("../../constants/Color");
var _domFn = require("../../utils/domFn");
var _isTypeFn = require("../../utils/isTypeFn");
var _ChartFn = require("../ChartFn");
var _CL = require("../CL");
const VALUE_STYLE = 'padding-right:5px;',
  STATUS_STYLE = 'padding-left:4px;';
const _fHideTooltip = function (point, fn) {
  if (point === void 0) {
    point = {};
  }
  return () => {
    if (point.series) {
      point.series.chart.zhTooltip.hide();
    }
    if ((0, _isTypeFn.isFn)(fn)) {
      fn(point);
    }
  };
};
const _addClickOnceById = (id, listener) => {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener('click', listener, _domFn.isSupportOptions ? {
      once: true
    } : false);
  }
};
const _isValueEmpty = v => v === 'NoData' || v === '' || v == null;
const _crSpanStyle = function (color, tailStyle) {
  if (tailStyle === void 0) {
    tailStyle = '';
  }
  return `style="color:${color};${tailStyle}"`;
};
const crSpan = function (t, v, _temp) {
  if (v === void 0) {
    v = '';
  }
  let {
    color = _Color.COLOR_VALUE,
    status
  } = _temp === void 0 ? {} : _temp;
  const _vStyle = _crSpanStyle(color, VALUE_STYLE),
    _t = t ? `${t}: ` : '',
    _v = v !== null ? v : '',
    _statusSpan = status ? `<span ${_crSpanStyle(color, STATUS_STYLE)}>(${status})</span>` : '';
  return `
  <span class="${_CL.CL_TP_TITLE}">${_t}</span>
  <span ${_vStyle}>${_v}</span>${_statusSpan}`;
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
  return `<div class="${_CL.CL_TP_ROW}">${crSpan(t, v, option)}</div>`;
};
exports.crRow = crRow;
const crHeader = function (date, id, cssClass) {
  if (date === void 0) {
    date = '&nbsp;';
  }
  if (cssClass === void 0) {
    cssClass = '';
  }
  return `<div id="${id}" class="${_CL.CL_TP_HEADER} ${cssClass}">
      <span class="${_CL.CL_TP_CAPTION}">${date}</span>
      <span class="${_CL.CL_TP_BT_CLOSE}">X</span>
    </div>`;
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