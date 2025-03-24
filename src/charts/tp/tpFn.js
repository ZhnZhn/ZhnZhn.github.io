export {
  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDmy,
  toTdmyIf
} from '../ChartFn';

import {
  COLOR_VALUE
} from '../../constants/Color';

import isSupportOptions from '../../utils/isSupportOptions';
import { isFn } from '../../utils/isTypeFn';

import { toNumberFormatAll } from '../ChartFn';

import {
  CL_TP_HEADER,
  CL_TP_CAPTION,
  CL_TP_BT_CLOSE,
  CL_TP_ROW,
  CL_TP_TITLE
} from '../CL';

const VALUE_STYLE = 'padding-right:5px;'
, STATUS_STYLE = 'padding-left:4px;'

const _fHideTooltip = (point={}, fn) => () => {
  if (point.series) {
     point.series.chart.zhTooltip.hide();
  }
  if (isFn(fn)) {
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

const _crSpanStyle = (
  color,
  tailStyle=''
) => `style="color:${color};${tailStyle}"`;

export const crSpan = (
  t,
  v='',
  {color=COLOR_VALUE, status}={}
) => {
  const _vStyle = _crSpanStyle(color, VALUE_STYLE)
  , _t = t ? `${t}: `: ''
  , _v = v !== null ? v: ''
  , _statusSpan = status
       ? `<span ${_crSpanStyle(color, STATUS_STYLE)}>(${status})</span>`
       : '';
  return `
  <span class="${CL_TP_TITLE}">${_t}</span>
  <span ${_vStyle}>${_v}</span>${_statusSpan}`;
}

export const crNotEmptySpan = (
  title,
  v
) => _isValueEmpty(v)
  ? ''
  : crSpan(title, toNumberFormatAll(v))

export const crRow = (
  t='',
  v='',
  option
) => `<div class="${CL_TP_ROW}">${crSpan(t, v, option)}</div>`

export const crHeader = (
  date='&nbsp;',
  id,
  cssClass=''
) => `<div id="${id}" class="${CL_TP_HEADER} ${cssClass}">
      <span class="${CL_TP_CAPTION}">${date}</span>
      <span class="${CL_TP_BT_CLOSE}">X</span>
    </div>`

export const addHideHandler = (
  id,
  point,
  fn
) => {
  _addClickOnceById(id, _fHideTooltip(point, fn))
}

export const getStatus = point => {
  const { index, series } = point
  , { userOptions } = series || {}
  , { data } = userOptions || {}
  , _p = (data || [])[index] || []
  , _status = _p[2];
  return _status && _status !== ':'
    ? _status
    : void 0;
}
