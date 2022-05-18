import {
  crHeader,
  crRow,
  crSpan
} from './tpFn';
import {
  YEAR_COLOR,
  EX_DIVIDEND_COLOR,
  SPLIT_RATIO_COLOR
} from './Colors';

const FONT_STYLE = 'font-size:16px;font-weight:bold';

const _crExDividend = ({
  date,
  id,
  valueText,
  value,
  point
}) => {
  const { exValue, price } = point;
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Ex-Dividend', exValue, { color: EX_DIVIDEND_COLOR })}
    ${crRow('Close', price)}
  </div>`;
};

const _crSplitRatio = ({
  date,
  id,
  valueText,
  value,
  point
}) => {
  const { splitRatio, price } = point
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Split Ratio', splitRatio, { color: SPLIT_RATIO_COLOR})}
    ${crRow('Close', price)}
  </div>`;
};

const _crExValue = ({
  date,
  id,
  point
}) => {
  const { exValue } = point;
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Value', exValue)}
  </div>`;
};

const _crEps = ({
  date,
  id,
  point
}) => {
  const {
    announceTime,
    fiscalPeriod,
    fiscalEndDate,
    actualEPS,
    estimatedEPS,
    numberOfEstimates,
    EPSSurpriseDollar
  } = point;
  return `${crHeader(date, id)}
  <div class="tp_body">
    <div>
      ${crSpan('', announceTime, { color: YEAR_COLOR })}
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
