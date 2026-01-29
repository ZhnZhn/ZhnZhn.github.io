import { COLOR_DATE } from '../../constants/Color';
import { formatAllNumber } from '../../utils/numberFormatFn';

import {
  crHeader,
  crRow
} from './tpFn';

const _crTreeMap = ({
  id,
  point
}) => {
  const {
    title,
    label,
    value,
    percent=''
  } = point
  , _percent = percent ? `(${percent}%)` : ''
  , _value = `${formatAllNumber(value)} ${_percent}`;
  return `${crHeader(title, id)}
  <div class="tp_body">
    ${crRow('', label)}
    ${crRow('', _value, { color: COLOR_DATE })}
  </div>
  `;
}

export const treeMapValue = {
  fnTemplate: _crTreeMap
}
