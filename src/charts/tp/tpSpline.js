import {
  crHeader,
  crRow,
  toTdmy,
  toTdmyIf,
  getStatus
 } from './tpFn'

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
}

const tpSpline = {
  vDmy: _splineOptions,
  vTdmy: {
    ..._splineOptions,
    fnDateFormat: toTdmy,
  },
  vTdmyIf: {
    ..._splineOptions,
    fnDateFormat: toTdmyIf
  }
};

export default tpSpline
