import { toTdmyIf } from '../../utils/dateFormatFn';

import {
  crHeader,
  crRow,
  getStatus
} from './tpFn';

const _crValue = ({
  date,
  id,
  color,
  valueText='Value',
  value,
  point
}) => {
  const status = getStatus(point);
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow(valueText, value, { color, status })}
  </div>`;
}

const _splineOptions = {
  fnTemplate: _crValue,
  isWithColor: true,
  isWithValueText: true,
  isWithValue: true
};


export const splineValueDmy = _splineOptions

export const splineValueTdmyIf = {
  ..._splineOptions,
  fnDateFormat: toTdmyIf
}
