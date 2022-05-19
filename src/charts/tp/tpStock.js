import {
  crHeader,
  crRow,
  crNotEmptySpan,
  toTdmyIf
} from './tpFn';

const CL_TP_BODY = "tp__body"
, CL_TP_ROW = "tp__row";

const _crVolume = ({
  date,
  id,
  value,
  point
}) => {
  const {_open, _close, _low, _high} = point;
  return `${crHeader(date, id)}
  <div class="${CL_TP_BODY}">
    ${crRow('Volume', value)}
    <div class="${CL_TP_ROW}">
      ${crNotEmptySpan('Open', _open)}
      ${crNotEmptySpan('Close', _close)}
    </div>
    <div class="${CL_TP_ROW}">
      ${crNotEmptySpan('Low', _low)}
      ${crNotEmptySpan('High', _high)}
    </div>
  </div>`;
};

const _crAtn = ({
  date,
  id,
  value,
  point
}) => {
  const {color, y, close, open} = point;
  return `${crHeader(date, id)}
    <div class="${CL_TP_BODY}">
      ${crRow('ATH', y+'%', {color})}
      ${crRow('Prev Close', close)}
      ${crRow('Next Open', open)}
    </div>`;
};

export const stockVolumeTdmyIf = {
  fnTemplate: _crVolume,
  fnDateFormat: toTdmyIf,
  isWithValue: true
}

export const stockAth = {
  fnTemplate: _crAtn
}
