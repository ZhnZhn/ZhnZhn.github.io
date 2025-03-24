import {
  COLOR_EX_DIVIDEND
} from '../../constants/Color';

import {
  crHeader,
  crRow,
} from './tpFn';

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
    ${crRow('Ex-Dividend', exValue, { color: COLOR_EX_DIVIDEND })}
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
