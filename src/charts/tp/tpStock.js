import {
  crHeader,
  crRow
} from './tpFn';

const CL_TP_BODY = "tp__body";

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

export const stockAth = {
  fnTemplate: _crAtn
}
