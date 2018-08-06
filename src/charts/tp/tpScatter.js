import fn from './tpFn'
import C from './tpConfig'

const { crHeader, crRow, crSpan } = fn;

const FONT_STYLE = 'font-size:16px;font-weight:bold';

const _crExDividend = function({date, id, valueText, value, point}){
  const { exValue, price } = point;
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Ex-Dividend', exValue, { color: '#90ed7d'})}
    ${crRow('Close', price)}
  </div>`;
};

const _crSplitRatio = function({date, id, valueText, value, point}){
  const { splitRatio, price } = point
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Split Ratio', splitRatio, { color: '#ED5813'})}
    ${crRow('Close', price)}
  </div>`;
};

const _crExValue = function({ date, id, point }){
  const { exValue } = point;
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Value', exValue)}
  </div>`;
};

const _crEps = function({ date, id, point }){
  const {
          announceTime, fiscalPeriod, fiscalEndDate,
          actualEPS, estimatedEPS,
          numberOfEstimates, EPSSurpriseDollar
        } = point;
  return `${crHeader(date, id)}
  <div class="tp_body">
    <div>
      ${crSpan('', announceTime, { color: C.YEAR_C })}
      ${crSpan('', fiscalPeriod)}
      ${crSpan('', fiscalEndDate)}
    </div>
    <div style=${FONT_STYLE}>
      ${crSpan('EPS', actualEPS)}
      ${crSpan('Est.', estimatedEPS)}
    </div>
    <div style=${FONT_STYLE}>
      ${crSpan('Supr.', EPSSurpriseDollar)}
      ${crSpan('NumbEst.', numberOfEstimates)}
    </div>
  </div>`;
};

const tpScatter = {
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

export default tpScatter
