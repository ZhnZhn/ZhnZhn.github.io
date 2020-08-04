import fn from './tpFn'

const {
  crHeader, crRow,
  toDateFormatDMYT,
  getStatus
 } = fn;

const _crValue = function({date, id, color, valueText='Value', value, point}){
  const status = getStatus(point);
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow(valueText, value, { color, status })}
  </div>`;
}

const tpSpline = {
  value: {
    fnTemplate : _crValue,
    isWithColor: true,
    isWithValueText: true,
    isWithValue: true
  },
  valueDmyt: {
    fnTemplate : _crValue,
    fnDateFormat: toDateFormatDMYT,
    isWithColor: true,
    isWithValueText: true,
    isWithValue: true
  }
};

export default tpSpline
