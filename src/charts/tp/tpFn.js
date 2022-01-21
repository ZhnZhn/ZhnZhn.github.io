
import isSupportOptions from '../../utils/isSupportOptions'
import ChartFn from '../ChartFn'
import {
  TITLE_COLOR,
  VALUE_COLOR
} from './Colors';

const {
  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDmy,
  toTdmy,
  toTdmyIf
} = ChartFn;

const CL_TP_HEADER = "tp__header not-selected"
, CL_TP_CAPTION = "tp__header__caption text-clip"
, CL_TP_BT_CLOSE = "tp__header__close"
, CL_TP_ROW = "tp__row"

, TITLE_STYLE = `style="color:${TITLE_COLOR};"`
, FONT_STYLE = 'font-size:16px;font-weight:bold;'
, VALUE_STYLE = 'padding-right:5px;'
, STATUS_STYLE = 'padding-left:4px;'

const _isFn = fn => typeof fn === 'function';

const _fHideTooltip = (point={}, fn) => () => {
  if (point.series) {
     point.series.chart.zhTooltip.hide();
  }
  if (_isFn(fn)) {
    fn(point)
  }
};
const _addClickOnceById = (id, listener) => {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener('click', listener,
      isSupportOptions ? { once: true } : false
    )
  }
};

const _isValueEmpty = v => v === 'NoData'
 || v === ''
 || v == null;

const _crSpanStyle = (color, tailStyle='') => `style="color:${color};${FONT_STYLE}${tailStyle}"`;

const tpFn = {
  crSpan: (t, v='', {color=VALUE_COLOR, status}={}) => {
    const _vStyle = _crSpanStyle(color, VALUE_STYLE)
    , _t = t ? `${t}: `: ''
    , _v = v !== null ? v: ''
    , _statusSpan = status
         ? `<span ${_crSpanStyle(color, STATUS_STYLE)}>(${status})</span>`
         : '';
    return `
    <span ${TITLE_STYLE}>${_t}</span>
    <span ${_vStyle}>${_v}</span>${_statusSpan}`;
  },
  crNotEmptySpan: (title, v) => _isValueEmpty(v)
    ? ''
    : tpFn.crSpan(title, toNumberFormatAll(v)),
  crRow: (t='', v='', option) => {
    return `<div class="${CL_TP_ROW}">${tpFn.crSpan(t, v, option)}</div>`;
  },

  crHeader: (date='&nbsp;', id, cssClass='') => {
    return `<div id="${id}" class="${CL_TP_HEADER} ${cssClass}">
      <span class="${CL_TP_CAPTION}">${date}</span>
      <span class="${CL_TP_BT_CLOSE}">X</span>
    </div>`;
  },

  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDmy,
  toTdmy,
  toTdmyIf,

  addHideHandler: (id, point, fn) => {
    _addClickOnceById(id, _fHideTooltip(point, fn))
  },

  getStatus: point => {
    const { index, series } = point
    , { userOptions } = series || {}
    , { data } = userOptions || {}
    , _p = (data || [])[index] || []
    , _status = _p[2];
    return _status && _status !== ':'
      ? _status
      : void 0;
  }

};

export default tpFn
