import {
  crHeader,
  crRow,
} from './tpFn';
import {
  EX_DIVIDEND_COLOR
} from './Colors';

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


export const scatterExDividend = {
  fnTemplate: _crExDividend
}
export const scatterExValue = {
  fnTemplate: _crExValue
}
