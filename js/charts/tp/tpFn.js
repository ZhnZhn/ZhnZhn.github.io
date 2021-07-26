"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _isSupportOptions = _interopRequireDefault(require("../../utils/isSupportOptions"));

var _ChartFn = _interopRequireDefault(require("../ChartFn"));

const {
  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDmy,
  toTdmy,
  toTdmyIf
} = _ChartFn.default;
const C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
};
const TITLE_STYLE = "style=\"color:" + C.TITLE_C + ";\"";
const FONT_STYLE = 'font-size:16px;font-weight:bold;';
const VALUE_STYLE = 'padding-right:5px;';
const STATUS_STYLE = 'padding-left:4px;';

const _isFn = fn => typeof fn === 'function';

const _fHideTooltip = (point = {}, fn) => () => {
  if (point.series) {
    point.series.chart.zhTooltip.hide();
  }

  if (_isFn(fn)) {
    fn(point);
  }
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

const _crSpanStyle = (color, tailStyle = '') => "style=\"color:" + color + ";" + FONT_STYLE + tailStyle + "\"";

const tpFn = {
  crSpan: (t = '', v = '', {
    color = C.VALUE_C,
    status
  } = {}) => {
    const _vStyle = _crSpanStyle(color, VALUE_STYLE),
          _t = t ? t + ": " : '',
          _v = v !== null ? v : '',
          _statusSpan = status ? "<span " + _crSpanStyle(color, STATUS_STYLE) + ">(" + status + ")</span>" : '';

    return "\n    <span " + TITLE_STYLE + ">" + _t + "</span>\n    <span " + _vStyle + ">" + _v + "</span>" + _statusSpan;
  },
  crNotEmptySpan: (title, v) => _isValueEmpty(v) ? '' : tpFn.crSpan(title, v),
  crRow: (t = '', v = '', option) => {
    return "<div>" + tpFn.crSpan(t, v, option) + "</div>";
  },
  crHeader: (date = '&nbsp;', id, cssClass = '') => {
    return "<div id=\"" + id + "\" class=\"tp__header not-selected " + cssClass + "\">\n      <span class=\"tp__header__caption\">" + date + "</span>\n      <span class=\"tp__header__close\">X</span>\n    </div>";
  },
  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDmy,
  toTdmy,
  toTdmyIf,
  addHideHandler: (id, point, fn) => {
    _addClickOnceById(id, _fHideTooltip(point, fn));
  },
  getStatus: point => {
    const {
      index,
      series = {}
    } = point,
          {
      userOptions = {}
    } = series,
          {
      data = []
    } = userOptions,
          _p = data[index] || [],
          _status = _p[2];

    return _status && _status !== ':' ? _status : void 0;
  }
};
var _default = tpFn;
exports.default = _default;
//# sourceMappingURL=tpFn.js.map