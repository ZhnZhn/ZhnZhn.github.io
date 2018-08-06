
import ChartFn from '../ChartFn'

const {
  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDateFormatDMY,
  toDateFormatDMYT
} = ChartFn;

const C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
}

const TITLE_STYLE = `style="color:${C.TITLE_C};"`;
const FONT_STYLE = 'font-size:16px;font-weight:bold';

const tpFn = {
  crSpan: (t='', v='', { color=C.VALUE_C }={}) => {
    const _vStyle = `style="color:${color};${FONT_STYLE}"`
        , _t = t ? `${t}: `: ''
        , _v = v !== null ? v: '';
    return `
    <span ${TITLE_STYLE}>${_t}</span>
    <span ${_vStyle}>${_v}</span>`;
  },
  crRow: (t='', v='', option) => {
    return `<div>${tpFn.crSpan(t, v, option)}</div>`;
  },

  crHeader: (date='&nbsp;', id, cssClass='') => {
    return `<div id="${id}" class="tp__header not-selected ${cssClass}">
      <span class="tp__header__caption">${date}</span>
      <span class="tp__header__close">X</span>
    </div>`;
  },

  crTpId,
  toNumberFormat,
  toNumberFormatAll,
  toDateFormatDMY,
  toDateFormatDMYT,

  fHide: (id, point) => function _fnHide() {
    document.getElementById(id)
      .removeEventListener('click', _fnHide);
    if (point.series) {
       point.series.chart.zhTooltip.hide();
    }
  }
};

export default tpFn
